import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

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
    name: {
      type: String,
    }, 
  },
  { timestamps: true }
);


export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Todo = mongoose.models?.Todo || mongoose.model("Todo", toDoSchema);
