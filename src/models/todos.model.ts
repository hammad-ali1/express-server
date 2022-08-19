import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, rquired: true, ref: "User" },
    task: { type: String, required: true },
    title: { type: String, default: "Title" },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
