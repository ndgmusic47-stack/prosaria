import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Understand the economics, assess stock and working capital, agree a transaction that suits the situation, support the handover and improve how the business trades.',
  alternates: { canonical: '/how-we-work' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
