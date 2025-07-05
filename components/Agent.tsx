import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const Agent = ({ userName }: AgentProps) => {
    const callStatus = CallStatus.FINISHED;
    const isSpeaking = true;
    const messages = [
        'What’s your name?',
        'My name is Prashant Jaybhaye, nice to meet you!'
    ];

    const lastMessage = messages[messages.length - 1];

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
                            <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                            <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={3} fill="none" />
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
                            key={lastMessage}
                            className={cn(
                                'transition-opacity duration-500 opacity-0',
                                'animate-fadeIn opacity-100'
                            )}
                        >
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            {/* Call Action Button */}
            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call">
                        <span
                            className={cn(
                                'absolute animate-ping rounded-full opacity-75 size-full',
                                callStatus !== CallStatus.CONNECTING && 'hidden'
                            )}
                        />
                        <span className="relative z-10">
                            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                                ? 'Start Call'
                                : 'Connecting...'}
                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect">End Call</button>
                )}
            </div>
        </section>
    );
};

export default Agent;