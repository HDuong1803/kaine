import NextAuth from 'next-auth'
import { nextAuthOptions } from '@/libs/nextAuthOptions'

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
