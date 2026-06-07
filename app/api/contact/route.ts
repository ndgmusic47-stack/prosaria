import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }
    await sendNotification(`New enquiry: ${name}`, {
      Name: name,
      Email: email,
      Message: message,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
