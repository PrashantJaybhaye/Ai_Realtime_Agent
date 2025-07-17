import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();
    
    return (
        <div className='root-layout'>
            <Header user={user} />
            {children}
            <Footer />
        </div>
    )
}

export default RootLayout