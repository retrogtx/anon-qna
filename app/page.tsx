import SignIn from "@/components/signin"
import UserSearch from "@/components/UserSearch"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to Anonymous QnA</h1>
      <p className="text-xl mb-6">Sign up to receive anonymous messages from people worldwide!</p>
      <SignIn />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Search for users</h2>
        <UserSearch />
      </div>
    </div>
  )
}