'use client'

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MettingSetup from '@/components/MettingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const { call, isCallLoading } = useGetCallById(params.id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MettingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom setIsSetupComplete={setIsSetupComplete} />
            )}
          </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default Meeting