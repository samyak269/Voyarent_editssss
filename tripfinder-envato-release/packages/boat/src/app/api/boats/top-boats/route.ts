import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
import { s3Client, listObjectsInDirectory } from '@/s3/index'
import { BUCKET_NAME, BUCKET_REGION } from '@/config/s3'

export async function GET(req: NextRequest) {

    try {
        const topBoats = await prisma.boats.findMany({
            take: 6,
        })

        let boatImages: string[] = []

        for (let boat of topBoats) {
            try {
                const boatImageInfo = await listObjectsInDirectory(BUCKET_NAME, `${boat.oldId.toString()}/`)
                console.log(boatImageInfo);
                
            } catch (error) {
                console.log(error);

            }

        }

        return new NextResponse(JSON.stringify({
            message: 'success',
            data: {
                images: [''],
                topBoats
            }
        }))

    } catch (error) {
        const errorResp = new NextResponse(JSON.stringify({
            message: 'error',
            error: error
        }), {
            status: 400
        })
        return errorResp
    }
}