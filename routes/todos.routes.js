const router = require("express").Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos.controller.js");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.route("/").get(getTodos);
router.route("/").post(addTodo);
router.route("/:id").post(deleteTodo);
router.route("/:id").put(updateTodo);
module.exports = router;
