import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Staffing Agency Diagnostic',
  description: 'Seven questions for US staffing and recruiting firms. See your cash gap and what the fastest growing agencies do differently. Takes two minutes.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
