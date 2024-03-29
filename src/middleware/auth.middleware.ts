import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/users.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1]; //splits "Bearer token"
      //verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      //get user from token
      const userFound = await User.findById(decoded.id).select("-password");
      if (userFound) {
        req.user = userFound;
      } else {
        throw new Error("User not found");
      }
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

export const protectSocket = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      //get user from token
      const userFetched: any = await User.findById(decoded.id).select(
        "-password"
      );
      socket.user = { ...userFetched._doc };
      socket.user.socketId = socket.id;
      socket.user.rooms = [];
      return next();
    } catch (err) {
      console.log(err);
      return next(new Error("error in protectSocket middleware"));
    }
  } else {
    return next(new Error("Token is missing"));
  }
};

export default { protect, protectSocket };
