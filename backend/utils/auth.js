const jwt = require("jsonwebtoken");

const ErrorHandler = require("../error_handler/ErrorHandler");
const wrapAsync = require("../error_handler/wrapAsync");

const User = require("../model/user_schema");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = wrapAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("please Login first.", 401));
  }
  console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
