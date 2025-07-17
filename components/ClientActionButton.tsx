'use client'

import { useRouter } from 'next/navigation'
import { useActionButton } from '@/contexts/ActionButtonContext'
import { Button } from './ui/button'
import { Clock, Play } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
    id: string
    feedbackExists: boolean
}

const ClientActionButton = ({ id, feedbackExists }: Props) => {
    const router = useRouter()
    const { isLoadingId, setLoadingId } = useActionButton()

    const handleClick = () => {
        setLoadingId(id)

        try {
            router.push(feedbackExists ? `/interview/${id}/feedback` : `/interview/${id}`)
        } catch (error) {
            toast.error("Navigation failed. Please try again.") // 👈 toast on error
            console.error('Navigation failed:', error)
        }
    }

    const isThisLoading = isLoadingId === id
    const isOtherLoading = isLoadingId !== null && isLoadingId !== id

    return (
        <div className="pt-2 border-t border-border">
            <Button
                onClick={handleClick}
                disabled={isOtherLoading || isThisLoading}
                className="w-full btn-primary text-sm font-semibold group/button"
            >
                {isThisLoading ? (
                    <div className="flex items-center justify-center gap-2 w-full animate-pulse">
                        <Clock className="h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 w-full">
                        <Play className="h-4 w-4" />
                        {feedbackExists ? "View Detailed Feedback" : "Begin Interview"}
                        <div className="ml-auto opacity-0 group-hover/button:opacity-100 transition-opacity">
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>
                )}
            </Button>
        </div>
    )
}

export default ClientActionButton
