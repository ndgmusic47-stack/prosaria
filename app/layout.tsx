import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Prosaria — Independent Deal Origination', template: '%s | Prosaria' },
  description: 'UK healthcare M&A origination and sale preparation. Care businesses, direct owner relationships, and mandate led acquisition conversations. Based in London.',
  metadataBase: new URL('https://prosaria.co.uk'),
  openGraph: { type:'website', locale:'en_GB', url:'https://prosaria.co.uk', siteName:'Prosaria', title:'Prosaria', description:'UK healthcare M&A origination and sale preparation. Based in London.' },
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
