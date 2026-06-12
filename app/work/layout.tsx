import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Do',
  description: 'Care sector M&A origination, digital infrastructure via specialist partners, and factoring facilities for US staffing agencies.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
