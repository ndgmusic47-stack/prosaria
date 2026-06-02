import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Prosaria Website <noreply@prosaria.co.uk>',
          to: ['hello@prosaria.co.uk'],
          subject: `Care snapshot: ${data.name} — Score ${data.score}/11`,
          html: `
            <h2>Care Exit Readiness Snapshot</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Score:</strong> ${data.score}/11 — ${data.band}</p>
            <hr/>
            <p><strong>Revenue:</strong> ${data.revenue}</p>
            <p><strong>Size:</strong> ${data.size}</p>
            <p><strong>Occupancy:</strong> ${data.occupancy}</p>
            <p><strong>Registered manager:</strong> ${data.manager}</p>
            <p><strong>CQC rating:</strong> ${data.cqc}</p>
            <p><strong>Timeframe:</strong> ${data.timeframe}</p>
          `,
          reply_to: data.email,
        }),
      })
    } else {
      console.log('Care snapshot submission:', data)
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
