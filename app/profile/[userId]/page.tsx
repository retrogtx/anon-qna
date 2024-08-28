import { prisma } from "@/lib/prisma"
import UserProfile from "./UserProfile"

export default async function UserProfilePage({ params }: { params: { userId: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { id: true, name: true },
  })

  const questions = await prisma.question.findMany({
    where: { userId: params.userId },
    include: { answer: true },
    orderBy: { createdAt: 'desc' },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return <UserProfile user={user} questions={questions} />
}