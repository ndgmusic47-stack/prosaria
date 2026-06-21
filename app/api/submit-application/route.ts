import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const d = await req.json()
    await sendNotification(
      `Mandate application: ${d.name || 'Unknown'} — ${d.buyerType || 'buyer'}`,
      {
        Name:              d.name || '-',
        Email:             d.email || '-',
        Phone:             d.phone || 'Not provided',
        Organisation:      d.organisation || '-',
        'Active in 12mo':  d.active || '-',
        'Buyer type':      d.buyerType || '-',
        Geographies:       d.geographies || '-',
        Subsectors:        d.subsectors || '-',
        'Target size':     d.size || '-',
        'Platform/bolt-on':d.dealType || '-',
        'Capital access':  d.capital || '-',
        'Decision maker':  d.decision || '-',
        'Prior deals':     d.priorDeals || '-',
        'Owner-led open':  d.ownerLed || '-',
        'Retained model':  d.retained || '-',
        'What matters':    d.value || '-',
      }
    )
  } catch (err) {
    console.error('Application submission error:', err)
  }
  return NextResponse.json({ ok: true })
}
