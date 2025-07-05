'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Loader from './Loader'

export default function Header() {
    const [isNavigating, setIsNavigating] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Reset navigation state when path changes
        setIsNavigating(false)
    }, [pathname])

    const handleNavigation = (href: string) => {
        if (pathname === href) return

        setIsNavigating(true)
        router.push(href)
    }

    return (
        <>
            {/* Global Loading Overlay */}
            {isNavigating && (
                <div className="fixed inset-0 z-50 bg-[#0B0B0B] flex flex-col items-center justify-center gap-2">
                    <Loader/>
                </div>

            )}

            {/* Header Content */}
            <nav className="flex items-center justify-between rounded-lg">
                {/* Logo Link */}
                <div
                    onClick={() => handleNavigation('/')}
                    className="flex items-center cursor-pointer group"
                >
                    <div>
                        <svg width={54} height={54} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                            <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                            <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                            <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={3} fill="none" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Sidvia</h1>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    {['#','Interview', 'Pricing', 'Resources'].map((item) => {
                        const href = `/${item.toLowerCase()}`
                        return (
                            <div
                                key={item}
                                onClick={() => handleNavigation(href)}
                                className={`cursor-pointer transition-colors font-semibold ${pathname === href ? 'text-[#10A37F]' : 'text-gray-400 hover:text-[#10A37F]'
                                    }`}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>

                {/* User Button */}
                <Button variant="default" className="rounded-full">
                    Avatar
                </Button>
            </nav>
        </>
    )
}