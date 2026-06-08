'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about',        label: 'Meet the team' },
  { href: '/work',         label: 'What we do' },
  { href: '/case-studies', label: 'What we work on' },
  { href: '/insight',      label: 'Insight' },
]

export default function Nav() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname              = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header className={`absolute lg:fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'lg:bg-[#050d1a]/95 lg:backdrop-blur-sm lg:border-b lg:border-blue-500/10' : ''
      }`}>
        <div className="max-w-site mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/logo.png"
              alt="Prosaria Partners"
              width={56}
              height={56}
              className="object-contain brightness-110"
            />
            <span className="hidden sm:block font-serif text-[1rem] text-[#f0f4ff] tracking-wide group-hover:text-blue-400 transition-colors duration-200">
              Prosaria Partners
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`font-sans text-[0.78rem] tracking-[0.06em] uppercase transition-colors duration-200 ${
                  pathname === href ? 'text-blue-400' : 'text-[#94a3b8] hover:text-[#f0f4ff]'
                }`}>
                {label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-[0.75rem] py-2.5 px-5 ml-2">
              Work with us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span className={`block h-px bg-[#e8edf5] transition-all duration-300 ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px bg-[#e8edf5] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-[#e8edf5] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-[#050d1a] flex flex-col justify-center px-8 transition-all duration-500 overflow-hidden ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Blue glow behind menu */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <nav className="flex flex-col gap-8 relative">
          {links.map(({ href, label }, i) => (
            <Link key={href} href={href}
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
              className={`font-serif text-4xl text-[#f0f4ff] hover:text-blue-400 transition-all duration-300 ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              {label}
            </Link>
          ))}
          <Link href="/contact"
            style={{ transitionDelay: open ? `${links.length * 60}ms` : '0ms' }}
            className={`mt-4 btn-primary self-start transition-all duration-300 ${
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            Work with us
          </Link>
        </nav>
        <div className="absolute bottom-10 left-8">
          <p className="eyebrow text-blue-500/40">Prosaria Partners</p>
        </div>
      </div>
    </>
  )
}
