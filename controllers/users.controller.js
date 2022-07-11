const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

// @desc    Creates a new user
// @route   POST /api/users/
// @access  Public
const addUser = asyncHandler(async (req, res) => {
  const { userid, username, password } = req.body;
  try {
    if (userid && username && password) {
      const userExists = await User.findOne({ userid });
      if (userExists) {
        return res
          .status(400)
          .json({ success: false, err: "User id already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create user
      const newUser = await User.create({
        userid,
        username,
        password: hashedPassword,
      });
      if (newUser) {
        res.status(201).json({
          success: true,
          data: {
            userid: newUser.userid,
            username: newUser.username,
            hash: newUser.password,
            token: generateToken(newUser._id),
          },
        });
      } else {
        res.status(400).json({
          success: false,
          err: "User could not be created",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        err: "please fill all fields",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { userid, password } = req.body;

  // Check for user email
  const user = await User.findOne({ userid });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      userid: user.userid,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ success: false, err: "Invalid credentials" });
  }
});

const getUser = (req, res) => {
  const { _id, userid, username } = req.user;
  res.status(200).json({
    success: true,
    data: { _id, userid, username },
  });
};
//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
module.exports = {
  addUser,
  loginUser,
  getUser,
};
