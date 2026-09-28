import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact',
  description: 'Speak with Prosaria about a business, an investment opportunity or a partnership. Every enquiry is reviewed personally.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
