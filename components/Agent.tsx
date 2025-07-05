// import Image from 'next/image'
import React from 'react'

const Agent = () => {
    return (
        <div className='call-view'>
            <div className='card-interviewer'>
                <div className='avatar'>
                    <svg
                        width={128}
                        height={128}
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
                </div>
                    <h3>Sidvia AI</h3>
            </div>
        </div>
    )
}

export default Agent