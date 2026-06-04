import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, score, band, ipv4, age, review, acquisition } = data
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Prosaria Website <onboarding@resend.dev>',
          to: ['hello@prosaria.co.uk'],
          reply_to: email,
          subject: `IPv4 check: ${name} — ${band}`,
          html: `
            <h2>IPv4 Opportunity Check</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Result</td><td style="padding:8px;border:1px solid #ddd">${score}/8 — ${band}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">IPv4 holdings</td><td style="padding:8px;border:1px solid #ddd">${ipv4 || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Business age</td><td style="padding:8px;border:1px solid #ddd">${age || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Last reviewed</td><td style="padding:8px;border:1px solid #ddd">${review || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Acquisitions</td><td style="padding:8px;border:1px solid #ddd">${acquisition || '-'}</td></tr>
            </table>
          `,
        }),
      })
    } else {
      await fetch('https://formsubmit.co/ajax/hello@prosaria.co.uk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `IPv4 check: ${name} — ${band}`,
          name, email, result: `${score}/8 — ${band}`,
          ipv4: ipv4 || '-', age: age || '-',
          review: review || '-', acquisition: acquisition || '-',
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
