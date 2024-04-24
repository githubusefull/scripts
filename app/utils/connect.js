import mongoose from "mongoose"


export async function connectToDb (){
  try {
  await mongoose.connect(process.env.MONGO_ID);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Not Connected to DB", error);
  }
};