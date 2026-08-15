import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact',
  description: 'Start a conversation with Prosaria. Two routes: care business owners, and buyers, funds, and operators.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
