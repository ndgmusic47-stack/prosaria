import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Work On',
  description: 'The kinds of situations Prosaria Partners works with across healthcare staffing funding and UK care sector M&A.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
