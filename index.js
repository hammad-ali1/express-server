import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import MySocket from "./modules/mySocket.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const { io, getAllUsers, getRoomUsers } = MySocket(server);

//routers
import todosRouter from "./routes/todos.routes.js";
import usersRouter from "./routes/users.routes.js";
import employeeRouter from "./routes/employee.routes.js";

const port = process.env.PORT || 5000;

//add middlewares
app.use(cors());
app.use(express.json());

//connection uri
const uri = process.env.ATLAS_URI;

//establish mongodb connection
mongoose.connect(uri, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established");
});

//add routers
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/employee", employeeRouter);

app.get("/api/online", (req, res) => {
  res.send(getAllUsers());
});
app.get("/api/online/room", (req, res) => {
  res.send(getRoomUsers("GAME"));
});

app.get("/", (req, res) => {
  res.send("Hammad's server");
});

//listen on port
server.listen(port, () => console.log(`server listening on port ${port}`));
