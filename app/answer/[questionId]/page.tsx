import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { redirect } from "next/navigation"

export default async function AnswerQuestion({ params }: { params: { questionId: string } }) {
  const session = await auth()
  if (!session || !session.user) {
    return <div>Not authenticated</div>
  }

  const question = await prisma.question.findUnique({
    where: { id: params.questionId },
    include: { user: true },
  })

  if (!question || question.userId !== session.user.id) {
    return <div>Question not found or you don't have permission to answer</div>
  }

  async function answerQuestion(formData: FormData) {
    "use server"
    const content = formData.get("content")
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Invalid answer content")
    }
    if (!question) {
      throw new Error("Question not found")
    }
    if (!session || !session.user) {
      throw new Error("User not authenticated")
    }
    await prisma.answer.create({
      data: {
        content: content.trim(),
        questionId: question.id,
        userId: session.user.id!,
      },
    })
    
    redirect("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Answer Question</h1>
      <div className="bg-card text-card-foreground p-4 rounded-lg mb-4 shadow">
        <p className="font-medium">{question.content}</p>
      </div>
      <form action={answerQuestion}>
        <Textarea
          name="content"
          placeholder="Type your answer here..."
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <Button type="submit" className="mt-2">Submit Answer</Button>
      </form>
    </div>
  )
}