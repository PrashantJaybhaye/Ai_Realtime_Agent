import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Play, Sparkles, TrendingUp, Users, Zap, ArrowRight, Clock, Target, CheckCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import UserError from '@/components/UserError'
import { ActionButtonProvider } from '@/contexts/ActionButtonContext'

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
            <section className="relative overflow-hidden rounded-2xl border border-border/40 shadow-sm px-6 sm:px-12 py-10 lg:py-10">
                {/* Glow Effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-100px] left-[-80px] w-80 h-80 bg-primary/20 blur-3xl rounded-full opacity-40"></div>
                    <div className="absolute bottom-[-80px] right-[-60px] w-64 h-64 bg-accent/20 blur-2xl rounded-full opacity-30"></div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-1">
                    {/* Left Content */}
                    <div className="max-w-2xl text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground rounded-full border border-border/50 w-fit mx-auto lg:mx-0">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Powered by AI + Real-Time Feedback
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            <span className="bg-gradient-to-r from-primary to-accent max-sm:bg-gradient-to-br max-sm:to-gray-500 bg-clip-text text-transparent">
                                Interview Smarter,
                            </span>{" "}
                            <br className="hidden sm:block" />
                            <span className="text-foreground">Perform Better</span>
                        </h1>

                        <p className="text-muted-foreground text-lg max-w-xl">
                            Sidvia helps you master interviews through personalized AI practice, real-time evaluation, and performance analytics.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button asChild size="lg" className="bg-dark-200 text-white hover:bg-dark-300 gap-2 text-base font-bold">
                                <Link href="/interview" className="flex items-center gap-2">
                                    <Play className="h-5 w-5" />
                                    Start Practicing
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>

                            <Button variant="outline"
                                size="lg"
                                className="gap-2 text-base font-bold border-muted hover:border-primary">
                                View Past Results
                            </Button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl rounded-full scale-110 -z-10 opacity-30"></div>
                        <Image
                            src="/robot.png"
                            alt="AI Interview Assistant"
                            width={420}
                            height={420}
                            className="drop-shadow-xl rounded-xl max-md:size-64 transition-transform max-md:hidden"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Enhanced Stats Section */}
            <section className="grid gap-6 sm:grid-cols-3">
                <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="stats-icon bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                        <Users className="h-6 w-6" />
                    </div>
                    <div className="text-3xl mb-2 font-extrabold bg-gradient-to-b from-neutral-50 to-neutral-600 text-transparent bg-clip-text">1000+</div>
                    <div className="text-base font-medium text-muted-foreground">Interviews Completed</div>
                    <div className="text-xs text-green-500 mt-1">↗ +15% this month</div>
                </div>

                <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="stats-icon bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div className="text-3xl mb-2 font-extrabold bg-gradient-to-b from-neutral-50 to-neutral-600 text-transparent bg-clip-text">95%</div>
                    <div className="text-base font-medium text-muted-foreground">Success Rate</div>
                    <div className="text-xs text-green-500 mt-1">↗ +2% improvement</div>
                </div>

                <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="stats-icon bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20 transition-colors">
                        <Zap className="h-6 w-6" />
                    </div>
                    <div className="text-3xl mb-2 font-extrabold bg-gradient-to-b from-neutral-50 to-neutral-600 text-transparent bg-clip-text">24/7</div>
                    <div className="text-base font-medium text-muted-foreground">AI Availability</div>
                    <div className="text-xs text-blue-500 mt-1">Always ready</div>
                </div>
            </section>

            <ActionButtonProvider>
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
            </ActionButtonProvider>

            {/* Enhanced Call to Action Section */}

            {/* CTA Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl" />
                <div className="relative p-12 text-center space-y-6 rounded-3xl border border-border/50">
                    <h2 className="text-3xl lg:text-4xl font-bold">Ready to Ace Your Next Interview?</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Join thousands of successful candidates who&apos;ve improved their interview skills with Sidvia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="gap-2 text-base font-medium">
                            <Link href="/interview">
                                <Play className="h-5 w-5 mr-2" />
                                Start Practicing Now
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 text-base font-medium border-muted hover:border-primary">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page