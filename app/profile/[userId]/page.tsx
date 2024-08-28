import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { Textarea } from "@/components/ui/textarea"

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Profile</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
        <form action="/api/questions" method="POST">
          <input type="hidden" name="userId" value={user.id} />
          <Textarea
            name="content"
            placeholder="Type your question here..."
            className="w-full p-2 border rounded"
            rows={4}
          />
          <Button type="submit" className="mt-2">Send Question</Button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Answered Questions</h2>
        {user.questions.map((question) => (
          <div key={question.id} className="bg-card text-card-foreground p-4 rounded-lg mb-4 shadow">
            <p className="font-medium">{question.content}</p>
            <p className="mt-2">Answer: {question.answer?.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}