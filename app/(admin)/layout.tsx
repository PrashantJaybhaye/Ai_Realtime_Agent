import Header from '@/components/Header'
import { isAdminAuthenticated, getCurrentUser } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const isAdmin = await isAdminAuthenticated();

    if (!isAdmin) redirect('/sign-in')
    
    const user = await getCurrentUser();

    return (
        <div className='root-layout'>
            <Header user={user} />
            {children}
        </div>
    )
}

export default AuthLayout