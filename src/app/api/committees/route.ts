import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'

export const runtime = 'edge'

const committeesQuery = `*[_type == "committee" && groupType != "board"] | order(name asc) { _id, name, "slug": slug.current }`

export async function GET() {
  const committees = await client.fetch(committeesQuery)
  return NextResponse.json(committees)
}