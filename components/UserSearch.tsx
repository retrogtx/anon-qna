"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    const response = await fetch(`/api/search?q=${searchQuery}`)
    const data = await response.json()
    setSearchResults(data)
  }

  return (
    <div>
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
  )
}