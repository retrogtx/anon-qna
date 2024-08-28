"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type Question = {
  id: string
  content: string
  answer: { content: string } | null
}

export default function QuestionList({ questions: initialQuestions }: { questions: Question[] }) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null)
  const [answerContent, setAnswerContent] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error("Failed to delete question")
      }

      setQuestions(questions.filter(q => q.id !== id))
      toast({
        title: "Question deleted",
        description: "The contents have been deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the question. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAnswer = async (questionId: string) => {
    try {
      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          content: answerContent,
        }),
      })

      if (response.ok) {
        setAnsweringQuestionId(null)
        setAnswerContent('')
        router.refresh()
        toast({
          title: "Answer submitted",
          description: "Your answer has been successfully submitted.",
        })
      } else {
        throw new Error("Failed to submit answer")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the answer. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question.id} className="bg-card text-card-foreground p-4 rounded-lg mb-4 shadow">
            <p className="font-medium">{question.content}</p>
            {question.answer ? (
              <p className="mt-2">Your answer: {question.answer.content}</p>
            ) : answeringQuestionId === question.id ? (
              <div className="mt-2">
                <Textarea
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-2 border rounded"
                  rows={4}
                />
                <Button onClick={() => handleAnswer(question.id)} className="mt-2">Submit Answer</Button>
                <Button onClick={() => setAnsweringQuestionId(null)} variant="outline" className="mt-2 ml-2">Cancel</Button>
              </div>
            ) : (
              <Button onClick={() => setAnsweringQuestionId(question.id)} className="mt-2">Answer</Button>
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