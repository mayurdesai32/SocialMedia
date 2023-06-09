const User = require("../model/user_schema");
const Post = require("../model/post_schema.js");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");
const wrapAsync = require("../error_handler/wrapAsync");

const ErrorHandler = require("../error_handler/ErrorHandler");

/* CREATE */
exports.createPost = wrapAsync(async (req, res) => {
  const { description } = req.body;

  if (!description || !req.file) {
    return next(new ErrorHandler("cant saved empty post", 404));
  }

  const { _id, name, avatar } = req.user;
  let postPicturePath;
  if (req.file) {
    const file = req.file;

    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    // const user = await User.findById(userId);

    postPicturePath = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  } else {
    postPicturePath = {};
  }

  const newPost = new Post({
    userId: _id,
    name,
    description,
    postPicturePath,
    userPicturePath: avatar,
    likes: [],
  });
  await newPost.save();

  const post = await Post.find();
  res.status(201).json(post);
});

// delete
exports.deletePost = wrapAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const userId = req.user._id;
  const role = req.user.role;
  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  if (post.userId != userId && role !== "admin") {
    console.log(post.userId);
    console.log(userId);

    return next(
      new ErrorHandler("you are not authoize to delete this post", 404)
    );
  }

  // Deleting Images From Cloudinary
  console.log(post.postPicturePath);
  await cloudinary.v2.uploader.destroy(post.postPicturePath.public_id);

  await post.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "post deleted successfully" });
});

// /* READ */
exports.getAllPosts = wrapAsync(async (req, res) => {
  const post = await Post.find();
  res.status(200).json(post);
});

exports.getPostsByUser = wrapAsync(async (req, res) => {
  const post = await Post.find({ userId: req.params.id });
  res.status(200).json(post);
});

exports.getSinglePosts = wrapAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

/* like post  */
exports.likePost = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(id);
  console.log(!post);
  let isLiked;
  if (!post) {
    return next(new ErrorHandler(`no resource found with this id ${id}`, 404));
  }

  if (post.likes) {
    isLiked = post.likes.filter((id) => {
      return id == userId;
    });
  }

  // const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes = post.likes.filter((id) => {
      console.log(post.likes);

      if (id.valueOf() != userId) {
        return id;
      } else null;
    });
    post.numOfLikes -= 1;
  } else {
    post.likes.push(userId);
    post.numOfLikes += 1;
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes, numOfLikes: post.numOfLikes },
    { new: true }
  );

  res.status(200).json(updatedPost);
});

/* comments post  */
exports.commentsPost = wrapAsync(async (req, res) => {
  const { id, comment } = req.body;

  const userId = req.user._id;
  const username = req.user.name;
  const post = await Post.findById(id);

  console.log(userId);
  console.log(post);
  const comments = {
    userId,
    username,
    comment,
  };

  post.comments.push(comments);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { comments: post.comments },
    { new: true }
  );

  res.status(200).json(updatedPost);
});
