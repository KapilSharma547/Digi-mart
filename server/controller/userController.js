const generateToken = require("../config/jwtToken");
const genrateRefreshToken = require("../config/refreshtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// Create a User==============
const createUser = async (req, res) => {
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
    return res.status(500).json({ success: false, error: error });
  }
};

// Login User===

const loginUserController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(403)
        .json({ success: false, message: "User Not Found" });
    }
    const {
      _id,
      firstname,
      email: useremail,
      mobile,
      lastname,
      role,
    } = findUser;
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (!match) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid Credentials" });
      }
      const refreshToken = await genrateRefreshToken(_id, role);
      const updateuser = await User.findByIdAndUpdate(
        _id,
        { refreshToken },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

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
    }
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      console.error("Duplicate key error:", error.message);
      return res
        .status(400)
        .json({ success: false, error: "Duplicate key error" });
    } else {
      console.error("Other error:", error.message);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    // console.log(`error ${error}`);
    // res.status(500).json({
    //   success: false,
    //   message: "Internal Server Error",
    //   error,
    // });
  }
});

// Admin-login

const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email, password :>> ", email, password);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

module.exports = { createUser, loginUserController, loginAdminController };
