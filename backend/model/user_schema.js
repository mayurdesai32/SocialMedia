const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const wrapAsync = require("../error_handler/wrapAsync");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [2, " min should be length of char is 2"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [
      {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
      // {
      //   validator: (value) => value.endsWith("@somaiya.edu"),
      //   message: "Email should be from @somaiya.edu domain",
      // },
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: "default_id",
    },
    url: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
  },

  role: {
    type: String,
    default: "starter",
  },
  friends: {
    type: Array,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  resetVerifyToken: String,
  resetVerifyExpire: Date,
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("hello ");
  console.log(this);
  return (sam = await bcrypt.compare(enteredPassword, this.password));
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000,
  });
};

// Generate verification token
userSchema.methods.getverifytoken = function () {
  // Generate token
  const verifytoken = crypto.randomBytes(20).toString("hex");

  // Hash and set to verifytoken
  this.resetVerifyToken = crypto
    .createHash("sha256")
    .update(verifytoken)
    .digest("hex");

  // Set token expire time
  this.resetVerifyExpire = Date.now() + 30 * 60 * 1000;

  return verifytoken;
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
