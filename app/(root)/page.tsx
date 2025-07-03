import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <>
            <section className="card-cta flex max-sm:flex-col-reverse">
                <div className="flex flex-col gap-6 max-w-xl text-balance">
                    <h2 className="text-neutral-200 line-clamp-3">
                        Sharpen Your Interview Skills with AI-Powered Practice
                    </h2>
                    <p className="text-lg max-sm:text-sm text-light-100/80">
                        Practice real interview scenarios with smart guidance and receive feedback instantly.
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    alt="AI Interview Assistant Illustration"
                    width={350}
                    height={350}
                    className="max-sm:size-48 mb-3 sm:block"
                    priority
                />
            </section>

            <section className="flex flex-col gap-4 mt-12">
                <h2>Your Past Interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}

                    {/* <p className="text-light-100/70 italic">You haven’t taken any interviews yet.</p> */}
                </div>
            </section>

            <section className="flex flex-col gap-4 mt-12">
                <h2>Explore Interview Modules</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}

                    {/* <p className="text-light-100/70 italic">No interview modules available right now.</p> */}
                </div>
            </section>
        </>
    )
}

export default Page
