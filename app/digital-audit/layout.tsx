import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Infrastructure Enquiry',
  description: 'Looking to acquire IPv4 address space, or holding space and exploring options? Tell us about your requirement.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
