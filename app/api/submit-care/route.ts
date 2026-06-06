import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, score, band, revenue, size, occupancy, manager, cqc, timeframe } = data

    const key = process.env.WEB3FORMS_KEY

    if (!key) {
      console.error('CRITICAL: WEB3FORMS_KEY not set — care snapshot notification failed for:', email)
      return NextResponse.json({ ok: true }) // Still show user their result
    }

    const res = await fetch('https://api.web3forms.com/submit', {
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
        beds_or_service_users: size || '-',
        occupancy: occupancy || '-',
        registered_manager: manager || '-',
        cqc_rating: cqc || '-',
        exit_timeframe: timeframe || '-',
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      console.error('Web3Forms error on care snapshot:', JSON.stringify(result))
    } else {
      console.log('Care snapshot notification sent:', name, email, `score: ${score}/11`)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Care snapshot exception:', err)
    return NextResponse.json({ ok: true }) // Always show user their result
  }
}
