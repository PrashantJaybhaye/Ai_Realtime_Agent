import React from 'react' 
import dayjs from 'dayjs' 
import Image from 'next/image' 
import Link from 'next/link' 
import { getRandomInterviewCover } from '@/lib/utils' 
import { Button } from './ui/button' 
import DisplayTechIcons from './DisplayTechIcons' 
 
const InterviewCard = ({ interviewId, role, type, techstack, createdAt }: 
InterviewCardProps) => { 
    const feedback = null as Feedback | null 
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type 
    const formattedDate = dayjs(feedback?.createdAt || createdAt || 
Date.now()).format('MMM D, YYYY') 
 
    return ( 
        <div className="card-border w-[360px] max-sm:w-full overflow-hidden shadow-sm 
hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 relative"> 
            <div className="card-interview "> 
                {/* Badge */} 
                <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-lg bg-blue-900/30 z
10 "> 
                    <p className="badge-text text-blue-400">{normalizedType}</p> 
                </div> 
 
                {/* Header */} 
                <div className="flex flex-col items-start gap-4"> 
                    <Image 
                        src={getRandomInterviewCover()} 
                        alt="Interview cover" 
                        width={72} 
                        height={72} 
                        className="object-cover rounded-full border-2 border-gray-500" 
                    /> 
                    <h3 className="text-2xl font-semibold text-white capitalize line-clamp-2"> 
                        {role} Interview 
                    </h3>    
                </div> 
 
                {/* Metadata */} 
                <div className="flex flex-row justify-start gap-2 text-sm text-light-100/80"> 
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-bold"> 
                        <Image 
                            src="/calendar.svg" 
                            alt="Calendar" 
                            width={16} 
                            height={16} 
                            className="opacity-70" 
                        /> 
                        <span>{formattedDate}</span> 
                    </div> 
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-bold"> 
                        <Image src="/star.svg" alt="rating" width={16} height={16} 
className="opacity-70" /> 
                        <span>{feedback?.totalScore ?? '---'}/100</span> 
                    </div> 
                </div> 
 
                {/* Feedback Summary */} 
                <div className='p-3 rounded-lg mb-4 bg-blue-900/20 border border-blue-900/30'> 
                    <p className="text-sm line-clamp-3 text-left text-blue-700 dark:text-blue-300"> 
                        {feedback?.finalAssessment ?? 
                            "You haven't taken this interview yet. Take it now to improve your skills!"} 
                    </p> 
                </div> 
 
                {/* Tech + Button */} 
                <div className="flex justify-between items-center mt-2"> 
                    <DisplayTechIcons techStack={techstack} /> 
                    <Button className="btn-primary text-sm font-semibold"> 
                        <Link 
                            href={feedback 
                                ? `/interview/${interviewId}/feedback` 
                                : `/interview/${interviewId}`} 
                        > 
                            {feedback ? 'View Detailed Feedback' : 'Begin Interview'} 
                        </Link> 
                    </Button> 
                </div> 
            </div> 
        </div> 
    ) 
} 
 
export default InterviewCard