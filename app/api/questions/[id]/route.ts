import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const questionId = params.id

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { answer: true },
    })

    if (!question || question.userId !== session.user.id) {
      return NextResponse.json({ error: "Question not found or unauthorized" }, { status: 404 })
    }

    // Delete the associated answer if it exists
    if (question.answer) {
      await prisma.answer.delete({
        where: { id: question.answer.id },
      })
    }

    // Now delete the question
    await prisma.question.delete({
      where: { id: questionId },
    })

    return NextResponse.json({ message: "Question deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting question:", error)
    return NextResponse.json({ error: "Error deleting question" }, { status: 500 })
  }
}