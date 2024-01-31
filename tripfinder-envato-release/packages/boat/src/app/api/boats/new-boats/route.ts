import { prisma } from '@/prisma/index'
import { NextResponse } from 'next/server';

export async function GET() {

  try {

    const newBoats = await prisma.boats.findMany({
      take: 6,
      orderBy: {
        created_at: 'desc'
      }
    })

    if (!newBoats) return new NextResponse(JSON.stringify({ error: 'No boats found.' }), { status: 400 })

    return new NextResponse(JSON.stringify({

      data: newBoats

    }))

  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ error: error }), { status: 400 })
  }

}
