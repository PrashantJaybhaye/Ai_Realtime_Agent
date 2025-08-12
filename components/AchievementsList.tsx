'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  CheckCircle, 
  Star, 
  Target, 
  TrendingUp, 
  Zap,
  Trophy,
  Medal
} from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  earned: boolean
  earnedDate?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementsListProps {
  totalInterviews: number
  averageScore: number
  highestScore: number
}

const AchievementsList = ({ totalInterviews, averageScore, highestScore }: AchievementsListProps) => {
  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first mock interview',
      icon: <Star className="w-5 h-5" />,
      earned: totalInterviews > 0,
      rarity: 'common'
    },
    {
      id: '2',
      name: 'High Performer',
      description: 'Scored 80+ on an interview',
      icon: <TrendingUp className="w-5 h-5" />,
      earned: highestScore >= 80,
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Consistent Learner',
      description: 'Completed 5+ interviews',
      icon: <Target className="w-5 h-5" />,
      earned: totalInterviews >= 5,
      rarity: 'common'
    },
    {
      id: '4',
      name: 'Expert Level',
      description: 'Achieved 90+ average score',
      icon: <Trophy className="w-5 h-5" />,
      earned: averageScore >= 90,
      rarity: 'legendary'
    },
    {
      id: '5',
      name: 'Interview Master',
      description: 'Completed 10+ interviews',
      icon: <Medal className="w-5 h-5" />,
      earned: totalInterviews >= 10,
      rarity: 'epic'
    },
    {
      id: '6',
      name: 'Perfect Score',
      description: 'Achieved a perfect 100 score',
      icon: <Zap className="w-5 h-5" />,
      earned: highestScore >= 100,
      rarity: 'legendary'
    }
  ]

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'rare':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'epic':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'legendary':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    }
  }

  const earnedCount = achievements.filter(a => a.earned).length

  return (
    <div className="space-y-6">
      {/* Achievement Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          <p className="text-sm text-muted-foreground">
            {earnedCount} of {achievements.length} unlocked
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">{earnedCount}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted/30 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(earnedCount / achievements.length) * 100}%` }}
        />
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`transition-all ${
              achievement.earned 
                ? 'bg-primary/5 border-primary/20 shadow-sm' 
                : 'opacity-60 hover:opacity-80'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                    {achievement.earned && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs capitalize ${getRarityColor(achievement.rarity)}`}
                    >
                      {achievement.rarity}
                    </Badge>
                    
                    {achievement.earned && achievement.earnedDate && (
                      <span className="text-xs text-muted-foreground">
                        {achievement.earnedDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Achievement */}
      {earnedCount < achievements.length && (
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Next Achievement</h4>
                <p className="text-sm text-muted-foreground">
                  {achievements.find(a => !a.earned)?.name || 'All achievements unlocked!'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AchievementsList