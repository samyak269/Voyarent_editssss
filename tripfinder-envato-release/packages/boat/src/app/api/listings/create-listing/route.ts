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
                // _________________________________________________________________
                boatModel: string,
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
                    weight: string,
                    // ________________________________________________
                    boatCategory: string,
                    boatMake: string
                }
            }
        } = await req.json()

        if (!userInfo?.user?.email) {
            return new NextResponse(JSON.stringify({
                success: false,
                error: 'User not logged in.'
            }))
        }

        const user = await prisma.users.findFirst({
            where: {
                email: userInfo.user.email
            }
        })

        if (!user) {
            return new NextResponse(JSON.stringify({
                success: false,
                error: 'User does not exist.'
            }))
        }

        const boat_type = await prisma.boatType.findFirst({ where: { name: body.store.boatType } })
        if (!boat_type) return new NextResponse(JSON.stringify({ error: 'boat type not valid' }))

        const boatCategory = await prisma.boatCategory.findFirst({ where: { name: body.store.specification.boatCategory } })
        if (!boatCategory) return new NextResponse(JSON.stringify({ error: 'boat category not found' }))

        const boatMake = await prisma.boatMake.findFirst({ where: { name: body.store.specification.boatMake } })
        if (!boatMake) return new NextResponse(JSON.stringify({ error: 'boat make not found' }))

        const boatModel = await prisma.boatModel.findFirst({ where: { name: body.store.boatModel } })
        if (!boatModel) return new NextResponse(JSON.stringify({ error: 'boat model not found' }))

        const listing = await prisma.boats.create({
            data: {
                usersId: user.id,
                name: body.store.boatName,
                boatTypeId: boat_type.id,
                booking_manager_checkin_day: '',
                booking_manager_checkin_days: '',
                booking_manager_extras: '',
                booking_manager_yachtid: '',
                video: '',
                views_count: 0,
                boatCategoryId: boatCategory.id,
                boatMakeId: boatMake.id,
                boatModelId: boatModel.id,
                
                // price: body.store.pricePerDay,
                // description: body.store.boatDescription,
                // bathrooms: body.store.beadRooms,
                bathrooms: body.store.bathRooms,
                // guestsCount: body.store.guests,
                // cabin: 0,
                // location: body.store.location,
                // phoneNumber: body.store.phoneNumber,
                // gallery: body.store.images.map((image) => `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/uploads/listings/${image}`),
                // ListingSpecification: {
                //     create: body.store.specification
                // }
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