import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const d = await req.json()
    await sendNotification(
      `Private invitation application: ${d.name || 'Unknown'}`,
      {
        'Route':            '/invitation (private link)',
        'Submitted':        new Date().toUTCString(),
        'Fit Q1 — Actively acquiring UK healthcare': d.q1 || '-',
        'Fit Q2 — Capital or committed funding':     d.q2 || '-',
        'Fit Q3 — Conversation within 30 days':      d.q3 || '-',
        'Fit Q4 — Protected mandate (not deal list)':d.q4 || '-',
        'Name':             d.name || '-',
        'Organisation':     d.organisation || '-',
        'Role':             d.role || '-',
        'Email':            d.email || '-',
        'Phone':            d.phone || 'Not provided',
        'Target subsectors':d.subsectors || '-',
        'Target size':      d.size || '-',
        'Geography':        d.geography || '-',
        'Timeline':         d.timeline || '-',
        'Anything else':    d.notes || '-',
      }
    )
  } catch (err) {
    console.error('Invitation submission error:', err)
  }
  return NextResponse.json({ ok: true })
}
