'use client'

import React from 'react'
import BlurText from './TextAnimations/BlurText/BlurText'
import { Button } from '../ui/button'
import MetaBalls from './Animations/MetaBalls/MetaBalls'
import { Play, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Marquee } from '../magicui/marquee'
import Link from 'next/link'

const companyIcons = [
    {
        alt: "Google",
        src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
        alt: "GitHub",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
        alt: "Amazon",
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
        alt: "Netflix",
        src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
        alt: "Apple",
        src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
];

const herosection = () => {

    return (

        <section className="pt-32 px-6">
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

                            <Button asChild variant={"secondary"}>
                                <Link href={'/sign-up'}>
                                    <Play />Get Started</Link>
                            </Button>
                            <Button variant={"outline"}>Watch Demo</Button>
                        </div>
                    </div>
                </div>

            </div>
            {/* Companies icons marquee */}
            <div className="mt-10 py-20 sm:py-32">
                <h2 className="text-center text-2xl font-semibold text-white/80 mb-10">
                    Trusted by the world’s most innovative teams
                </h2>
                <Marquee pauseOnHover className="[--duration:18s]">
                    <div className="flex gap-6 md:gap-10 items-center">
                        {companyIcons.map((icon) => (
                            <div
                                key={icon.alt}
                                className="flex items-center justify-center h-10 w-24 md:h-12 md:w-40"
                            >
                                <Image
                                    alt={icon.alt}
                                    src={icon.src}
                                    width={120}
                                    height={48}
                                    className="object-contain h-10 w-auto md:h-12 opacity-80 filter brightness-0 invert"
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    )
}

export default herosection