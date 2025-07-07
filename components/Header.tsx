'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Loader from './Loader'
import { logout } from '@/lib/actions/auth.action'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'



export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isNavigating, setIsNavigating] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const NavLinks = ['Interview', 'Pricing', 'About']

    useEffect(() => {
        // Reset navigation state when path changes
        setIsNavigating(false)
    }, [pathname])

    const handleNavigation = (href: string) => {
        if (pathname === href) return

        setIsNavigating(true)
        router.push(href)
    }

    const handleLogout = async () => {
        await logout()
        router.push('/sign-in')
    }

    return (
        <>
            {/* Global Loading Overlay */}
            {isNavigating && (
                <div className="fixed inset-0 z-50 bg-[#0B0B0B] flex flex-col items-center justify-center gap-2">
                    <Loader />
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
                <div className="hidden md:flex items-center gap-6 mt-2">
                    {NavLinks.map((item) => {
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
                <div className="hidden md:flex items-center gap-3 mt-3">
                    <Button
                        variant="destructive"
                        className="text-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden mt-3">
                    <button onClick={() => setMobileMenuOpen(true)} className="text-white">
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="root-menu">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Sidvia-ai</span>
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
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6 mt-3" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {NavLinks.map((item) => {
                                    const href = `/${item.toLowerCase()}`
                                    return (
                                        <a
                                            key={item}
                                            onClick={() => {
                                                handleNavigation(href)
                                                setMobileMenuOpen(false)
                                            }}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold text-gray-400 hover:hover:bg-[#303030]"
                                        >
                                            {item}
                                        </a>
                                    )
                                })}

                            </div>
                            <div className='py-6'>
                                <Button
                                    variant="destructive"
                                    className="rounded-lg px-8 py-4 text-base/7 font-semibold text-gray-200"
                                    onClick={() => {
                                        handleLogout()
                                        setMobileMenuOpen(false)
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

        </>
    )
}