import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
    return (
        <nav className='flex flex-row justify-between items-center shadow-sm rounded-lg'>
            <Link href="/" className='flex items-center gap-3 group'>
                <div className='flex items-center justify-center rounded-lg transition-colors'>
                    <svg
                        width={64}
                        height={64}
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                        <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                        <path
                            cx={16}
                            cy={16}
                            r={4}
                            fill="#10A37F"
                            opacity={0.3}
                            d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z"
                        />
                        <path
                            d="M16 32q16 -12 32 0 -16 12 -32 0Z"
                            stroke="#10A37F"
                            strokeWidth={3}
                            fill="none"
                        />
                    </svg>
                </div>
                <h2 className='text-2xl font-semibold text-white'>Sidvia</h2>
            </Link>

            <div className='hidden md:flex items-center gap-8'>
                {['Features', 'Solutions', 'Pricing', 'Resources'].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className='text-gray-400 hover:text-blue-400 font-medium transition-colors'
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <div className='flex items-center'>
                <Button
                    variant="default"
                >
                    Sign In
                </Button>
            </div>
        </nav>
    )
}

export default Header