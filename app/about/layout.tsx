import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description: 'Prosaria is a founder-led origination firm based in London. Direct outreach, proper qualification, honest about fit.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
