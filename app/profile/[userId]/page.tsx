import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"

export default async function UserProfile({ params }: { params: { userId: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      questions: {
        include: { answer: true },
        where: { answer: { isNot: null } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Profile</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
        <form action="/api/questions" method="POST">
          <input type="hidden" name="userId" value={user.id} />
          <textarea
            name="content"
            placeholder="Type your question here..."
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
          <Button type="submit" className="mt-2">Send Question</Button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Answered Questions</h2>
        {user.questions.map((question: { id: Key | null | undefined; content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; answer: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined } }) => (
          <div key={question.id} className="bg-gray-100 p-4 rounded mb-4">
            <p className="font-medium">{question.content}</p>
            <p className="mt-2">Answer: {question.answer?.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}