import Header from '@/components/Header'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) redirect('/sign-in')
    return (
        <div className='root-layout'>
            <Header />
            {children}
        </div>
    )
}

export default RootLayout