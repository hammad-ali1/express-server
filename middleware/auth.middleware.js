const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1]; //splits "Bearer token"
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res
        .status(401)
        .json({ success: false, err: err, msg: "Not authorized. Bad Token" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, err: "Not authorized. Token missing" });
  }
});

const protectSocket = async (socket, next) => {
  const token =
    socket.handshake.auth.token ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2MwNmJjNDRkMDE4MmU1YjIzNjcyNCIsImlhdCI6MTY1NzkxMTMzMCwiZXhwIjoxNjU4Nzc1MzMwfQ.dyH2fV92WTHO5hQwmuUtczaQH8rPlKPQklTsii05vno";
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      const userFetched = await User.findById(decoded.id).select("-password");
      socket.user = { ...userFetched._doc };
      socket.user.socketId = socket.id;
      socket.user.rooms = [];
      return next();
    } catch (err) {
      console.log(err);
      return next(new Error(err));
    }
  } else {
    return next(new Error("Token is missing"));
  }
};

module.exports = { protect, protectSocket };
