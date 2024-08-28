import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { nanoid } from "nanoid"
import { prisma } from "./lib/prisma"
// import { signOut } from "next-auth/react"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name || `Anonymous${nanoid(6)}`,
            email: user.email,
          },
        })
      }

      return true
    },
  },
})