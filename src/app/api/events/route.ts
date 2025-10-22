// src/app/api/events/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Event = {
  id: string
  title: string
  description: string | null
  start_time: string
  end_time: string | null
  location: string | null
  image_url: string | null
  date: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from') // e.g., 2025-10-01
    const to = searchParams.get('to') // e.g., 2025-12-31
    const limit = Number(searchParams.get('limit') ?? 50)

    let q = supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true })
      .limit(Math.min(Math.max(limit, 1), 200))

    if (from) q = q.gte('start_time', new Date(from).toISOString())
    if (to) q = q.lte('start_time', new Date(to).toISOString())

    const { data, error } = await q
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 })

    const events = data.map((e) => {
      if (e.image_url) return e
      const { data: pub } = supabase.storage
        .from('events')
        .getPublicUrl(e.image_url)
      return { ...e, image_url: pub.publicUrl }
    })

    return NextResponse.json({ count: data?.length ?? 0, events: events ?? [] })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? 'Unexpected error' },
      { status: 500 }
    )
  }
}
