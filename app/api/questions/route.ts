import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const formData = await request.formData()
  const content = formData.get("content") as string
  const userId = formData.get("userId") as string

  if (!content || !userId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  console.log("Creating question for user:", userId) // Add this line for debugging

  try {
    const question = await prisma.question.create({
      data: {
        content,
        userId, // This is the ID of the user receiving the question
      },
    })

    console.log("Created question:", question) // Add this line for debugging

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json({ error: "Error creating question" }, { status: 500 })
  }
}