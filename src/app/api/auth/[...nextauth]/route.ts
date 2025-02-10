import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
