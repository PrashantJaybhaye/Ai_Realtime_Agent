'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  BarChart3,
  CheckCircle,
  Clock
} from 'lucide-react'

interface ProfileStatsProps {
  totalInterviews: number
  averageScore: number
  highestScore: number
  joinDate: string
  isAdmin?: boolean
}

const ProfileStats = ({ 
  totalInterviews, 
  averageScore, 
  highestScore, 
  joinDate,
}: ProfileStatsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { label: 'Expert', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
    if (score >= 80) return { label: 'Advanced', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    if (score >= 60) return { label: 'Intermediate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
    return { label: 'Beginner', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
  }

  const performanceLevel = getPerformanceLevel(averageScore)

  return (
    <div className="space-y-6">
      {/* Performance Level Badge */}
      <div className="flex items-center justify-center">
        <Badge className={`${performanceLevel.color} px-4 py-2 text-sm font-semibold`}>
          {performanceLevel.label} Level
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Interviews</p>
                <p className="text-xl font-bold text-foreground">{totalInterviews}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Average Score</p>
                <p className={`text-xl font-bold ${getScoreColor(averageScore)}`}>
                  {averageScore}%
                </p>
              </div>
              <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Best Score</p>
                <p className={`text-xl font-bold ${getScoreColor(highestScore)}`}>
                  {highestScore}%
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Award className="h-4 w-4 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Member Since</p>
                <p className="text-sm font-bold text-foreground">{joinDate}</p>
              </div>
              <div className="h-8 w-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="font-semibold">{Math.floor(totalInterviews * 0.3)} interviews</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
            <p className="font-semibold">98%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Duration</p>
            <p className="font-semibold">25 min</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats