import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {

    try {

        const body: {
            boatName: string,
            boatType: string,
            pricePerDay: number,
            boatDescription: string,
            beadRooms: number,
            bathRooms: number,
            guests: number,
            cabins: number
        } = await req.json()

        const listing = prisma.listing.create({
            data: {
                vendorId: 'auto-generated-uuid-vendor',
                name: body.boatName,
                type: body.boatType,
                price: body.pricePerDay,
                description: body.boatDescription,
                bedroomsCount: body.beadRooms,
                bathroomsCount: body.bathRooms,
                guestsCount: body.guests,
                cabinsCount: body.cabins
            }
        })

    } catch (error) {
        return new NextResponse(JSON.stringify({
            success: false,
            error: error
        }))
    }
}