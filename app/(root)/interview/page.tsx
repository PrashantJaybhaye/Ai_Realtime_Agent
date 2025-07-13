
import GenerationAgent from '@/components/GenerationAgent';
import UserError from '@/components/UserError';
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {
    const user = await getCurrentUser();
    if (!user) return <UserError />;

    return (
        <>
            <h3>Interview Generation</h3>
            <GenerationAgent userName={user?.name} userId={user?.id} type="generate"/>
        </>
    )
}

export default page