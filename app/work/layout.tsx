import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/work' },
  title: 'What We Do',
  description: 'Sale preparation for care business owners, and mandate led origination for serious buyers, funds, and operators.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
