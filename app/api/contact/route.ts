import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const key = process.env.WEB3FORMS_KEY

    if (!key) {
      // Key missing — fail loudly so it is obvious in Vercel logs
      console.error('CRITICAL: WEB3FORMS_KEY environment variable is not set')
      return NextResponse.json({ ok: false, error: 'Configuration error' }, { status: 500 })
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
      console.error('Web3Forms error:', JSON.stringify(data))
      return NextResponse.json({ ok: false, error: data.message }, { status: 500 })
    }

    console.log('Contact form sent successfully:', name, email)
    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Contact form exception:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
