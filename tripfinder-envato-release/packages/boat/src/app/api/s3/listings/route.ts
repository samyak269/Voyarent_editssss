import { NextRequest, NextResponse } from "next/server";
import { getObjectURL, putObjectURL } from '@/s3/index';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {

    try {
        const isAuthenticated = await getServerSession(authOptions)
        if (!isAuthenticated?.user) {
            return NextResponse.json({
                success: false,
                error: 'User not logged in'
            })
        }

        const body = await req.json()
        console.log(body);

        const fileNames: string[] = body.fileNames
        const fileNameURLS: {
            key: string,
            url: string
        }[] = []

        for (let fileName of fileNames) {
            const url = await putObjectURL(fileName, 'image/jpeg')
            fileNameURLS.push({
                key: fileName,
                url: url
            })
        }

        return NextResponse.json({
            success: true,
            url: fileNameURLS
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error
        })
    }
}