import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import UserError from '@/components/UserError';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getCurrentUser();

  if (!user) return <UserError />;
  if (!interview) redirect('/')

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "technical":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400"
      case "behavioral":
        return "bg-green-500/20 border-green-500/30 text-green-400"
      case "mixed":
        return "bg-purple-500/20 border-purple-500/30 text-purple-400"
      default:
        return "bg-blue-500/20 border-blue-500/30 text-blue-400"
    }
  }

  return (
    <>
      <div className='flex flex-row gap-4 justify-between items-center max-sm:items-start'>
        <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
          <div className='flex flex-row gap-4 items-center'>
            <Image src={getRandomInterviewCover()} alt='coverImage' width={40} height={40} className='rounded-full object-cover size-[40px]' />
            <h3 className='capitalize'>{interview.role} Development Interview</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className={`px-3 py-1.5 rounded-lg border font-medium z-20 backdrop-blur-sm capitalize ${getTypeColor(interview.type)}`}>
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />


    </>
  )
}

export default page