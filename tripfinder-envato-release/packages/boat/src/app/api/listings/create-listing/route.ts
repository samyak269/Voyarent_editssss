import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {

    try {

        const userInfo = await getServerSession(authOptions)


        const body: {
            store: {
                boatName: string,
                boatType: string,
                pricePerDay: number,
                boatDescription: string,
                beadRooms: number,
                bathRooms: number,
                guests: number,
                location: string,
                phoneNumber: string,
                equipment: string[],
                images: string[],
                specification: {
                    engine: string,
                    engineTorque: string,
                    fuelSystem: string,
                    boreStroke: string,
                    infotainmentSystem: string,
                    displacement: string,
                    fuelCapacity: string,
                    compressionRatio: string,
                    luggageCapacity: string,
                    fuelEconomy: string,
                    weight: string
                }
            }
        } = await req.json()
        console.log(body);


        if (!userInfo?.user?.name) {
            return new NextResponse(JSON.stringify({
                success: false,
                error: 'User not logged in.'
            }))
        }

        const user = await prisma.vendor.findFirst({
            where: {
                name: userInfo.user.name
            }
        })

        if (!user) {
            return new NextResponse(JSON.stringify({
                success: false,
                error: 'User does not exist.'
            }))
        }

        const listing = await prisma.listing.create({
            data: {
                vendorId: user.id,
                name: body.store.boatName,
                type: body.store.boatType,
                price: body.store.pricePerDay,
                description: body.store.boatDescription,
                bedroomsCount: body.store.beadRooms,
                bathroomsCount: body.store.bathRooms,
                guestsCount: body.store.guests,
                cabinsCount: 0,
                location: body.store.location,
                phoneNumber: body.store.phoneNumber,
                ListingSpecification: {
                    create: body.store.specification
                }
            }
        })

        if (listing) {
            return new NextResponse(JSON.stringify({
                success: true,
                message: `Listing with id: ${listing.id} has been created.`
            }))
        } else {
            return new NextResponse(JSON.stringify({
                success: false,
                error: 'Sometihng went wrong.'
            }))
        }

    } catch (error) {
        return new NextResponse(JSON.stringify({
            success: false,
            error: error
        }))
    }
}