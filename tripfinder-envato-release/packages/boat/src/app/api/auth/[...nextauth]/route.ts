import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import AppleProvider from 'next-auth/providers/apple'

const admins = ['tothesip@gmail.com', 'otasiddhant@gmail.com']

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_NEXT_AUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_NEXT_AUTH_CLIENT_SECRET!,
      profile(profile) {
        let userRole = 'user'

        // mention admin's email
        if (admins.includes(profile?.email)) {
          userRole = 'admin'
        }

        return {
          ...profile,
          id: profile.sub,
          userRole
        }
      }
    }),
  ],
})

export { handler as GET, handler as POST }