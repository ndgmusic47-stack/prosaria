import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

// Allow-lists. Anything not listed here is ignored entirely.
const TYPE_LABEL: Record<string, string> = {
  seller: 'Seller',
  buyer:  'Buyer',
}
const SECTOR_LABEL: Record<string, string> = {
  'supported-living': 'Supported living',
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, type, sector } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    // Validate: only recognised keys survive. Unknown input is discarded.
    const typeLabel   = typeof type   === 'string' ? TYPE_LABEL[type]     : undefined
    const sectorLabel = typeof sector === 'string' ? SECTOR_LABEL[sector] : undefined

    const rows: Record<string, string> = {}
    if (typeLabel)   rows['Enquiry type'] = typeLabel
    if (sectorLabel) rows['Sector']       = sectorLabel
    rows.Name    = name
    rows.Email   = email
    rows.Message = message

    const subject = typeLabel
      ? `New ${typeLabel} enquiry: ${name}`
      : `New enquiry: ${name}`

    await sendNotification(subject, rows)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
