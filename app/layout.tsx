import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Prosaria Partners — Independent Deal Origination',
    template: '%s | Prosaria Partners',
  },
  description:
    'Independent origination across digital infrastructure, working capital and care sector M&A. Founder-led. Direct by nature.',
  metadataBase: new URL('https://prosaria.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://prosaria.co.uk',
    siteName: 'Prosaria Partners',
    title: 'Prosaria Partners — Independent Deal Origination',
    description:
      'Independent origination across digital infrastructure, working capital and care sector M&A.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prosaria Partners',
    description: 'Independent deal origination. Founder-led. Direct by nature.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
