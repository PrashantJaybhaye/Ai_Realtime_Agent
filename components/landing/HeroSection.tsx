'use client'

import React from 'react'
import BlurText from './TextAnimations/BlurText/BlurText'
import { Button } from '../ui/button'
import MetaBalls from './Animations/MetaBalls/MetaBalls'
import { Sparkles } from 'lucide-react'

const herosection = () => {

    return (

        <section className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className=''>
                    <div className='items-center flex flex-col justify-center'>
                        <div className="inline-flex items-center gap-2 bg-amber-500/30 px-4 py-2 rounded-full text-yellow-400/80 text-sm max-sm:text-xs font-medium mb-1.5">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Interview Coaching
                        </div>
                        <MetaBalls
                            color="#ffffff"
                            cursorBallSize={2}
                            ballCount={15}
                            animationSize={30}
                            enableMouseInteraction={false}
                            enableTransparency={true}
                            hoverSmoothness={0.05}
                            clumpFactor={1}
                            speed={0.3}
                        />
                        <BlurText
                            text="Master Your Next"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-4xl md:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight text-balance"
                        />
                        <BlurText
                            text="Job Interview"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="mb-6 text-4xl md:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight"
                        />
                        <p className='text-lg max-sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6 text-center'>
                            Practice with our AI interviewer, get instant feedback, and boost your confidence. <br /> Join thousands who&apos;ve landed their dream jobs with Sidvia.
                        </p>
                        <div className='flex flex-row gap-5'>

                            <Button variant={"secondary"}>Sign up</Button>
                            <Button variant={"outline"}>Watch Demo</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default herosection