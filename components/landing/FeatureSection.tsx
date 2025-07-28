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
import { motion, type Variants } from "framer-motion"
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'AI-Powered Interviews',
    description: 'Practice with our advanced AI interviewer that adapts to your responses and provides realistic interview scenarios.',
    color: 'bg-purple-500/15 text-purple-600'
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Detailed Analytics',
    description: 'Get comprehensive feedback on communication skills, technical knowledge, and areas for improvement.',
    color: 'bg-blue-500/15 text-blue-600'
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Role-Specific Practice',
    description: 'Customize interviews for specific roles, experience levels, and technology stacks.',
    color: 'bg-green-500/15 text-green-600'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: '24/7 Availability',
    description: 'Practice anytime, anywhere. Our AI interviewer is always ready when you are.',
    color: 'bg-amber-500/15 text-amber-600'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Secure & Private',
    description: 'Your interview data is encrypted and secure. Practice with confidence knowing your privacy is protected.',
    color: 'bg-red-500/15 text-red-600'
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: 'Voice Recognition',
    description: 'Natural voice conversations with advanced speech recognition and real-time feedback.',
    color: 'bg-indigo-500/15 text-indigo-600'
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const FeatureSection = () => {
  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-muted/10 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.08]"></div>
      </div>
      
      {/* Floating gradient elements */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground tracking-tight bg-clip-text"
          >
            Elevate Your Interview Game
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Sidvia combines cutting-edge AI with expert interview techniques to give you an unbeatable advantage.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <Card className={cn(
                "h-full p-6 bg-background border border-border/50 hover:border-primary/30 transition-all",
                "hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/10",
                "group overflow-hidden relative"
              )}>
                {/* Animated hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <CardContent className="p-0 space-y-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    feature.color,
                    "group-hover:scale-110 transition-transform duration-300"
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats or additional content could go here */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">Trusted by thousands of job seekers worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSection