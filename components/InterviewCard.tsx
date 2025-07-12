import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { getRandomInterviewCover } from "@/lib/utils"
import { Button } from "./ui/button"
import DisplayTechIcons from "./DisplayTechIcons"
import { Calendar, Star, Play, Clock, Target, Zap } from "lucide-react"
import { getFeedbackByInterviewId } from "@/lib/actions/general.action"

const InterviewCard = async ({ id, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
  const feedback = userId && id
    ? await getFeedbackByInterviewId({ interviewId: id, userId })
    : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY");

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "technical":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400"
      case "behavioral":
        return "bg-green-500/20 border-green-500/30 text-green-400"
      case "mixed":
        return "bg-purple-500/20 border-purple-500/30 text-purple-400"
      default:
        return "bg-blue-500/20 border-blue-500/30 text-blue-400"
    }
  }

  return (
    <div className="group/card relative w-[360px] max-sm:w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
      {/* Enhanced Badge */}
      <div
        className={`absolute top-4 right-4 px-3 py-1.5 rounded-full border text-xs font-medium z-20 backdrop-blur-sm ${getTypeColor(normalizedType)}`}
      >
        {normalizedType}
      </div>

      <div className="p-6 space-y-5">
        {/* Enhanced Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-border shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
              <Image
                src={getRandomInterviewCover() || "/placeholder.svg"}
                alt="Interview cover"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
              <Target className="h-3 w-3 text-primary" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-foreground capitalize line-clamp-2 mb-2">{role} Developer Interview</h3>
          </div>
        </div>

        {/* Enhanced Metadata */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-4 w-4" />
            <span className="font-medium">{feedback?.totalScore ?? "---"}/100</span>
          </div>
        </div>

        {/* Enhanced Feedback Summary */}
        <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm line-clamp-3 text-primary/90 leading-relaxed">
              {feedback?.finalAssessment ??
                "You haven't taken this interview yet. Take it now to improve your skills and get personalized AI feedback!"}
            </p>
          </div>
        </div>

        {/* Enhanced Tech + Button Section */}
        <div className="space-y-4">
          {/* Tech Stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Tech Stack</span>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            {/* Tech icons container - isolated from card hover */}
            <div className="relative">
              <DisplayTechIcons techStack={techstack} />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-border">
            <Button className="w-full btn-primary text-sm font-semibold group/button">
              <Link
                href={
                  feedback
                    ? `/interview/${id}/feedback`
                    : `/interview/${id}`
                }
                className="flex items-center justify-center gap-2 w-full"
              >
                <Play className="h-4 w-4" />
                {feedback ? "View Detailed Feedback" : "Begin Interview"}
                <div className="ml-auto opacity-0 group-hover/button:opacity-100 transition-opacity">
                  <Clock className="h-4 w-4" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hover effect overlay - only affects card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </div>
  )
}

export default InterviewCard
