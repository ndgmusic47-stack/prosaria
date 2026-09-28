import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Prosaria | Investing in and Building Businesses', template: '%s | Prosaria' },
  description: 'Prosaria is an independent investment company focused on acquiring, improving and building established businesses.',
  metadataBase: new URL('https://www.prosaria.co.uk'),
  openGraph: { type:'website', locale:'en_GB', url:'https://www.prosaria.co.uk', siteName:'Prosaria', title:'Prosaria', description:'Prosaria is an independent investment company focused on acquiring, improving and building established businesses.' },
  alternates: { canonical: '/' },
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
