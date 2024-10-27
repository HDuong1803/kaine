declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LINE_CLIENT_ID: string
      LINE_CLIENT_SECRET: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
    }
  }
}

export {}
