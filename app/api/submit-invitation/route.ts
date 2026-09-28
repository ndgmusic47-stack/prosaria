import { NextResponse } from 'next/server'

// Retired endpoint. The buyer invitation flow no longer exists.
export async function POST() {
  return NextResponse.json({ ok: false, error: 'This endpoint has been retired.' }, { status: 410 })
}
