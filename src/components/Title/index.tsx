'use client'

import { useSession } from 'next-auth/react'

interface TitleProps {
  text: string
  isTextStatic: boolean
}

export default function Title({
  text,
  isTextStatic
}: TitleProps): React.ReactNode {
  const { data: session, status } = useSession()

  return (
    <span className="flex justify-center items-center flex-wrap overflow-hidden m-0">
      <div
        className="whitespace-nowrap overflow-hidden animate-typing"
        style={{
          color:
            status === 'authenticated' && !isTextStatic ? '#008aae' : '#79ad34'
        }}
      >
        {status === 'authenticated' && !isTextStatic
          ? `${session?.user?.firstName}!`
          : text}
      </div>
    </span>
  )
}
