import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, score, band, ipv4, age, review, acquisition } = data

    const key = process.env.WEB3FORMS_KEY

    if (key) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `New lead — IPv4 check: ${name} (${band})`,
          from_name: 'Prosaria Website',
          replyto: email,
          name,
          email,
          result: `${score}/8 — ${band}`,
          ipv4_holdings: ipv4 || '-',
          business_age: age || '-',
          last_reviewed: review || '-',
          acquisitions: acquisition || '-',
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
