import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcrypt";
import { UserSchema } from "../schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "username", type: "text" },
        password: { laber: "password", type: "password" }
      },
      authorize: async (credentials) => {

        const result = UserSchema.safeParse(credentials)

        if (!result.success) {

          result.error.issues.map(issue => {
            return { errors: issue.message }
          })
        }

        const user = await prisma.user.findUnique({
          where: {
            username: result.data?.username,
          }
        })
        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const isMatch = bcrypt.compare(credentials.password as string, user.password as string)

        if (!isMatch) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          ...user,
          id: user.id.toString(),
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET
})