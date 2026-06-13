import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Prosaria Partners — Independent Deal Origination', template: '%s | Prosaria Partners' },
  description: 'Funding and deals in healthcare. We help US healthcare staffing agencies grow, and help people buy and sell UK care businesses. Based in London.',
  metadataBase: new URL('https://prosaria.co.uk'),
  openGraph: { type:'website', locale:'en_GB', url:'https://prosaria.co.uk', siteName:'Prosaria Partners', title:'Prosaria Partners', description:'Funding and deals in healthcare. US staffing funding and UK care sector M&A. Based in London.' },
  robots: { index:true, follow:true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" style={{overflowX:"hidden",maxWidth:"100vw"}}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
