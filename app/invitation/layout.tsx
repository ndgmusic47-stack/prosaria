import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A Private Introduction',
  description: 'Private invitation to Prosaria. This page is not public.',
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
