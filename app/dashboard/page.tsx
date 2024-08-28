import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Dashboard() {
  const session = await auth()
  if (!session || !session.user) {
    return <div>Not authenticated</div>
  }

  const questions = await prisma.question.findMany({
    where: { userId: session.user.id },
    include: { answer: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name}</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Questions</h2>
        {questions.map((question) => (
          <div key={question.id} className="bg-card text-card-foreground p-4 rounded-lg mb-4 shadow">
            <p className="font-medium">{question.content}</p>
            {question.answer ? (
              <p className="mt-2">Your answer: {question.answer.content}</p>
            ) : (
              <Link href={`/answer/${question.id}`}>
                <Button className="mt-2">Answer</Button>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Share Your Profile</h2>
        <p>Share this link to receive anonymous questions:</p>
        <input
          type="text"
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${session.user.id}`}
          readOnly
          className="w-full p-2 border rounded mt-2 bg-muted"
        />
      </div>
    </div>
  )
}