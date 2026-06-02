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
          subject: `Capital assessment: ${data.name} — Est. ${data.releasable || 'unknown'}`,
          html: `
            <h2>Working Capital Assessment</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Estimated releasable:</strong> ${data.releasable || 'Not calculated'}</p>
            <p><strong>Turnover:</strong> ${data.turnover}</p>
            <p><strong>Payment terms:</strong> ${data.terms}</p>
            <p><strong>Existing facility:</strong> ${data.facility}</p>
            <p><strong>Sector:</strong> ${data.sector}</p>
          `,
          reply_to: data.email,
        }),
      })
    } else {
      console.log('Capital assessment submission:', data)
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
