'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Loader from './Loader'
import { logout } from '@/lib/actions/auth.action'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import { LogOut, Settings, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    user: User | null
}


export default function Header({ user }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isNavigating, setIsNavigating] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const NavLinks = [
        { label: 'Home', path: '/' },
        { label: 'Feedback', path: '/feedback' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ]

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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-foreground">
                        <svg width={54} height={54} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#00E676" />
                            <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#00E676" opacity={0.5} />
                            <path cx={16} cy={16} r={4} fill="#00E676" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                            <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#00E676" strokeWidth={3} fill="none" />
                        </svg>
                    </div>
                    <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        Sidvia
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6 mt-2">
                    {NavLinks.map((item, index) => {
                        // const href = `/${item.toLowerCase()}`
                        const isActive = pathname === item.path

                        return (
                            <div
                                key={index}
                                onClick={() => handleNavigation(item.path!)}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer',
                                    isActive
                                        ? 'text-primary border-primary'
                                        : 'text-muted-foreground border-transparent hover:text-primary'
                                )}
                            >
                                {item.label}
                            </div>
                        )
                    })}
                </div>

                {/* Desktop Profile Section */}
                {user && (
                    <div className="hidden md:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer group transition hover:opacity-90">
                                    {/* Avatar (smaller, clean) */}
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center uppercase text-xs">
                                        {user.name?.charAt(0) || "U"}
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-64 p-3 rounded-xl shadow-md border border-border bg-background z-50"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center uppercase text-sm">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-sm font-semibold">{user.name}</h4>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        <span className="text-[11px] font-medium text-muted-foreground mt-1">
                                            {user?.isAdmin ? "Admin" : "Member"}
                                        </span>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link href="#" className="w-full">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Settings className="w-4 h-4" />
                                            Settings
                                        </div>
                                    </Link>
                                </DropdownMenuItem>

                                {user.isAdmin && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin/dashboard" className="w-full">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Shield className="w-4 h-4" />
                                                Admin
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(true)} className="text-white">
                        <Bars3Icon className="size-6 mt-1" />
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
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-foreground">
                                <svg width={54} height={54} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#00E676" />
                                    <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#00E676" opacity={0.5} />
                                    <path cx={16} cy={16} r={4} fill="#00E676" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                                    <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#00E676" strokeWidth={3} fill="none" />
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
                            <XMarkIcon aria-hidden="true" className="size-6 mt-1" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {NavLinks.map((item, index) => {
                                    // const href = `/${item.toLowerCase()}`
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                handleNavigation(item.path!)
                                                setMobileMenuOpen(false)
                                            }}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${pathname === item.path
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                }`}
                                        >
                                            {item.label}
                                        </div>
                                    )
                                })}

                            </div>

                            <div className="border-t border-border space-y-2 py-6">
                                {/* Mobile User Profile */}
                                <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-card/40 border border-border/30 shadow-sm mb-4">
                                    {/* Avatar Circle */}
                                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/20 text-primary text-sm font-semibold uppercase">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>

                                    {/* User Info */}
                                    <div className="flex flex-col w-full">
                                        <span className="text-sm font-medium text-foreground truncate">
                                            {user?.name || 'User'}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate">
                                            {user?.email || 'No email'}
                                        </span>
                                        <div className='flex flex-row justify-between'>
                                            {user?.isAdmin && (
                                                <span className="text-xs font-medium text-amber-500 mt-1">Admin</span>
                                            ) || <span className="text-xs font-medium text-green-500/80 mt-1">Member</span>}

                                            {user?.isAdmin && (
                                                <>
                                                    <Button size="sm" variant="secondary" className='text-xs/tight -mt-3' >
                                                        <Link href={"/admin/dashboard"} >Dashboard</Link>
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Button variant="ghost" className="w-full justify-start btn-ghost text-sm">
                                    <Settings className="h-5 w-5" />
                                    Settings
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