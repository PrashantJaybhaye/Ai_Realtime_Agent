import React from 'react'
import AnimationContainer from './Animations/AnimationContainer'
import { Globe, Target, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Success Rate',
    value: '95%',
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    delay: 0.3,
  },
  {
    label: 'Interviews Completed',
    value: '5,000+',
    icon: <Target className="w-6 h-6 text-primary" />,
    delay: 0.35,
  },
  {
    label: 'Countries',
    value: '15+',
    icon: <Globe className="w-6 h-6 text-primary" />,
    delay: 0.4,
  },
]

const StatSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 text-center">
          {stats.map((stat, index) => (
            <AnimationContainer
              key={index}
              delay={stat.delay}
              className="flex flex-col items-center space-y-3"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold bg-gradient-to-b from-neutral-50 to-neutral-600 text-transparent bg-clip-text">
                {stat.value}
              </h3>
              <span className="text-base font-medium text-muted-foreground">
                {stat.label}
              </span>
            </AnimationContainer>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatSection