const router = require("express").Router();
const {
  addUser,
  authenticateUser,
} = require("../controllers/users.controller");

router.route("/").get(authenticateUser);
router.route("/").post(addUser);

module.exports = router;
