import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Understand the business, invest around its circumstances, improve how it operates and build for the long term. How Prosaria approaches every investment.',
  alternates: { canonical: '/how-we-work' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
