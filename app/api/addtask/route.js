import { connectToDb } from "@/app/utils/connect";
import { Todo } from "@/app/utils/models";
import { NextResponse } from "next/server";


export async function POST(req) {
    try{
   await connectToDb();
   const {task} = await req.json();
  const exists = await Todo.findOne({$or:[{task:task}]});
  if(exists) {
    return NextResponse.json({message:"Please type your task."},{ status:500 })
  } 
  await Todo.create({task});
  return NextResponse.json({message:"Task Registered."}, {status: 201})
    } catch (error) {
   console.log("Error while adding task.", error);
   return NextResponse.json({message:"Error occured while adding."}, {status: 500})
    }

    
}
export async function GET(req) {
  try {
      await connectToDb();
      const mytasks = await Todo.find();
      
      return new NextResponse(JSON.stringify(mytasks), {status: 200});

  } catch (err) {
      throw new Error("Failed to fetch tasks!");
  }
}