'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Play } from 'lucide-react'

const CtaSection = () => {
  return (
    <div className='root-layout'>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl" />
        <div className="relative p-12 text-center space-y-6 rounded-3xl border border-border/50">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Ace Your Next Interview?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of successful candidates who&apos;ve improved their interview skills with Sidvia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section >
    </div >
  )
}

export default CtaSection
