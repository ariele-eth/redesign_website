export const runtime = 'edge'; // ✅ Required for Cloudflare Pages

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

    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert([
        {
          first_name: body.first_name,
          last_name: body.last_name,
          city: body.city,
          company: body.company,
          industry: body.industry,
          motivation: body.motivation,
          accept_terms: body.accept_terms || false,
          email: body.email,
          university: body.university,
          experience: body.experience,
          accept_member: body.accept_member || false,
          registration: 'external',
          academic_department: body.academic_department,
          status: 'pending',
          submitted_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
      ])
      .select()

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
