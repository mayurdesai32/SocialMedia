const ErrorHandler = require("./ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // error related to mongodb
    if (err.name === "CastError") {
      const message = `Resource not found .Invalid:${err.path} `;
      // const message = `Resource not found  `;
      error = new ErrorHandler(message, 400);
    } else if (err.name === "ValidatorError") {
      console.log("helllo");
      const message = object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,

      message: error.message || "Internal Server error",
    });
  }
};

// other error
//   if (err.name === 'ValidationError') {
//     err.message = `Resource not found invalid ${err.path}`;
//   } else {
//     err.message = err.message || 'Internal server error';
//   }
//   res.status(err.statusCode).json({ success: false, message: err.message });
