import SignIn from "@/components/signin"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Anonymous QnA</h1>
      <p className="text-xl mb-6">Sign up to receive anonymous messages from people worldwide!</p>
      <SignIn />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Search for users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded"
        />
        <Button className="mt-2">Search</Button>
      </div>
    </div>
  )
}

export default Home