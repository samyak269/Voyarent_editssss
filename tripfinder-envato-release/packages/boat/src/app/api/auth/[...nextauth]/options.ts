import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import { prisma } from '@/prisma'

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

                console.log(profile);
                

                return {
                    ...profile,
                    id: profile.sub,
                    userRole
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (!user.name) {
                console.log('no name found');

                return false
            }

            try {

                const vendor = await prisma.vendor.findFirst({
                    where: {
                        name: user.name
                    }
                })

                if (!vendor) {
                    await prisma.vendor.create({
                        data: {
                            name: user.name
                        }
                    })
                }

                return true

            } catch (error) {
                console.log(error);

                return false
            }

        }
    }
}