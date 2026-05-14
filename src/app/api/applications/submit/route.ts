import { NextResponse } from 'next/server'

import { supabaseAdmin } from '@/lib/supabase/server'
import {
  ApplicationValidationError,
  buildApplicationInsertRow,
  type ApplicationSubmissionPayload,
} from '@/lib/applications'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplicationSubmissionPayload
    const insertRow = buildApplicationInsertRow(body)

    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert(insertRow)
      .select('id, status, registration, submitted_at')
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message =
      error instanceof ApplicationValidationError
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: unknown }).message)
          : 'Invalid request'

    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    )
  }
}
