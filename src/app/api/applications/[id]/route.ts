import { NextResponse } from 'next/server'

import { supabaseAdmin } from '@/lib/supabase/server'
import { isReviewStatus } from '@/lib/applications'

export const runtime = 'nodejs'

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params

  const { data, error } = await supabaseAdmin
    .from('applications')
    .select(
      'id, status, registration, first_name, last_name, email, city, motivation, university, academic_department, company, industry, experience, preferred_role, time_commit, leadership_exp, submitted_at, reviewed_at, created_at'
    )
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params
  const body = (await request.json()) as { status?: unknown }

  if (!isReviewStatus(body.status)) {
    return NextResponse.json(
      { success: false, error: 'Invalid status update' },
      { status: 400 }
    )
  }

  const { data, error } = await supabaseAdmin
    .from('applications')
    .update({
      status: body.status,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, status, reviewed_at')
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
