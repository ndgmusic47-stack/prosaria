import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, score, band, revenue, size, occupancy, manager, cqc, timeframe } = data

    const RESEND_KEY = process.env.RESEND_API_KEY

    if (RESEND_KEY) {
      // Resend email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Prosaria Website <onboarding@resend.dev>',
          to: ['hello@prosaria.co.uk'],
          reply_to: email,
          subject: `Care snapshot: ${name} — Score ${score}/11 (${band})`,
          html: `
            <h2>Care Exit Readiness Snapshot</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Score</td><td style="padding:8px;border:1px solid #ddd">${score}/11 — ${band}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Revenue</td><td style="padding:8px;border:1px solid #ddd">${revenue || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Size</td><td style="padding:8px;border:1px solid #ddd">${size || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Occupancy</td><td style="padding:8px;border:1px solid #ddd">${occupancy || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Manager</td><td style="padding:8px;border:1px solid #ddd">${manager || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">CQC</td><td style="padding:8px;border:1px solid #ddd">${cqc || '-'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Timeframe</td><td style="padding:8px;border:1px solid #ddd">${timeframe || '-'}</td></tr>
            </table>
          `,
        }),
      })
    } else {
      // Fallback: FormSubmit — works immediately, no setup
      await fetch('https://formsubmit.co/ajax/hello@prosaria.co.uk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Care snapshot: ${name} — Score ${score}/11 (${band})`,
          name, email, score: `${score}/11 — ${band}`,
          revenue: revenue || '-',
          size: size || '-',
          occupancy: occupancy || '-',
          manager: manager || '-',
          cqc: cqc || '-',
          timeframe: timeframe || '-',
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
