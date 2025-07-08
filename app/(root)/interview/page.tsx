
import Agent from '@/components/Agent'
import UserError from '@/components/UserError';
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {
    const user = await getCurrentUser();
    if (!user) return <UserError />;

    return (
        <>
            <h3>Interview Generation</h3>
            <Agent userName={user?.name} userId={user?.id} type="generate" />
        </>
    )
}

export default page