import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    verifytoken: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);
const toDoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
    }, 
  },
  { timestamps: true }
);


export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Todo = mongoose.models?.Todo || mongoose.model("Todo", toDoSchema);
