import { connectToDb } from "@/app/utils/connect";
import { User } from "@/app/utils/models";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

           
async function login(credentials){
    try {
        connectToDb();
        const user = await User.findOne({email:credentials.email});
        if(!user) throw new Error("Wrong Credentials.");
        const isCorrect = await bcrypt.compare(credentials.password, user.password);
        if(!isCorrect) throw new Error("Wrong Credentials.");
        return user;
    } catch (error) {
        console.log("error while logging in.")
        throw new Error("Something went wrong.")
    }
}
export const authOptions = {
    pages:{
        signIn:"/login",
    },
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    throw new Error("Failed to login.")
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.username = user.username;
                token.email = user.email;
                token.id = user.id;
            }
            console.log("this is the token", token)
            return token;
        },
        async session({ session, token }) {
            if(token) {
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.id = token.id;
            }
            console.log("this is the session", session)
            return session;
        }
    }
}
const hanlder = NextAuth(authOptions);
export {hanlder as GET, hanlder as POST};

