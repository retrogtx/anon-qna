"use client"

import SignIn from "@/components/signin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    const response = await fetch(`/api/search?q=${searchQuery}`)
    const data = await response.json()
    setSearchResults(data)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to Anonymous QnA</h1>
      <p className="text-xl mb-6">Sign up to receive anonymous messages from people worldwide!</p>
      <SignIn />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Search for users</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
            <ul>
              {searchResults.map((user: any) => (
                <li key={user.id}>
                  <Link href={`/profile/${user.id}`} className="text-blue-500 hover:underline">
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home