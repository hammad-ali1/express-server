let Todo = require("../models/todos.model");

const getTodos = (req, res) => {
  Todo.find()
    .then((todo) => res.json({ success: true, data: todo }))
    .catch((err) => res.status(400).json({ success: false, err: err }));
};

const addTodo = (req, res) => {
  const { username, task } = req.body;
  const newTodo = new Todo({
    username,
    task,
  });
  newTodo
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(400).json({ success: false, err: err }));
};

module.exports = {
  getTodos,
  addTodo,
};
