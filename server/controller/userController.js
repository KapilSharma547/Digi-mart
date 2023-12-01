const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// Create a User==============
const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(403)
        .json({ success: false, message: "this email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "user created successfull" });
  } catch (error) {
    console.log(`Error ${error}`);
    return res.status(500).json({ success: false, error });
  }
});

// Login User===

const loginUserController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const {
      _id,
      firstname,
      email: useremail,
      mobile,
      lastname,
      role,
    } = findUser;
    const payload = {
      _id,
      firstname,
      email: useremail,
      mobile,
      lastname,
      token: generateToken(_id, role),
    };
    return res.status(200).json({
      success: true,
      message: "login successfull",
      payload,
    });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = { createUser, loginUserController };
