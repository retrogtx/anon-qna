import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name}</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Questions</h2>
        {questions.map((question: { id: Key | null | undefined; content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; answer: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined } }) => (
          <div key={question.id} className="bg-gray-100 p-4 rounded mb-4">
            <p className="font-medium">{question.content}</p>
            {question.answer ? (
              <p className="mt-2">Your answer: {question.answer.content}</p>
            ) : (
              <Button className="mt-2">Answer</Button>
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
          className="w-full p-2 border rounded mt-2"
        />
      </div>
    </div>
  )
}