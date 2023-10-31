import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  GithubProvider  from "next-auth/providers/github";
import  GoogleProvider  from "next-auth/providers/google";
import  CredentialProvider  from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import  bcrypt  from "bcrypt";

import prisma from "@/app/libs/prismadb"
import NextAuth from "next-auth/next";

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_CLIENT_SECRET as string
            
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        

        }),
        CredentialProvider({
            name: "credential",
            credentials: {
              email: { label: "email", type: "text" },
              password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                throw new Error("Invalid credentials");
              }
              // Check if the user exists in the database
              let user = await prisma.user.findUnique({
                where: {
                  email: credentials.email,
                },
              });
              // If not, create a new user with hashed password
              if (!user) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                user = await prisma.user.create({
                  data: {
                    email: credentials.email,
                    hashedPassword,
                  },
                });
              }
              // If yes, verify the password
              else if (!user.hashedPassword) {
                throw new Error("Invalid credentials");
              } else {
                const isCorrectPassword = await bcrypt.compare(
                  credentials.password,
                  user.hashedPassword
                );
                if (!isCorrectPassword) {
                  throw new Error("Invalid credentials");
                }
              }
              return user;
            },
          }),
    ],
    pages:{
        signIn:"/"
    },
    debug:process.env.NODE_ENV!=="production",
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions);