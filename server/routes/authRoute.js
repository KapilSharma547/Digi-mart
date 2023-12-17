const express = require("express");
const {
  createUser,
  loginUserController,
  loginAdminController,
} = require("../controller/userController");

// Router Object
const router = express.Router();

// register user
router.post("/register", createUser);

// Login User
router.post("/login", loginUserController);

// Admin-login
router.post("/admin-login", loginAdminController);

module.exports = router;
