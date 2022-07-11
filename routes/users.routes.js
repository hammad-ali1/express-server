const router = require("express").Router();
const {
  addUser,
  loginUser,
  getUser,
} = require("../controllers/users.controller");
const { protect } = require("../middleware/auth.middleware");

router.route("/").post(addUser);
router.route("/login").post(loginUser);

router.route("/data").get(protect, getUser);

module.exports = router;
