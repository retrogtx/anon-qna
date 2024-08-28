import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { nanoid } from "nanoid"
import { prisma } from "./lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      let dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      })

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            id: nanoid(),
            name: user.name || `Anonymous${nanoid(6)}`,
            email: user.email,
          },
        })
      }

      user.id = dbUser.id

      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
})