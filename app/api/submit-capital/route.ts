import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, releasable, turnover, terms, facility, sector } = await req.json()
    await sendNotification(`Capital assessment: ${name} (${releasable || 'review needed'})`, {
      Name: name,
      Email: email,
      'Estimated releasable': releasable || 'Not calculated',
      Turnover: turnover || '-',
      'Payment terms': terms || '-',
      'Existing facility': facility || '-',
      Sector: sector || '-',
    })
  } catch (err) {
    console.error('Capital assessment notification error:', err)
  }
  return NextResponse.json({ ok: true })
}
