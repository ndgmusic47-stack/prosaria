import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const d = await req.json()
    await sendNotification(
      `Buyer lane application: ${d.fullName || d.firstName || 'Unknown'} — ${d.buyerType || 'buyer'}`,
      {
        'Route':               '/invitation (private link)',
        'Submitted':           new Date().toUTCString(),
        'Access — First name': d.firstName || '-',
        'Access — Company':    d.companyName || '-',
        'Access — Email':      d.accessEmail || '-',
        'Fit Q1 — Active 6-12 months':      d.q1 || '-',
        'Fit Q2 — Funding in place/route':  d.q2 || '-',
        'Fit Q3 — Clear criteria':          d.q3 || '-',
        'Fit Q4 — Retained 90-day mandate': d.q4 || '-',
        'Full name':           d.fullName || '-',
        'Company':             d.company || '-',
        'Email':               d.email || '-',
        'Phone':               d.phone || 'Not provided',
        'Buyer type':          d.buyerType || '-',
        'Acquisition criteria':d.criteria || '-',
        'Target geography':    d.geography || '-',
        'Target business size':d.size || '-',
        'Funding position':    d.funding || '-',
        'Timeline to acquire': d.timeline || '-',
        'Care sector experience': d.experience || '-',
        'Exclusions / conflicts': d.exclusions || '-',
        'Why this search matters now': d.whyNow || '-',
        'Message':             d.message || '-',
        'PtP acknowledgement': d.ack ? 'Confirmed' : 'NOT confirmed',
      }
    )
  } catch (err) { console.error('Invitation submission error:', err) }
  return NextResponse.json({ ok: true })
}
