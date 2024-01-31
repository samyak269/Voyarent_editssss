import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/index'
import { listImagesInDirectory } from '@/s3/index'

export async function GET(req: NextRequest) {

  try {
    const topBoats = await prisma.boats.findMany({
      take: 8,
      where: {
        oldId: {
          gt: 10226
        }
      }
    })

    const boats: any[] = []

    for (let boat of topBoats) {
      if (!boat.oldId) return

      const boatPrice = await prisma.boatsPrice.findFirst(({
        where: {
          boatsId: boat.id
        }
      }))

      const boatUser = await prisma.users.findFirst({
        where: { id: boat.usersId }
      })

      const boatLocation = await prisma.boatAddr.findFirst({
        where: { boatsId: boat.id }
      })

      console.log(boatLocation)

      boats.push({
        ...boat,
        location: boatLocation,
        user: boatUser?.id ? boatUser.id : '',
        price: boatPrice?.perDay ? boatPrice.perDay : 10,
        // @ts-ignore
        imagesUrls: (await listImagesInDirectory(boat.oldId.toString())).slice(0, 6)
      })

    }

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
