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
          subject: `IPv4 audit: ${data.name}`,
          html: `
            <h2>IPv4 Opportunity Check</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>IPv4 holdings:</strong> ${data.ipv4}</p>
            <p><strong>Sites:</strong> ${data.sites}</p>
            <p><strong>Connectivity spend:</strong> ${data.spend}</p>
            <p><strong>Dark fibre/unused capacity:</strong> ${data.darkfibre}</p>
            <p><strong>Last contract review:</strong> ${data.renewal}</p>
          `,
          reply_to: data.email,
        }),
      })
    } else {
      console.log('Digital audit submission:', data)
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
