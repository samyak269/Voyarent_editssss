import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { BUCKET_NAME, BUCKET_REGION } from "@/config/s3";

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
        // https://boatrentaldev.s3.ap-south-1.amazonaws.com/uploads/listings/ed932698-7945-42b5-bb22-03ab818f7475
        // images: [
        //     '7336fb30-fc9a-4b7e-830d-710668f5ab2f',
        //     '28416453-513b-48b9-9de0-2e779ef852de',
        //     '62031a24-6546-4b52-bdf2-b151e71221f8',
        //     '905c1a44-dc01-4ff4-9743-b8dbb6b4b648',
        //     '21a6966a-6a1f-414c-9cc7-0d0f9142b9a5',
        //     '38c04568-3054-4eb3-af38-725bee833d42'
        // ],

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
                gallery: body.store.images.map((image) => `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/uploads/listings/${image}`),
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