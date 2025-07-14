import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Play, Sparkles, TrendingUp, Users, Zap, ArrowRight, Clock, Target, CheckCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import UserError from '@/components/UserError'

const Page = async () => {
    const user = await getCurrentUser();
    if (!user) return <UserError />;

    const [userInterviews, latestInterviews] = await Promise.all([
        getInterviewByUserId(user.id),
        getLatestInterviews({ userId: user.id }),
    ]);

    const hasPastInterviews = Array.isArray(userInterviews) && userInterviews.length > 0;
    const hasUpcomingInterviews = Array.isArray(latestInterviews) && latestInterviews.length > 0;

    return (
        <div className="space-y-16">
            {/* Enhanced Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background rounded-3xl" />
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-60" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl opacity-50" />
                </div>

                <div className="relative card-cta flex max-sm:flex-col-reverse bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm border-2 border-border/50">
                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col justify-center max-w-2xl gap-8 text-pretty">
                        {/* Badge */}
                        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-950/80 to-orange-950/80 text-yellow-400 font-medium text-sm rounded-full px-4 py-2 w-fit border border-yellow-500/20">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Interview Practice
                        </div>

                        {/* Personalized Greeting */}
                        <div className="space-y-2">
                            <div className="text-2xl sm:text-3xl font-bold text-foreground">
                                Welcome back, {user.name}! 👋
                            </div>
                            <p className="text-muted-foreground text-sm">{user.email}</p>
                        </div>

                        {/* Main Headline */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                    Master Your Next
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Interview
                                </span>
                            </h1>

                            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                Practice with our intelligent AI interviewer, get real-time feedback, and boost your confidence for any technical or behavioral interview.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild className="btn-primary h-12 px-8 text-base font-semibold group">
                                <Link href="/interview" className="flex items-center gap-2">
                                    <Play className="h-5 w-5" />
                                    Start Interview Practice
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-12 px-8 text-base font-semibold border-border/50 hover:border-primary/50">
                                View Past Results
                            </Button>
                        </div>
                    </div>

                    {/* Enhanced Image Area */}
                    <div className="relative flex justify-center items-center max-sm:mb-8 max-md:hidden">
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl scale-110" />
                            <Image
                                src="/robot.png"
                                alt="AI Interview Assistant"
                                width={420}
                                height={420}
                                className="relative drop-shadow-2xl max-md:size-64 transition-transform hover:scale-105 duration-300"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Stats Section */}
            <section className="grid gap-6 sm:grid-cols-3">
                <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="stats-icon bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                        <Users className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Interviews Completed</div>
                    <div className="text-xs text-green-500 mt-1">↗ +15% this month</div>
                </div>

                <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="stats-icon bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-xs text-green-500 mt-1">↗ +2% improvement</div>
                </div>

                <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="stats-icon bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20 transition-colors">
                        <Zap className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Availability</div>
                    <div className="text-xs text-blue-500 mt-1">Always ready</div>
                </div>
            </section>

            {/* Past Interviews Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">Your Interview History</h2>
                        <p className="text-muted-foreground">Track your progress and review past performances</p>
                    </div>
                    {hasPastInterviews && (
                        <Button variant="outline" className="hidden sm:flex">
                            View All
                        </Button>
                    )}
                </div>

                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews?.slice(0, 3).map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 space-y-4">
                            <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                                <Clock className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No interviews yet</h3>
                                <p className="text-muted-foreground mb-4">Start your first interview to begin tracking your progress</p>
                                <Button asChild className="btn-primary">
                                    <Link href="/interview">
                                        <Play className="h-4 w-4 mr-2" />
                                        Start Your First Interview
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Explore Modules Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">Explore Interview Modules</h2>
                        <p className="text-muted-foreground">Discover new interview challenges and expand your skills</p>
                    </div>
                    {hasUpcomingInterviews && (
                        <Button variant="outline" className="hidden sm:flex">
                            Browse All
                        </Button>
                    )}
                </div>

                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        latestInterviews?.slice(0, 3).map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 space-y-4">
                            <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                                <Target className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No modules available</h3>
                                <p className="text-muted-foreground mb-4">Check back later for new interview modules</p>
                                <Button variant="outline">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Create Custom Interview
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl" />
                <div className="relative p-12 text-center space-y-6 rounded-3xl border border-border/50">
                    <h2 className="text-3xl lg:text-4xl font-bold">Ready to Ace Your Next Interview?</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Join thousands of successful candidates who&apos;ve improved their interview skills with Sidvia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="btn-primary h-12 px-8 text-base font-semibold">
                            <Link href="/interview">
                                <Play className="h-5 w-5 mr-2" />
                                Start Practicing Now
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-12 px-8 text-base font-semibold">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page