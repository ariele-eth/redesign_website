import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'

export const runtime = 'edge'

type PartnerPlacement = 'home' | 'about' | 'collaborate'

function getPlacementFilter(placement: string | null) {
  switch (placement) {
    case 'home':
      return 'showOnHome != false'
    case 'about':
      return 'showOnAbout != false'
    case 'collaborate':
      return 'showOnCollaborate != false'
    default:
      return 'true'
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const placement = searchParams.get('placement')
  const placementFilter = getPlacementFilter(placement)

  const query = `*[_type == "partner" && isVisible != false && ${placementFilter}] | order(coalesce(sortOrder, 9999) asc, name asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    "url": coalesce(url, website)
  }`

  const partners = await client.fetch(query)

  return NextResponse.json(partners)
}