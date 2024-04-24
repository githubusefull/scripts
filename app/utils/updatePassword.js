"use server";
import { connectToDb } from "./connect";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import  {User}  from "./models";
export async function updatePassword({ newPassword, token }) {
    await connectToDb();
    console.log(token);
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(newPassword, salt)
    await User.findOneAndUpdate(
        { verifytoken: token },
        { password: passwordHashed }
    );
    redirect("/login")

}