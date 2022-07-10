const router = require("express").Router();
const { getTodos, addTodo } = require("../controllers/todos.controller.js");

router.route("/").get(getTodos);
router.route("/").post(addTodo);
module.exports = router;
