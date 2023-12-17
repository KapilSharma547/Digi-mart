const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path} `;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered `;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // Return detailed error messages in development
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }

  // Return a more generic error message in production
  res.status(err.statusCode).json({
    success: false,
    message: "Something went wrong!",
  });
};
