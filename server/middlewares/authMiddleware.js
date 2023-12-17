const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  const chekbearer = req.headers?.authorization.startsWith("Bearer");
  if (chekbearer) {
    try {
      token = req.headers?.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      res.status(403).json({
        success: false,
        message: " You are not an admin",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = { authMiddleware, isAdmin };
