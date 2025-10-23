export const runtime = 'edge'; // ✅ Required for Cloudflare Pages

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// kept minimal server handler; the Event type was unused and triggered a linter warning

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
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
  } catch (err: unknown) {
    const message =
      typeof err === 'object' && err !== null && 'message' in err
        ? String((err as { message?: unknown }).message)
        : 'Unexpected error'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
