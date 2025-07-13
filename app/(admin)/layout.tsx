import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {

    return (
        <div className='root-layout'>
            <Header />
            {children}
        </div>
    )
}

export default AuthLayout