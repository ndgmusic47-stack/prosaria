import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const key = process.env.WEB3FORMS_KEY

    if (!key) {
      console.error('WEB3FORMS_KEY not set')
      return NextResponse.json({ ok: true }) // Still return ok so form shows success
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `New enquiry from ${name}`,
        from_name: 'Prosaria Website',
        replyto: email,
        name,
        email,
        message,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('Web3Forms error:', data)
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
