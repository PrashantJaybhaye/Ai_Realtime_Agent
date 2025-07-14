import Header from '@/components/Header'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) redirect('/sign-in')
    
    const user = await getCurrentUser();
    
    return (
        <div className='root-layout'>
            <Header user={user} />
            {children}
        </div>
    )
}

export default RootLayout