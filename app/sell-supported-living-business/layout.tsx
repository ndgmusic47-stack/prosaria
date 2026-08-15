import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell Your Supported Living Business',
  description: 'Considering selling a supported living business? Prosaria helps UK owners prepare properly, understand buyer interest and explore a sale discreetly.',
  alternates: { canonical: '/sell-supported-living-business' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
