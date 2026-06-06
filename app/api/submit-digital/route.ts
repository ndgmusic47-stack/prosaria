import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, type, size, timeline } = data

    const key = process.env.WEB3FORMS_KEY

    if (!key) {
      console.error('CRITICAL: WEB3FORMS_KEY not set — digital enquiry notification failed for:', email)
      return NextResponse.json({ ok: true })
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `New lead — Digital infrastructure: ${name}`,
        from_name: 'Prosaria Website',
        replyto: email,
        name,
        email,
        interest_type: type || '-',
        scale: size || '-',
        timeline: timeline || '-',
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      console.error('Web3Forms error on digital enquiry:', JSON.stringify(result))
    } else {
      console.log('Digital enquiry notification sent:', name, email)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Digital enquiry exception:', err)
    return NextResponse.json({ ok: true })
  }
}
