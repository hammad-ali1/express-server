const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRouter = require("./routes/todos.routes");
const usersRouter = require("./routes/users.routes");
require("dotenv").config();

const port = process.env.port || 5000;

const app = express();

//add middlewares
app.use(cors());
app.use(express.json());

//connection uri
const uri = process.env.ATLAS_URI;

//establish connection
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

//listen on port
app.listen(port, () => console.log(`server listening on port ${port}`));
