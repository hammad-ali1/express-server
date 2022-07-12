const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRouter = require("./routes/todos.routes");
const usersRouter = require("./routes/users.routes");
const { Server } = require("socket.io");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
//listen on port
const server = app.listen(port, () =>
  console.log(`server listening on port ${port}`)
);
const io = new Server(server);

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

app.get("/", (req, res) => {
  res.send("Hammad's server");
});

//socket io logic
io.on("connection", (socket) => {
  console.log("a user connected");
});
