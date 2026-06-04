import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, releasable, turnover, terms, facility, sector } = data
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Prosaria Website <onboarding@resend.dev>',
          to: ['hello@prosaria.co.uk'],
          reply_to: email,
          subject: `Capital assessment: ${name} — ${releasable || 'review needed'}`,
          html: `
            <h2>Working Capital Assessment</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Estimated releasable</td><td style="padding:8px;border:1px solid #ddd">${releasable || 'Not calculated'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Turnover</td><td style="padding:8px;border:1px solid #ddd">${turnover || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Payment terms</td><td style="padding:8px;border:1px solid #ddd">${terms || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Existing facility</td><td style="padding:8px;border:1px solid #ddd">${facility || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Sector</td><td style="padding:8px;border:1px solid #ddd">${sector || '-'}</td></tr>
            </table>
          `,
        }),
      })
    } else {
      await fetch('https://formsubmit.co/ajax/hello@prosaria.co.uk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Capital assessment: ${name} — ${releasable || 'review needed'}`,
          name, email,
          estimated_releasable: releasable || 'Not calculated',
          turnover: turnover || '-', terms: terms || '-',
          facility: facility || '-', sector: sector || '-',
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
