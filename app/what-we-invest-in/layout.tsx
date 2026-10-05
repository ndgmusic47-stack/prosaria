import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Invest In',
  description: 'Prosaria acquires established specialist hobby retailers: trading cards, anime figures, Gunpla, collectibles and related games. Succession, customer communities and ecommerce expansion.',
  alternates: { canonical: '/what-we-invest-in' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
