'use client'

import React from 'react'
import {
  BarChart3,
  Clock,
  Headphones,
  MessageSquare,
  Shield,
  Target,
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { motion, type Variants, type TargetAndTransition } from "framer-motion";
import ScrollFloat from './TextAnimations/ScrollFloat/ScrollFloat';

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'AI-Powered Interviews',
    description:
      'Practice with our advanced AI interviewer that adapts to your responses and provides realistic interview scenarios.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Detailed Analytics',
    description:
      'Get comprehensive feedback on communication skills, technical knowledge, and areas for improvement.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Role-Specific Practice',
    description:
      'Customize interviews for specific roles, experience levels, and technology stacks.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Availability',
    description:
      'Practice anytime, anywhere. Our AI interviewer is always ready when you are.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Private',
    description:
      'Your interview data is encrypted and secure. Practice with confidence knowing your privacy is protected.',
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: 'Voice Recognition',
    description:
      'Natural voice conversations with advanced speech recognition and real-time feedback.',
  },
]

// Correctly typed dynamic variants using TargetResolver
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (custom: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier
    },
  }),
};

const FeatureSection = () => {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
            textClassName="text-4xl md:text-6xl font-bold text-foreground tracking-tight"
          >
            Why Choose Sidvia?
          </ScrollFloat>
          <p className="text-lg max-sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6 text-center">
            Our AI-powered platform provides everything <br /> you need to excel in your next interview.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="group p-6 bg-muted/30 backdrop-blur-lg border border-border hover:shadow-xl transition-all hover:scale-[1.015]">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary transition-transform group-hover:rotate-6 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default FeatureSection
