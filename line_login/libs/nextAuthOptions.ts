import type { AuthOptions } from 'next-auth'
import LineProvider from 'next-auth/providers/line'

export const nextAuthOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session ({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },
}
