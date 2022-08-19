import { Router } from "express";
import {
  addUser,
  loginUser,
  getUser,
} from "../controllers/users.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.route("/").post(addUser);
userRouter.route("/login").post(loginUser);

userRouter.route("/data").get(protect, getUser);

export default userRouter;
