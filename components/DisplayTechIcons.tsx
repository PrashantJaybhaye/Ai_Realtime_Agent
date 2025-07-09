import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techIcons = await getTechLogos(techStack)

    return (
        <div className='flex flex-row items-center'>
            {techIcons.slice(0, 3).map(({ tech, url }, index) => (
                <div
                    key={tech}
                    className={cn(
                        'relative group bg-gradient-to-br from-muted to-muted/50 rounded-full p-2.5 flex-center border border-border/30 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105',
                        index > 0 && '-ml-2'
                    )}
                >
                    <span className="tech-tooltip whitespace-nowrap z-50">{tech}</span>
                    <Image 
                        src={url || "/placeholder.svg"} 
                        alt={tech} 
                        width={20} 
                        height={20} 
                        className="size-5 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-200" 
                    />
                </div>
            ))}
            {techStack.length > 3 && (
                <div className="relative group bg-gradient-to-br from-primary/20 to-primary/10 rounded-full p-2.5 flex-center border border-primary/30 shadow-sm -ml-2">
                    <span className="tech-tooltip whitespace-nowrap z-50">
                        +{techStack.length - 3} more
                    </span>
                    <span className="text-xs font-semibold text-primary">
                        +{techStack.length - 3}
                    </span>
                </div>
            )}
        </div>
    )
}

export default DisplayTechIcons