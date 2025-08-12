import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getFeedbackByInterviewId } from '@/lib/actions/general.action'
import UserError from '@/components/UserError'
import InterviewCard from '@/components/InterviewCard'
import {
  Calendar,
  Award,
  TrendingUp,
  Target,
  BarChart3,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { ActionButtonProvider } from '@/contexts/ActionButtonContext'

const ProfilePage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  const userInterviews = await getInterviewByUserId(user.id)
  const completedInterviews = userInterviews?.filter(interview => interview.finalized) || []
  
  // Get feedback for completed interviews
  const interviewsWithFeedback = await Promise.all(
    completedInterviews.slice(0, 6).map(async (interview) => {
      const feedback = await getFeedbackByInterviewId({
        interviewId: interview.id,
        userId: user.id
      })
      return { ...interview, feedback }
    })
  )

  const feedbackScores = interviewsWithFeedback
    .map(interview => interview.feedback?.totalScore)
    .filter(score => score !== undefined && score !== null) as number[]

  const averageScore = feedbackScores.length > 0
    ? Math.round(feedbackScores.reduce((sum, score) => sum + score, 0) / feedbackScores.length)
    : 0

  const highestScore = feedbackScores.length > 0 ? Math.max(...feedbackScores) : 0
  const totalInterviews = completedInterviews.length
  const joinDate = dayjs().subtract(Math.floor(Math.random() * 365), 'days').format('MMMM YYYY')

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const achievements = [
    { name: 'First Interview', description: 'Completed your first mock interview', earned: totalInterviews > 0 },
    { name: 'High Performer', description: 'Scored 80+ on an interview', earned: highestScore >= 80 },
    { name: 'Consistent Learner', description: 'Completed 5+ interviews', earned: totalInterviews >= 5 },
    { name: 'Expert Level', description: 'Achieved 90+ average score', earned: averageScore >= 90 },
  ]

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <section className="relative">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl border border-border/50 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold border-4 border-background shadow-lg">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {joinDate}</span>
                  </div>
                  {user.isAdmin && (
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Interviews</p>
                <p className="text-2xl font-bold text-foreground">{totalInterviews}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                  {averageScore}%
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Best Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(highestScore)}`}>
                  {highestScore}%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-foreground">
                  {achievements.filter(a => a.earned).length}
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Achievements */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement, index) => (
            <Card key={index} className={`transition-all ${achievement.earned ? 'bg-primary/5 border-primary/20' : 'opacity-60'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.earned ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Interviews */}
      <ActionButtonProvider>
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Recent Interviews</h2>
            <Button variant="outline" asChild>
              <Link href="/feedback">View All</Link>
            </Button>
          </div>

          {interviewsWithFeedback.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interviewsWithFeedback.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No interviews yet</h3>
                <p className="text-muted-foreground mb-4">Start your first interview to begin tracking your progress</p>
                <Button asChild>
                  <Link href="/interview">Start Interview</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </ActionButtonProvider>

      {/* Activity Chart Placeholder */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Performance Trends</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Score History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center space-y-2">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Performance chart coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default ProfilePage