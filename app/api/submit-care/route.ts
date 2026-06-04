import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, score, band, revenue, size, occupancy, manager, cqc, timeframe } = data

    const key = process.env.WEB3FORMS_KEY

    if (key) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `New lead — Care snapshot: ${name} (${score}/11 — ${band})`,
          from_name: 'Prosaria Website',
          replyto: email,
          name,
          email,
          score: `${score}/11 — ${band}`,
          revenue: revenue || '-',
          size: size || '-',
          occupancy: occupancy || '-',
          registered_manager: manager || '-',
          cqc_rating: cqc || '-',
          exit_timeframe: timeframe || '-',
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
