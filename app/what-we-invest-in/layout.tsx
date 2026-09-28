import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Invest In',
  description: 'Prosaria looks for established businesses where better ownership, operations and investment can create more value. Owner-operated, succession, buy-and-build.',
  alternates: { canonical: '/what-we-invest-in' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
