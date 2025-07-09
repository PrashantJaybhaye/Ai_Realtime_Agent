import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Play, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'

const Page = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="card-cta flex max-sm:flex-col-reverse relative overflow-hidden bg-gradient-to-br from-background to-muted/30 shadow-xl border border-border max-sm:p-8">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-100/10 rounded-3xl" />
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-gradient-to-br from-primary/20 to-accent-100/20 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-accent-100/20 to-primary/20 rounded-full blur-2xl opacity-40" />
                </div>

                {/* Content Area */}
                <div className="relative z-10 flex flex-col justify-center max-w-xl gap-6 text-pretty">
                    <div className="flex items-center gap-2 bg-yellow-950 text-yellow-400 font-medium text-sm rounded-full px-3 py-1 w-fit">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Interview Practice
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-foreground">
                        Ace Your Next Interview with Confidence
                    </h1>

                    <p className="text-muted-foreground text-base leading-relaxed">
                        Simulate real interview scenarios with our intelligent AI coach. Receive real-time feedback, enhance your communication, and boost your success rate.
                    </p>

                    <div>
                        <Button asChild className="btn-primary max-sm:w-full">
                            <Link href="/interview">
                                <Play className="h-4 w-4" />
                                Start Interview
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Image Area */}
                <div className="relative flex justify-center items-center max-sm:hidden">
                    <Image
                        src="/robot.png"
                        alt="AI Interview Assistant"
                        width={380}
                        height={380}
                        className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] max-md:size-56"
                        priority
                    />
                </div>
            </section>


            {/* Stats Section */}
            <section className="grid gap-6 sm:grid-cols-3">
                <div className="stats-card">
                    <div className="stats-icon">
                        <Users className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-semibold text-foreground mb-1">1000+</div>
                    <div className="text-sm text-muted-foreground">Interviews Completed</div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-semibold text-foreground mb-1">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon">
                        <Zap className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-semibold text-foreground mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Availability</div>
                </div>
            </section>

            {/* Past Interviews Section */}
            <section className="flex flex-col gap-6 mt-16">
                <div className="flex items-center justify-between">
                    <h2 className="text-foreground">Recent Interviews <p className='text-lg max-sm:text-sm'>Continue where you left off</p></h2>

                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                </div>
            </section>

            {/* Explore Modules Section */}
            <section className="flex flex-col gap-6 mt-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-foreground">Popular Interview Templates<p className='text-lg max-sm:text-sm'>Start with proven interview formats</p></h2>
                    <Button variant="outline" size="sm">
                        Browse All
                    </Button>
                </div>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={`module-${interview.id}`} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Page
