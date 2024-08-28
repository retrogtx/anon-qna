import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { headers } from 'next/headers'
import UserSearch from "@/components/UserSearch"
import CopyButton from "@/components/CopyButton"
import QuestionList from "@/components/QuestionList"
import { revalidatePath } from "next/cache"

export default async function Dashboard() {
  const session = await auth()
  if (!session || !session.user) {
    redirect('/')
  }

  const questions = await prisma.question.findMany({
    where: { userId: session.user.id },
    include: { answer: true },
    orderBy: { createdAt: 'desc' },
  })

  const headersList = headers()
  const host = headersList.get('host') || ''
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`

  async function deleteQuestion(questionId: string) {
    'use server'
    try {
      await prisma.question.delete({
        where: { id: questionId },
      })
      revalidatePath('/dashboard')
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  }

  const profileUrl = `${baseUrl}/profile/${session.user.id}`

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
        <form action={async () => {
          'use server'
          await signOut()
        }}>
          <Button type="submit" variant="outline">Log out</Button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Questions</h2>
        <QuestionList questions={questions} deleteQuestion={deleteQuestion} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Share Your Profile</h2>
        <p>Share this link to receive anonymous questions:</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="w-full p-2 border rounded-l bg-muted"
          />
          <CopyButton text={profileUrl} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Search for users</h2>
        <UserSearch />
      </div>
    </div>
  )
}