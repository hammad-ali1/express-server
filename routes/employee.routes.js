const router = require("express").Router();
const { getEmployees } = require("../controllers/employees.controller");

router.route("/").get(getEmployees);

module.exports = router;
