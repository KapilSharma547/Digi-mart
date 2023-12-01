const express = require("express");
const {
  createUser,
  loginUserController,
} = require("../controller/userController");

// Router Object
const router = express.Router();

// register user
router.post("/register", createUser);

// Login User
router.post("/login", loginUserController);

module.exports = router;
