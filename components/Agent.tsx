'use client';

import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
  userId: string;
  type?: string; // "generate" or others
  questions?: string[];
  interviewer?: string;
}

interface SavedMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export default function Agent({ userName, userId, type, questions = [], interviewer }: AgentProps) {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  // ✅ Setup Vapi listeners
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.error('Error:', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, []);

  // ✅ End call: navigate home
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push('/');
    }
  }, [callStatus, router]);

  // ✅ Start Vapi call
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      if (type === 'generate') {
        await vapi.start(
          undefined, // Agent
          undefined, // Config
          undefined, // Stream
          process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, // Workflow ID
          {
            variableValues: {
              username: userName,
              userid: userId,
            },
          }
        );
      } else {
        const formattedQuestions = questions.length
          ? questions.map((q) => `- ${q}`).join('\n')
          : '';

        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
      }
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallIdle = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <section className="w-full space-y-6">
      {/* Top Call Section */}
      <div className="call-view">
        {/* Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <svg width={128} height={128} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
              <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
              <path
                cx={16}
                cy={16}
                r={4}
                fill="#10A37F"
                opacity={0.3}
                d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z"
              />
              <path
                d="M16 32q16 -12 32 0 -16 12 -32 0Z"
                stroke="#10A37F"
                strokeWidth={3}
                fill="none"
              />
            </svg>
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <h3 className="text-neutral-400 mt-5">Sidvia AI</h3>
        </div>

        {/* User Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User profile"
              width={120}
              height={120}
              className="rounded-full object-cover size-[120px]"
            />
            <h3 className="text-neutral-400 mt-5">{userName}</h3>
          </div>
        </div>
      </div>

      {/* Transcript Message */}
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Action Button */}
      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call" onClick={handleCall}>
            <span
              className={cn(
                'absolute animate-ping rounded-full opacity-75 size-full',
                callStatus !== CallStatus.CONNECTING && 'hidden'
              )}
            />
            <span className="relative z-10">
              {isCallIdle ? 'Call' : 'Connecting...'}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End Call
          </button>
        )}
      </div>
    </section>
  );
}
