import { connectToDb } from "@/app/utils/connect";
import { User } from "@/app/utils/models";
import { NextResponse } from "next/server";
import  bcrypt from 'bcrypt';


export async function POST(req) {
    try{
   await connectToDb();
   const {username, email, password} = await req.json();
  const exists = await User.findOne({$or:[{email}, {username}]});
  if(exists) {
    return NextResponse.json({message:"Username or Email already exists."},{ status:500 })
  } 
  const hashedPass = await bcrypt.hash(password, 10);
  await User.create({username, email, password:hashedPass});
  return NextResponse.json({message:"User Registered."}, {status: 201})
    } catch (error) {
   console.log("Error while registering user.", error);
   return NextResponse.json({message:"Error occured while registering."}, {status: 500})
    }
}