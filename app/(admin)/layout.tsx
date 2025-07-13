import Header from '@/components/Header'
import { isAdminAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const isAdmin = await isAdminAuthenticated();

    if (!isAdmin) redirect('/sign-in')

    return (
        <div className='root-layout'>
            <Header />
            {children}
        </div>
    )
}

export default AuthLayout