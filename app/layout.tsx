import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Prosaria | Specialist Hobby Retail, Owned and Operated', template: '%s | Prosaria' },
  description: 'Prosaria is a founder-led company building a specialist hobby retail business through operations, selective acquisitions and investment.',
  metadataBase: new URL('https://www.prosaria.co.uk'),
  openGraph: { type:'website', locale:'en_GB', url:'https://www.prosaria.co.uk', siteName:'Prosaria', title:'Prosaria', description:'Prosaria is a founder-led company building a specialist hobby retail business through operations, selective acquisitions and investment.' },
  alternates: { canonical: '/' },
  robots: { index:true, follow:true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/barlow-condensed-latin-800-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/dm-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" style={{overflowX:"hidden",maxWidth:"100vw"}}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
