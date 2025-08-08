"use client"

import { cn } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react"
import { createFeedback } from "@/lib/actions/general.action"
import { interviewer } from "@/constants"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string
  userId: string
  interviewId?: string
  type?: string
  questions?: string[]
}

interface SavedMessage {
  role: "user" | "system" | "assistant"
  content: string
}

export default function Agent({ userName, userId, interviewId, type, questions = [] }: AgentProps) {
  const router = useRouter()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])

  // Event binding (GenerationAgent style)
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [...prev, newMessage])
      }
    }

    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)
    const onError = (error: Error) => console.error("Error:", error)

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)
    vapi.on("error", onError)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
      vapi.off("error", onError)
    }
  }, [])

  // Feedback after interview
  const handleGenerateFeedback = async (msgs: SavedMessage[]) => {
    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: msgs,
    })

    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`)
    } else {
      console.log("Error saving feedback")
      router.push("/")
    }
  }

  // Navigation after call finishes
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/")
      } else {
        handleGenerateFeedback(messages)
      }
    }
  }, [callStatus, messages, type])

  // Start / End call handlers
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)
    try {
      if (type === "generate") {
        await vapi.start(undefined, undefined, undefined, process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            username: userName,
            userid: userId,
          },
        })
      } else {
        const formattedQuestions = questions.length ? questions.map((q) => `- ${q}`).join("\n") : ""
        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        })
      }
    } catch (error) {
      console.error("Failed to start call:", error)
      setCallStatus(CallStatus.INACTIVE)
    }
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  const latestMessage = messages[messages.length - 1]?.content
  const isCallIdle = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED

  return (
    <section className="w-full space-y-8">
      {/* Call Interface */}
      <div className="call-view">
        {/* AI Interviewer */}
        <div className="card-interviewer">
          <div className="avatar">
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <svg width={85} height={85} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="m32 10 8 14 -8 14 -8 -14Z" fill="white" />
                <path d="m32 54 -8 -14 8 -14 8 14Z" fill="white" opacity={0.7} />
                <path
                  cx={16}
                  cy={16}
                  r={4}
                  fill="white"
                  opacity={0.5}
                  d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z"
                />
                <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="white" strokeWidth={2} fill="none" />
              </svg>
            </div>
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Sidvia AI</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              {isSpeaking ? (
                <>
                  <Mic className="w-4 h-4 text-primary" />
                  <span>Speaking...</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Listening</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="card-border">
          <div className="card-content">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-100/20 rounded-full blur-xl opacity-50" />
              <Image
                src="/user-avatar.png"
                alt="User profile"
                width={140}
                height={140}
                className="relative rounded-full object-cover size-[140px] border-4 border-border/50 shadow-2xl"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">{userName}</h3>
              <div className="text-sm text-muted-foreground">
                {callStatus === CallStatus.ACTIVE ? "In Interview" : "Ready to Start"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transcript */}
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn("transition-all duration-500 opacity-0", "animate-fadeIn opacity-100")}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div className="flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className={cn("btn-call relative overflow-hidden", callStatus === CallStatus.CONNECTING && "animate-pulse")}
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.CONNECTING && (
              <span className="absolute animate-ping rounded-full opacity-75 size-full bg-emerald-400/30" />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {isCallIdle ? "Start Interview" : "Connecting..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect flex flex-row" onClick={handleDisconnect}>
            <PhoneOff className="w-5 h-5 mr-2" />
            End Interview
          </button>
        )}
      </div>

      {/* Status Indicator */}
      <div className="text-center -mt-5">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium",
            callStatus === CallStatus.ACTIVE && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
            callStatus === CallStatus.CONNECTING && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            callStatus === CallStatus.INACTIVE && "bg-muted/50 text-muted-foreground border border-border/30",
          )}
        >
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              callStatus === CallStatus.ACTIVE && "bg-emerald-400 animate-pulse",
              callStatus === CallStatus.CONNECTING && "bg-yellow-400 animate-pulse",
              callStatus === CallStatus.INACTIVE && "bg-foreground",
            )}
          />
          {callStatus === CallStatus.ACTIVE && "Interview in Progress"}
          {callStatus === CallStatus.CONNECTING && "Connecting to AI..."}
          {callStatus === CallStatus.INACTIVE && "Ready to Start"}
        </div>
      </div>
    </section>
  )
}
