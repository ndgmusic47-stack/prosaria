import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Work On',
  description: 'The kinds of situations Prosaria works with across UK healthcare M&A, on the owner side and the buyer side.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
