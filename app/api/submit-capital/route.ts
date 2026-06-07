import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const {
      name, email, phone,
      pain, revenue, terms, payroll,
      financing, growth, aspiration,
      score, urgency, facility,
    } = await req.json()

    await sendNotification(
      `Working capital lead: ${name} — Urgency: ${urgency}`,
      {
        Name:            name,
        Email:           email,
        Phone:           phone || 'Not provided',
        Score:           `${score} — ${urgency} urgency`,
        'Cash pain':     pain || '-',
        Revenue:         revenue || '-',
        'Payment terms': terms || '-',
        'Payroll cycle': payroll || '-',
        Financing:       financing || '-',
        Growth:          growth || '-',
        Aspiration:      aspiration || '-',
        'Facility fit':  facility || '-',
      }
    )
  } catch (err) {
    console.error('Capital submission error:', err)
  }
  return NextResponse.json({ ok: true })
}
