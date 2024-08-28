"use client"

import { signInWithGoogle } from "@/app/actions/auth"
import { Button } from "./ui/button"

export default function SignIn() {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit">Sign in with Google</Button>
    </form>
  )
}