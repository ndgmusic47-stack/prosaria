import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description: 'Prosaria was founded to acquire, invest in and build established businesses. Lean by design, practical in approach.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
