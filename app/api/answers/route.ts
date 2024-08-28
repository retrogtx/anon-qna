import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(request: Request) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { questionId, content } = await request.json()

  if (!questionId || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    })

    if (!question || question.userId !== session.user.id) {
      return NextResponse.json({ error: "Question not found or unauthorized" }, { status: 404 })
    }

    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(answer, { status: 201 })
  } catch (error) {
    console.error("Error creating answer:", error)
    return NextResponse.json({ error: "Error creating answer" }, { status: 500 })
  }
}