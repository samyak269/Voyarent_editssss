import { prisma } from '@/prisma/index'
import { NextResponse } from 'next/server';
import { listImagesInDirectory } from '@/s3';

export async function GET() {

  try {

    const newBoats = await prisma.boats.findMany({
      take: 6,
      orderBy: {
        created_at: 'desc'
      },
      where: {
        name: { gt: '' }
      }
    })

    if (!newBoats) return new NextResponse(JSON.stringify({ error: 'No boats found.' }), { status: 400 })

    const boats: any[] = []

    for (const boat of newBoats) {

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

      data: boats

    }))

  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ error: error }), { status: 400 })
  }

}
