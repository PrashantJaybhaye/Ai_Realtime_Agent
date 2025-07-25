import { Globe, Target, TrendingUp, Users } from 'lucide-react'
import React from 'react'

const stats = [
    { label: 'Success Rate', value: '95%', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Interviews Completed', value: '10K+', icon: <Target className="w-6 h-6" /> },
    { label: 'Happy Users', value: '2K+', icon: <Users className="w-6 h-6" /> },
    { label: 'Countries', value: '25+', icon: <Globe className="w-6 h-6" /> }
  ]

const StatSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default StatSection