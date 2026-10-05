import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description: 'Prosaria was founded to own, operate and grow specialist hobby retail. Founder-led, deliberately lean, practical in approach.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
