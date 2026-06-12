import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Care Exit Readiness',
  description: 'Six questions for UK care business owners. Get an instant score on where your business stands for exit.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
