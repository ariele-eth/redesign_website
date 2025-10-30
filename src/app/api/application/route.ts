export const runtime = 'edge' // ✅ Required for Cloudflare Pages

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'city',
      'motivation',
      'university',
      'experience',
      'academic_department',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Build insert row dynamically so we only include accept_terms / accept_member
    // when the client explicitly provided them. This prevents inserting `null`
    // into NOT NULL columns if the DB hasn't been migrated yet.
  const insertRow: Record<string, unknown> = {
      first_name: body.first_name,
      last_name: body.last_name,
      city: body.city,
      company: body.company,
      industry: body.industry,
      motivation: body.motivation,
      email: body.email,
      university: body.university,
      experience: body.experience,
      registration: body.registration || 'external',
      academic_department: body.academic_department,
      // Committee-specific fields (only for committee applications)
      preferred_role: body.committee_role || null,
      time_commit: body.time_commitment || null,
      leadership_exp: body.leadership_experience || null,
      status: 'pending',
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }

    if (typeof body.accept_terms === 'boolean') {
      insertRow.accept_terms = body.accept_terms
    }

    if (typeof body.accept_member === 'boolean') {
      insertRow.accept_member = body.accept_member
    }

    const { data, error } = await supabaseAdmin.from('applications').insert([insertRow]).select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
