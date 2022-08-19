import { Router } from "express";

const todoRouter = Router();
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controller.js";
import { protect } from "../middleware/auth.middleware.js";

todoRouter.use(protect);

todoRouter.route("/").get(getTodos);
todoRouter.route("/").post(addTodo);
todoRouter.route("/:id").post(deleteTodo);
todoRouter.route("/:id").put(updateTodo);

export default todoRouter;
