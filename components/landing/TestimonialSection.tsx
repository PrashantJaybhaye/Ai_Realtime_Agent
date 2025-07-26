'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    content: "Sidvia's AI feedback pinpointed weaknesses I didn't know I had. Landed my Google offer with their targeted practice system.",
    avatar: "/user-avatar.png",
    rating: 5,
    highlight: true
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager at Microsoft",
    content: "From nervous to confident in 3 weeks. The behavioral interview simulations prepared me perfectly for the real pressure.",
    avatar: "/user-avatar.png",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Netflix",
    content: "The technical drills matched Netflix's interview style exactly. I aced questions that stumped other candidates.",
    avatar: "/user-avatar.png",
    rating: 5,
    highlight: true
  },
  {
    name: "David Kim",
    role: "Frontend Lead at Airbnb",
    content: "Went from 0 to 4 offers. Sidvia's analytics showed me exactly where to improve each week.",
    avatar: "/user-avatar.png",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "ML Engineer at Tesla",
    content: "The AI interviewer caught nuances in my responses that human mock partners always missed.",
    avatar: "/user-avatar.png",
    rating: 5
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="relative py-18 px-4 sm:px-6 bg-gradient-to-b from-background to-muted/10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]"></div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who&apos;ve accelerated their career with Sidvia
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
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
                "hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/5",
                "group relative overflow-hidden"
              )}>
                {/* Decorative quote mark */}
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-muted/10 group-hover:text-primary/10 transition-colors" />
                
                <CardContent className="p-0 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed relative">
                    {testimonial.content}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative ">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-border/50 group-hover:border-primary/50 transition-colors"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats or CTA could go here */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> average rating from 1,000+ reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialSection