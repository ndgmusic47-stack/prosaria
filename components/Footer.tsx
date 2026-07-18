import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#EFE9DE] border-t border-[#2E5E44]/12 text-[#5C6B5F]">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image src="/logo.png" alt="Prosaria Partners" width={40} height={40} className="object-contain" />
              <span className="font-serif text-base text-[#1F3D2B] group-hover:text-[#2E5E44] transition-colors">Prosaria Partners</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[28ch] mb-6">
              Prosaria is a UK healthcare M&A origination and sale preparation firm focused on care businesses, direct owner relationships, and mandate-led acquisition conversations.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:02030267906" className="flex items-center gap-2 hover:text-[#2E5E44] transition-colors">
                <span className="text-[#2E5E44]/40 text-xs">T</span> 020 3026 7906
              </a>
              <a href="mailto:hello@prosaria.co.uk" className="flex items-center gap-2 hover:text-[#2E5E44] transition-colors">
                <span className="text-[#2E5E44]/40 text-xs">E</span> hello@prosaria.co.uk
              </a>
              <p className="flex items-start gap-2 text-[#6E7B6F]">
                <span className="text-[#2E5E44]/40 text-xs mt-0.5">A</span>
                <span>66 Paul Street, London, EC2A 4NA</span>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-[#A67C4E]/70 mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                {href:'/about',label:'Meet the team'},
                {href:'/work',label:'What we do'},
                {href:'/case-studies',label:'What we work on'},
                {href:'/insight',label:'Insight'},
                {href:'/contact',label:'Work with us'},
              ].map(({href,label})=>(
                <Link key={href} href={href} className="text-sm hover:text-[#2E5E44] transition-colors">{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-[#A67C4E]/70 mb-5">Get in touch</p>
            <nav className="flex flex-col gap-3">
              {[
                {href:'/contact',label:'Start a conversation'},
                {href:'/insight',label:'Insights'},
              ].map(({href,label})=>(
                <Link key={href} href={href} className="text-sm hover:text-[#2E5E44] transition-colors">{label}</Link>
              ))}
            </nav>
            <div className="mt-8 space-y-2">
              <p className="eyebrow text-[#A67C4E]/70 mb-3">Connect</p>
              <a href="https://www.linkedin.com/in/mrpowell22/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#2E5E44] transition-colors block">Nathan on LinkedIn</a>
              <a href="https://www.linkedin.com/company/prosaria-partners" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#2E5E44] transition-colors block">Prosaria on LinkedIn</a>
            </div>
          </div>

        </div>

        <div className="border-t border-[#2E5E44]/12 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-[#5C6B5F]">
          <p>© {year} South Thames Trading Company Limited trading as Prosaria Partners. Registered in England &amp; Wales. 66 Paul Street, London EC2A 4NA.</p>
          <Link href="/privacy" className="hover:text-[#5C6B5F] transition-colors">Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}
