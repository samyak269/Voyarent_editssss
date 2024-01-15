// import { NextRequest, NextResponse } from "next/server"
// import { prisma } from "@/prisma";

// export async function GET(req: NextRequest) {

//     try {

//         const destinations = await prisma.destinations.findMany({
//             take: 5
//         })

//         if (!destinations) {
//             return new NextResponse(JSON.stringify({
//                 success: false,
//                 message: 'could not find destinations from the database'
//             }))
//         }

//         return new NextResponse(JSON.stringify({
//             success: true,
//             destinations: destinations
//         }))

//     } catch (error) {
//         return new NextResponse(JSON.stringify({
//             success: false,
//             error: error
//         }))
//     }

// }