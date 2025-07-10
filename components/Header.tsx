'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Loader from './Loader'
import { logout } from '@/lib/actions/auth.action'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import { LogOut, User } from 'lucide-react'



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
        toast.success("Log out successfull")
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
            <nav className="flex items-center justify-between rounded-lg ">
                {/* Logo Link */}
                <div onClick={() => handleNavigation("/")} className="flex items-center gap-2 cursor-pointer group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
                        <svg width={54} height={54} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                            <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                            <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                            <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={3} fill="none" />
                        </svg>
                    </div>
                    <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        Sidvia
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6 mt-2">
                    {NavLinks.map((item) => {
                        const href = `/${item.toLowerCase()}`
                        return (
                            <div
                                key={item}
                                onClick={() => handleNavigation(href)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${pathname === href
                                    ? " text-accent-foreground underline underline-offset-8"
                                    : "text-gray-400 hover:text-foreground hover:bg-accent/50"
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
                        variant="outline"
                        onClick={() => {
                            handleLogout()
                            setMobileMenuOpen(false)
                        }}
                        className="w-full justify-start text-red-400 border-red-400/20 hover:bg-red-400/10 text-sm"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign out
                    </Button>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(true)} className="text-white">
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="root-menu bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between ">
                        <div
                            onClick={() => {
                                handleNavigation("/")
                                setMobileMenuOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
                                <svg width={54} height={54} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                                    <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                                    <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                                    <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={3} fill="none" />
                                </svg>
                            </div>
                            <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                Sidvia
                            </span>
                        </div>
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
                                        <div
                                            key={item}
                                            onClick={() => {
                                                handleNavigation(href)
                                                setMobileMenuOpen(false)
                                            }}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === href
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                }`}
                                        >
                                            {item}
                                        </div>
                                    )
                                })}

                            </div>

                            <div className="border-t border-border space-y-2 py-6">
                                <Button variant="ghost" className="w-full justify-start btn-ghost text-sm">
                                    <User className="h-5 w-5" />
                                    Profile
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleLogout()
                                        setMobileMenuOpen(false)
                                    }}
                                    className="w-full justify-start text-red-400 border-red-400/20 hover:bg-red-400/10 text-sm"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Sign out
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

        </>
    )
}