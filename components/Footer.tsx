import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#020810] border-t border-blue-500/10 text-[#475569]">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image src="/logo.png" alt="Prosaria Partners" width={36} height={36} className="object-contain" />
              <span className="font-serif text-base text-[#f0f4ff] group-hover:text-blue-400 transition-colors">Prosaria Partners</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[24ch]">
              Independent deal origination across digital infrastructure, working capital and care sector M&A.
            </p>
          </div>

          <div>
            <p className="eyebrow text-blue-500/40 mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                {href:'/about',label:'About Nathan'},
                {href:'/work',label:'What we do'},
                {href:'/case-studies',label:'Case studies'},
                {href:'/insight',label:'Insight'},
                {href:'/contact',label:'Work with us'},
              ].map(({href,label})=>(
                <Link key={href} href={href} className="text-sm hover:text-blue-400 transition-colors duration-200">{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-blue-500/40 mb-5">Contact</p>
            <div className="flex flex-col gap-2 text-sm mb-8">
              <a href="mailto:nathan@prosaria.co.uk" className="hover:text-blue-400 transition-colors duration-200">nathan@prosaria.co.uk</a>
              <a href="https://linkedin.com/in/nathanpowell" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200">LinkedIn — Nathan Powell</a>
            </div>
            <p className="eyebrow text-blue-500/40 mb-3">Partner</p>
            <p className="text-sm">GTT Authorised Channel Partner</p>
          </div>
        </div>

        <div className="border-t border-blue-500/8 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-[#334155]">
          <p>© {year} South Thames Trading Company Limited trading as Prosaria Partners. Registered in England &amp; Wales.</p>
          <Link href="/privacy" className="hover:text-[#475569] transition-colors duration-200">Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}
