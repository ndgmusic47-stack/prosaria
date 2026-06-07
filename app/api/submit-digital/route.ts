import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, size, timeline } = await req.json()
    await sendNotification(`Digital infrastructure enquiry: ${name}`, {
      Name: name,
      Email: email,
      'Interest type': type || '-',
      Scale: size || '-',
      Timeline: timeline || '-',
    })
  } catch (err) {
    console.error('Digital enquiry notification error:', err)
  }
  return NextResponse.json({ ok: true })
}
