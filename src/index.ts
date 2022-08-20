import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
//routers
import todosRouter from "./routes/todos.routes.js";
import usersRouter from "./routes/users.routes.js";
import employeeRouter from "./routes/employee.routes.js";
dotenv.config();
const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

//add middlewares
app.use(cors());
app.use(express.json());

//connection uri
const uri = process.env.ATLAS_URI;

//establish mongodb connection
mongoose.connect(uri!);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established");
});

//add routers
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/employees", employeeRouter);

app.get("/", (req, res) => {
  res.send("Hammad's server");
});

//listen on port
server.listen(port, () => console.log(`server listening on port ${port}`));
