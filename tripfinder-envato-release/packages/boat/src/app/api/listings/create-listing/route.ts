import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { BUCKET_NAME, BUCKET_REGION } from "@/config/s3";
import { boat_booking_type, boat_calendar_type, boat_cancel_policy, boat_copied, boat_fuel_policy, boat_popular, boat_recommended, boat_started, boat_status } from "@prisma/client";
import DateTime from "@/components/ui/form-fields/date-time-picker";

export async function POST(req: NextRequest) {

    try {

        const userInfo = await getServerSession(authOptions)

        const body: {
            store: {
                boatName: string,
                subName: string,
                summary: string,
                refitYear: number,
                extraActivities: string,
                kitchens: number,
                wc: number,
                waterCapacity: number,
                waterCapacityUnit: string,
                modelNewText: string,
                fuelCapacity: string,
                fuelCapacityUnit: string,
                passangersCapacity: number,
                boatYear: number,
                sleeps: number,
                rooms: number,
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
                bookingAdvisor: { firstName: string },
                engineName: string,
                hullMaterialName: string,
                draft: number,
                draftUnit: string,
                fuelPolicy: boat_fuel_policy,
                fuelConsumption: string,
                fuelConsumptionUnit: string,
                engineYear: string,
                nofEngine: string,
                topSpeed: string,
                bookingManagerCheckinDay: string,
                bookingManagerCheckinDays: string,
                bookingManagerExtras: string,
                bookingManagerYatchtId: string,
                video: string,
                calendarType: boat_calendar_type,
                bookingType: boat_booking_type,
                cancelPolicy: boat_cancel_policy,
                popular: boat_popular,
                started: boat_started,
                recommended: boat_recommended,
                status: boat_status,
                copied: boat_copied,
                tripStartTime: string,
                tripFinishTime: string,
                bookingMessage: string
                // _________________________________________________________________
                boatModel: string,
                fuelName: string,
                specification: {
                    horsePower: string,
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
                    boatMake: string,
                    length: number,
                    lengthUnit: string,
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

        const booking_advisor = await prisma.bookingadvisors.findFirst({ where: { firstname: body.store.bookingAdvisor.firstName } })
        if (!booking_advisor) return new NextResponse(JSON.stringify({ error: 'booking advisor not valid' }))


        const boat_type = await prisma.boatType.findFirst({ where: { name: body.store.boatType } })
        if (!boat_type) return new NextResponse(JSON.stringify({ error: 'boat type not valid' }))

        const boatCategory = await prisma.boatCategory.findFirst({ where: { name: body.store.specification.boatCategory } })
        if (!boatCategory) return new NextResponse(JSON.stringify({ error: 'boat category not found' }))

        const boatMake = await prisma.boatMake.findFirst({ where: { name: body.store.specification.boatMake } })
        if (!boatMake) return new NextResponse(JSON.stringify({ error: 'boat make not found' }))

        const boatModel = await prisma.boatModel.findFirst({ where: { name: body.store.boatModel } })
        if (!boatModel) return new NextResponse(JSON.stringify({ error: 'boat model not found' }))

        const fuel = await prisma.fuel.findFirst({ where: { name: body.store.fuelName } })
        if (!fuel) return new NextResponse(JSON.stringify({ error: 'fuel not found' }))

        const engine = await prisma.engine_type.findFirst({ where: { name: body.store.engineName } })
        if (!engine) return new NextResponse(JSON.stringify({ error: 'engine type not found' }))

        const hullMaterial = await prisma.hull_material.findFirst({ where: { name: body.store.hullMaterialName } })
        if (!hullMaterial) return new NextResponse(JSON.stringify({ error: 'hull material not found' }))

        const listing = await prisma.boats.create({
            data: {
                usersId: user.id,
                name: body.store.boatName,
                sub_name: body.store.subName,
                summary: body.store.summary,
                trip_start_time: body.store.tripStartTime,
                trip_finish_time: body.store.tripFinishTime,
                booking_message: body.store.bookingMessage,
                refit_year: body.store.refitYear,
                extra_activities: body.store.extraActivities,
                kitchens: body.store.kitchens,
                wc: body.store.wc,
                bookingadvisorsId: booking_advisor.id,
                water_capacity: body.store.waterCapacity,
                water_capacity_unit: body.store.waterCapacityUnit,
                model_newtext: body.store.modelNewText,
                fuelId: fuel.id,
                fuelCapacity: body.store.fuelCapacity,
                fuel_capacity_unit: body.store.fuelCapacityUnit,
                passengers_capacity: body.store.passangersCapacity,
                boat_year: body.store.boatYear,
                sleeps: body.store.sleeps,
                rooms: body.store.rooms,
                horsepower: body.store.specification.horsePower,
                length: body.store.specification.length,
                length_unit: body.store.specification.lengthUnit,
                draft: body.store.draft,
                draft_unit: body.store.draftUnit,
                fuel_policy: body.store.fuelPolicy,
                fuel_consumption: body.store.fuelConsumption,
                fuel_consumption_unit: body.store.fuelConsumptionUnit,
                engine_typeId: engine.id,
                engine_year: body.store.engineYear,
                nof_engine: body.store.nofEngine,
                top_speed: body.store.topSpeed,
                hull_materialId: hullMaterial.id,
                boatTypeId: boat_type.id,
                booking_manager_checkin_day: body.store.bookingManagerCheckinDay,
                booking_manager_checkin_days: body.store.bookingManagerCheckinDays,
                booking_manager_extras: body.store.bookingManagerExtras,
                booking_manager_yachtid: body.store.bookingManagerYatchtId,
                video: body.store.video,
                calendar_type: body.store.calendarType,
                booking_type: body.store.bookingType,
                cancel_policy: body.store.cancelPolicy,
                popular: body.store.popular,
                started: body.store.started,
                recommended: body.store.recommended,
                views_count: 0,
                status: body.store.status,
                copied: body.store.copied,
                boatCategoryId: boatCategory.id,
                boatMakeId: boatMake.id,
                boatModelId: boatModel.id,
                bathrooms: body.store.bathRooms,
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