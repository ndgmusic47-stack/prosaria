import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#020810] border-t border-blue-500/8 text-[#94a3b8]">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image src="/logo.png" alt="Prosaria Partners" width={40} height={40} className="object-contain" />
              <span className="font-serif text-base text-[#f0f4ff] group-hover:text-blue-400 transition-colors">Prosaria Partners</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[28ch] mb-6">
              Independent deal origination across digital infrastructure, working capital and care sector M&A.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:02030267906" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <span className="text-blue-500/40 text-xs">T</span> 020 3026 7906
              </a>
              <a href="mailto:hello@prosaria.co.uk" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <span className="text-blue-500/40 text-xs">E</span> hello@prosaria.co.uk
              </a>
              <p className="flex items-start gap-2 text-[#64748b]">
                <span className="text-blue-500/40 text-xs mt-0.5">A</span>
                <span>66 Paul Street, London, EC2A 4NA</span>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-blue-500/30 mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                {href:'/about',label:'Meet the team'},
                {href:'/work',label:'What we do'},
                {href:'/case-studies',label:'What we work on'},
                {href:'/insight',label:'Insight'},
                {href:'/contact',label:'Work with us'},
              ].map(({href,label})=>(
                <Link key={href} href={href} className="text-sm hover:text-blue-400 transition-colors">{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-blue-500/30 mb-5">Free tools</p>
            <nav className="flex flex-col gap-3">
              {[
                {href:'/care-snapshot',label:'Care exit snapshot'},
                {href:'/digital-audit',label:'Infrastructure audit'},
                {href:'/capital-assessment',label:'Capital assessment'},
              ].map(({href,label})=>(
                <Link key={href} href={href} className="text-sm hover:text-blue-400 transition-colors">{label}</Link>
              ))}
            </nav>
            <div className="mt-8 space-y-2">
              <p className="eyebrow text-blue-500/30 mb-3">Connect</p>
              <a href="https://www.linkedin.com/in/mrpowell22/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400 transition-colors block">Nathan on LinkedIn</a>
              <a href="https://www.linkedin.com/company/prosaria-partners" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400 transition-colors block">Prosaria on LinkedIn</a>
            </div>
          </div>

        </div>

        <div className="border-t border-blue-500/8 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-[#94a3b8]">
          <p>© {year} South Thames Trading Company Limited trading as Prosaria Partners. Registered in England &amp; Wales. 66 Paul Street, London EC2A 4NA.</p>
          <Link href="/privacy" className="hover:text-[#94a3b8] transition-colors">Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}
