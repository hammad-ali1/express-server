const mongoose = require("mongoose");

//connection uri
const uri =
  "mongodb+srv://talha:talha@cluster0.l0d6hsx.mongodb.net/?retryWrites=true&w=majority";

//establish mongodb connection
mongoose.connect(uri, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established");
});
