import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, releasable, turnover, terms, facility, sector } = data

    const key = process.env.WEB3FORMS_KEY

    if (!key) {
      console.error('CRITICAL: WEB3FORMS_KEY not set — capital assessment notification failed for:', email)
      return NextResponse.json({ ok: true })
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `New lead — Capital assessment: ${name} (${releasable || 'review needed'})`,
        from_name: 'Prosaria Website',
        replyto: email,
        name,
        email,
        estimated_releasable: releasable || 'Not calculated',
        turnover: turnover || '-',
        payment_terms: terms || '-',
        existing_facility: facility || '-',
        sector: sector || '-',
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      console.error('Web3Forms error on capital assessment:', JSON.stringify(result))
    } else {
      console.log('Capital assessment notification sent:', name, email)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Capital assessment exception:', err)
    return NextResponse.json({ ok: true })
  }
}
