"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string | null
}

type Answer = {
  content: string
}

type Question = {
  id: string
  content: string
  createdAt: Date
  userId: string
  answer: Answer | null
}

export default function UserProfile({ user, questions }: { user: User, questions: Question[] }) {
  const [questionContent, setQuestionContent] = useState("")
  const [isSubmitting, startTransition] = useTransition()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  async function askQuestion(formData: FormData) {
    const content = formData.get("content") as string
    if (content.trim() === "") {
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          setQuestionContent("")
          setShowConfirmation(true)
          setTimeout(() => setShowConfirmation(false), 3000)
          router.refresh()
        } else {
          console.error("Failed to submit question")
        }
      } catch (error) {
        console.error("Error submitting question:", error)
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Profile</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
        <form action={askQuestion}>
          <Textarea
            name="content"
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
            placeholder="Type your question here..."
            className="w-full p-2 border rounded mb-2"
            rows={4}
            required
          />
          <input type="hidden" name="userId" value={user.id} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Question"}
          </Button>
        </form>
        {showConfirmation && (
          <p className="text-green-600 mt-2">Your question has been submitted anonymously!</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Answered Questions</h2>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.id} className="bg-card text-card-foreground p-4 rounded-lg mb-4 shadow">
              <p className="font-medium">Q: {question.content}</p>
              {question.answer ? (
                <p className="mt-2">A: {question.answer.content}</p>
              ) : (
                <p className="mt-2 text-gray-500">This question hasn't been answered yet.</p>
              )}
            </div>
          ))
        ) : (
          <p>No questions yet.</p>
        )}
      </div>
    </div>
  )
}