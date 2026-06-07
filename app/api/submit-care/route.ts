import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, score, band, revenue, size, occupancy, manager, cqc, timeframe } = await req.json()
    await sendNotification(`Care snapshot: ${name} (${score}/11 — ${band})`, {
      Name: name,
      Email: email,
      Score: `${score}/11 — ${band}`,
      Revenue: revenue || '-',
      'Beds or service users': size || '-',
      Occupancy: occupancy || '-',
      'Registered manager': manager || '-',
      'CQC rating': cqc || '-',
      Timeframe: timeframe || '-',
    })
  } catch (err) {
    console.error('Care snapshot notification error:', err)
  }
  return NextResponse.json({ ok: true })
}
