import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Work On',
  description: 'The types of mandates, enquiries and situations Prosaria Partners works with across care M&A, digital infrastructure and working capital.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
