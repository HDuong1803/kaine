import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libs/nextAuthOptions'

import type { FC, ReactNode } from 'react'

const HomeLayout: FC<{
  authenticated: ReactNode
  unauthenticated: ReactNode
}> = async ({ authenticated, unauthenticated }) => {
  const session = await getServerSession(nextAuthOptions)
  return (
    <html lang='ja'>
      <body>
        <>{session ? authenticated : unauthenticated}</>
      </body>
    </html>
  )
}

export default HomeLayout
