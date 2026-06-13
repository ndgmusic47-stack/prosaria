import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Do',
  description: 'Funding for US healthcare staffing agencies, and buying and selling UK care businesses.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
