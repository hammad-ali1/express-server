import asyncHandler from "express-async-handler";
import Todo from "../models/todos.model.js";

export const getTodos = asyncHandler(async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find({ user: userId });
    res.status(200).json({ success: true, todos: todos });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

export const addTodo = asyncHandler(async (req: any, res: any) => {
  try {
    const user = req.user._id;
    const { task, title } = req.body;
    if (!task) {
      return res
        .send(400)
        .json({ success: false, err: "Task cannot be empty" });
    }
    const newTodo = await Todo.create({
      user,
      task,
      title,
    });
    if (newTodo) {
      return res
        .status(201)
        .json({ success: true, task: newTodo.task, title: newTodo.title });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.deleteOne({ _id: id });
    if (result.acknowledged) res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

export const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});
