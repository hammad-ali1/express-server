const express = require("express");
const app = express();
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const cors = require("cors");
const { io, getAllUsers, getRoomUsers } = require("./modules/mySocket")(server);

//routers
const todosRouter = require("./routes/todos.routes");
const usersRouter = require("./routes/users.routes");
require("dotenv").config();

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
