import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
import { s3Client, listObjectsInDirectory, listImagesInDirectory } from '@/s3/index'
import { BUCKET_NAME, BUCKET_REGION } from '@/config/s3'

export async function GET(req: NextRequest) {

    try {
        const topBoats = await prisma.boats.findMany({
            take: 6,
            where: {
                oldId: {
                    gt: 10226
                }
            }
        })

        const boats: any[] = []

        // for (let boat of topBoats) {
        //     if (!boat.oldId) return

        //     boats.push({
        //         ...boat,
        //         imagesUrls: [await listImagesInDirectory(boat.oldId.toString())]
        //     })

        // }

        // Promise.all(topBoats.map(async (boat) => {

        //     console.log(boats);

        // }))

        return new NextResponse(JSON.stringify({
            message: 'success',
            data: {
                boats
            }
        }))

    } catch (error) {
        console.log(error);

        const errorResp = new NextResponse(JSON.stringify({
            message: 'error',
            error: error
        }), {
            status: 400
        })
        return errorResp
    }
}