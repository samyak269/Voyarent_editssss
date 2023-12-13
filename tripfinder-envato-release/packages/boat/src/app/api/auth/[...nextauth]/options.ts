import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'

const admins = ['tothesip@gmail.com', 'otasiddhant@gmail.com']

export const authOptions: AuthOptions = {
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
}