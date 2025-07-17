import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getFeedbackByInterviewId } from '@/lib/actions/general.action'
import UserError from '@/components/UserError'
import InterviewCard from '@/components/InterviewCard'
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Calendar,
  Filter,
  Search,
  Star,
  Target,
  ArrowRight,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { ActionButtonProvider } from '@/contexts/ActionButtonContext'

const FeedbackPage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  const userInterviews = await getInterviewByUserId(user.id)
  const completedInterviews = userInterviews?.filter(interview => interview.finalized) || []

  // Get feedback for each interview and calculate stats
  const interviewsWithFeedback = await Promise.all(
    completedInterviews.map(async (interview) => {
      const feedback = await getFeedbackByInterviewId({
        interviewId: interview.id,
        userId: user.id
      })
      return {
        ...interview,
        feedback
      }
    })
  )

  // Calculate stats from feedback data
  const totalInterviews = completedInterviews.length
  const feedbackScores = interviewsWithFeedback
    .map(interview => interview.feedback?.totalScore)
    .filter(score => score !== undefined && score !== null) as number[]
  
  const averageScore = feedbackScores.length > 0 
    ? Math.round(feedbackScores.reduce((sum, score) => sum + score, 0) / feedbackScores.length)
    : 0

  const highScoreCount = feedbackScores.filter(score => score >= 80).length

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">
            <BarChart3 className="w-4 h-4" />
            Performance Analytics
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Your Interview
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Feedback History
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your progress, review detailed feedback, and identify areas for improvement across all your practice sessions.
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="grid gap-6 sm:grid-cols-3">
        <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="stats-icon bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
            <Target className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">{totalInterviews}</div>
          <div className="text-sm text-muted-foreground">Total Interviews</div>
          <div className="text-xs text-blue-500 mt-1">All time</div>
        </div>

        <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="stats-icon bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">{averageScore}</div>
          <div className="text-sm text-muted-foreground">Average Score</div>
          <div className="text-xs text-green-500 mt-1">Out of 100</div>
        </div>

        <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="stats-icon bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20 transition-colors">
            <Award className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">{highScoreCount}</div>
          <div className="text-sm text-muted-foreground">High Scores</div>
          <div className="text-xs text-purple-500 mt-1">80+ points</div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Interview History</h2>
          <div className="text-sm text-muted-foreground">
            {totalInterviews} interview{totalInterviews !== 1 ? 's' : ''} completed
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </section>

      <ActionButtonProvider>
        {/* Interview Cards */}
        <section className="space-y-6">
          {completedInterviews.length > 0 ? (
            <div className="interviews-section">
              {completedInterviews.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-6">
              <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">No feedback history yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Complete your first interview to start tracking your progress and receiving detailed AI feedback.
                </p>
                <Button asChild className="btn-primary">
                  <Link href="/interview" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Start Your First Interview
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </ActionButtonProvider>

      {/* Performance Insights */}
      {completedInterviews.length > 0 && (
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-border/50">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Keep Improving!</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your interview skills are developing well. Continue practicing to achieve even better results and boost your confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary">
                <Link href="/interview">
                  Take Another Interview
                </Link>
              </Button>
              <Button variant="outline">
                View Performance Tips
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default FeedbackPage