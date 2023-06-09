const mongoose = require("mongoose");
const validator = require("validator");
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    // picturePath: String,
    // userPicturePath: String,

    postPicturePath: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    userPicturePath: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    likes: { type: Array, required: true },
    numOfLikes: {
      type: Number,
      validate: {
        validator: (value) => validator.isInt(String(value), { min: 0 }),
        message: "Number of likes must be a non-negative integer.",
      },
      default: 0,
    },
    // unlikes: [{ userId: String }],

    // numOfUnlikes: {
    //   type: Number,
    //   min: 0,
    //   default: 0,
    // },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    // comments: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
