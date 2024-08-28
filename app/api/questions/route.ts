import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const formData = await request.formData()
  const userId = formData.get("userId") as string
  const content = formData.get("content") as string

  if (!userId || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const question = await prisma.question.create({
    data: {
      content,
      userId,
    },
  })

  return NextResponse.json(question)
}