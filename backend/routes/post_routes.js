const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  getSinglePosts,
  likePost,
  commentsPost,
  deletePost,
} = require("../controller/post_controller");
const { isAuthenticatedUser, authorizeRoles } = require("../utils/auth");

const singleUpload = require("../utils/multer");
const router = express.Router();

router.post(
  "/createpost",
  singleUpload,
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  createPost
);

router.get(
  "/getallposts",
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  getAllPosts
);

router.get(
  "/getPostsByUser",
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  getPostsByUser
);
router.get(
  "/getsingleposts/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  getSinglePosts
);
router.get(
  "/likepost/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  likePost
);

router.post(
  "/commentspost",
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  commentsPost
);

// router.put(
//   "/comment",
//   isAuthenticatedUser,
//   authorizeRoles("admin", "user"),
//   comment
// );
// router.put(
//   "/savePost/:id",
//   isAuthenticatedUser,
//   authorizeRoles("admin", "user"),
//   savePost
// );
router.delete(
  "/deletepost/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "user"),
  deletePost
);

module.exports = router;
