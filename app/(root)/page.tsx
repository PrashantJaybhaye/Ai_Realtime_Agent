import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <>
            <section className='card-cta'>
                <div className='flex flex-col gap-6 max-w-lg text-balance'>
                    <h2 className='text-neutral-300'>Sharpen Your Interview Skills with Smart AI Guidance</h2>
                    <p className='text-lg max-sm:text-sm'>Get interview-ready with guided AI sessions and actionable feedback in real time.</p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image src={"/robot.png"} alt='Banner' width={350} height={350} className='max-sm:hidden'/>
            </section>
        </>
    )
}
export default Page
