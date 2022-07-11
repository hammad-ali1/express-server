const router = require("express").Router();
const { getTodos, addTodo } = require("../controllers/todos.controller.js");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.route("/").get(getTodos);
router.route("/").post(addTodo);
module.exports = router;
