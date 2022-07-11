const asyncHandler = require("express-async-handler");
let Todo = require("../models/todos.model");

const getTodos = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

const addTodo = asyncHandler(async (req, res) => {
  try {
    const user = req.user._id;
    const { task } = req.body;
    if (!task) {
      return res
        .send(400)
        .json({ success: false, err: "Task cannot be empty" });
    }
    const newTodo = await Todo.create({
      user,
      task,
    });
    if (newTodo) {
      return res
        .status(201)
        .json({ success: true, data: { task: newTodo.task } });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});

module.exports = {
  getTodos,
  addTodo,
};
