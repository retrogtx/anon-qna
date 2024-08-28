"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Question = {
  id: string
  content: string
  answer: { content: string } | null
}

export default function QuestionList({ questions, deleteQuestion }: { 
  questions: Question[], 
  deleteQuestion: (id: string) => Promise<void> 
}) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    await deleteQuestion(id)
    router.refresh()
  }

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question.id} className="bg-card text-card-foreground p-4 rounded-lg mb-4 shadow">
            <p className="font-medium">{question.content}</p>
            {question.answer ? (
              <p className="mt-2">Your answer: {question.answer.content}</p>
            ) : (
              <Link href={`/answer/${question.id}`}>
                <Button className="mt-2">Answer</Button>
              </Link>
            )}
            <Button onClick={() => handleDelete(question.id)} variant="destructive" className="mt-2 ml-2">Delete</Button>
          </div>
        ))
      ) : (
        <p>You haven't received any questions yet. Share your profile to get started!</p>
      )}
    </div>
  )
}