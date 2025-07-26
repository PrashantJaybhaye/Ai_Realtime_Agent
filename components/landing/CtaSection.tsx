'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const CtaSection = () => {
  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
        >
          Ready to Ace Your Next Interview?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Join thousands of successful candidates who’ve improved their interview skills with <span className="text-primary font-semibold">Sidvia</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button asChild size="lg" className="gap-2 text-base font-medium">
            <Link href="/sign-up">
              <Play className="w-5 h-5" />
              Start Your Free Trial
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="gap-2 text-base font-medium border-muted hover:border-primary"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Demo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
