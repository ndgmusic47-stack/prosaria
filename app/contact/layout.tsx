import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact',
  description: 'Speak with Prosaria about a hobby retail business, supply into the market or a capital partnership. Every enquiry is read personally.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
