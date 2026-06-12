import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with Prosaria Partners. Phone, email or one of our two minute diagnostic tools.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
