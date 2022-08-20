import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

// @desc    Creates a new user
// @route   POST /api/users/
// @access  Public
export const addUser = asyncHandler(async (req, res): Promise<any> => {
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
        const createdUser = await User.findOne({ userid });
        //@ts-ignore
        createdUser.token = generateToken(newUser._id);
        res.status(201).json({
          success: true,
          user: createdUser,
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
export const loginUser = asyncHandler(async (req, res) => {
  const { userid, password } = req.body;

  // Check for user email
  const user = await User.findOne({ userid });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        userid: user.userid,
        username: user.username,
        token: generateToken(user._id.toString()),
      },
    });
  } else {
    res.status(400).json({ success: false, err: "Invalid credentials" });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const { _id, userid, username } = req.user;
  // const token = generateToken(_id);
  res.status(200).json({
    success: true,
    // user: { _id, userid, username, token },
    user: { _id, userid, username },
  });
});

//generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "10d" });
};
