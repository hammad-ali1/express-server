import { Router } from "express";
import { getEmployees } from "../controllers/employees.controller.js";

const employeeRouter = Router();

employeeRouter.route("/").get(getEmployees);

export default employeeRouter;
