'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const lines = [
  {
    num: '01', title: 'Digital Infrastructure',
    body: 'Overpaying for internet or network contracts? Sitting on IPv4 address blocks you\'ve never looked at? We find the value and get you a better deal.',
    href: '/work#digital', magnet: '/digital-audit', magnetLabel: 'Get a free audit →',
    icon: '⬡'
  },
  {
    num: '02', title: 'Working Capital',
    body: 'Invoices going out on 60 or 90 day terms while you cover wages every month? Invoice finance releases that cash. We find the right lender and get it in place.',
    href: '/work#capital', magnet: '/capital-assessment', magnetLabel: 'See how much you could release →',
    icon: '◈'
  },
  {
    num: '03', title: 'Care Sector M&A',
    body: 'Thinking about selling your care business? Or looking to buy one before it hits the open market? We work quietly on both sides of the deal.',
    href: '/work#care', magnet: '/care-snapshot', magnetLabel: 'Check your exit readiness →',
    icon: '◉'
  },
]

const caseStudies = [
  { tag: 'Care M&A', region: 'South East England', headline: 'Owner-managed care business — quiet exit', outcome: 'Buyer and seller introduced. Heads of terms in 11 weeks. Full exit done.', timeframe: '4 months' },
  { tag: 'Digital Infrastructure', region: 'UK', headline: 'Network address blocks turned into cash', outcome: 'Unused internet address space found on the balance sheet. We found the buyer. Deal done.', timeframe: '6 weeks' },
  { tag: 'Working Capital', region: 'UK', headline: 'Manufacturer moved to a better facility', outcome: 'Overpaying on existing invoice finance. We found better terms and switched it.', timeframe: '3 weeks' },
]

export default function HomePage() {
  useReveal()
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-bg.jpg" alt="" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#050d1a]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(29,78,216,0.2)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#050d1a] to-transparent" />
        </div>
        <div className="scanlines absolute inset-0 opacity-20" />

        <div className="relative z-10 max-w-site mx-auto px-6 lg:px-10 w-full pt-36">
          <p className="eyebrow mb-6 opacity-0 animate-fade-in" style={{animationDelay:'0.1s',animationFillMode:'forwards'}}>
            Prosaria Partners — London
          </p>
          <h1 className="font-serif text-display-2xl text-[#f0f4ff] max-w-[14ch] leading-none mb-8 opacity-0 animate-fade-up"
            style={{animationDelay:'0.2s',animationFillMode:'forwards',textShadow:'0 0 60px rgba(59,130,246,0.3)'}}>
            We find deals<br />
            <span className="italic text-blue-400">others don&apos;t.</span>
          </h1>
          <p className="font-sans text-body-lg text-[#94a3b8] max-w-[42ch] mb-12 opacity-0 animate-fade-up"
            style={{animationDelay:'0.35s',animationFillMode:'forwards'}}>
            Independent deal origination. Digital infrastructure, working capital and care sector M&A.
          </p>
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{animationDelay:'0.5s',animationFillMode:'forwards'}}>
            <Link href="/work" className="btn-primary">See what we do</Link>
            <Link href="/contact" className="btn-outline">Talk to Nathan</Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/8">
            {[
              {v:'3',l:'Sectors we work in'},
              {v:'8+',l:'Countries'},
              {v:'100%',l:'Founder-led'},
              {v:'Est. 2024',l:'London, UK'},
            ].map((s,i) => (
              <div key={s.l} className="opacity-0 animate-fade-up" style={{animationDelay:`${0.6+i*0.1}s`,animationFillMode:'forwards'}}>
                <p className="font-serif text-display-lg text-blue-400 leading-none mb-1" style={{textShadow:'0 0 20px rgba(59,130,246,0.4)'}}>{s.v}</p>
                <p className="text-label text-[#475569] uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-[#020810] border-y border-blue-500/8 py-4">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-6 lg:gap-12">
          <span className="eyebrow text-blue-500/30">Partners</span>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /><span className="text-sm text-[#334155]">GTT Authorised Channel Partner</span></div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f]" /><span className="text-sm text-[#2d4060]">Registered England &amp; Wales</span></div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f]" /><span className="text-sm text-[#2d4060]">020 3026 7906</span></div>
        </div>
      </section>

      {/* WHAT WE DO — dark */}
      <section className="py-32 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] max-w-[24ch]">
              Three markets. No middlemen. Just Nathan.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{background:'rgba(59,130,246,0.06)'}}>
            {lines.map((line, i) => (
              <div key={line.num} className={`bg-[#050d1a] p-10 lg:p-12 flex flex-col reveal reveal-delay-${i+1} group hover:bg-[#080f1e] transition-colors duration-300`}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.9)] transition-shadow duration-300" />
                  <p className="text-label text-blue-400">{line.num}</p>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-5">{line.title}</h3>
                <p className="text-body-sm text-[#94a3b8] leading-relaxed flex-1 mb-8">{line.body}</p>
                <div className="mt-auto pt-6 border-t border-blue-500/8 space-y-3">
                  <Link href={line.href} className="text-label text-[#475569] hover:text-[#94a3b8] transition-colors uppercase tracking-widest block">Learn more</Link>
                  <Link href={line.magnet} className="block w-full text-center btn-primary text-[0.75rem] py-3">
                    {line.magnetLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NATHAN — light section */}
      <section className="light-section py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Photo */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/nathan.jpg"
                  alt="Nathan Powell — Founder of Prosaria Partners"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {/* Blue tint overlay — subtle */}
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                {/* Name plate */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050d1a]/90 to-transparent">
                  <p className="font-serif text-lg text-white">Nathan Powell</p>
                  <p className="text-label text-blue-400 mt-1">Founder, Prosaria Partners</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="line-accent mb-8 reveal" style={{background:'#1d4ed8'}} />
              <p className="eyebrow mb-5 reveal">The person you actually speak to</p>
              <h2 className="font-serif text-display-lg mb-8 reveal reveal-delay-1" style={{color:'#050d1a'}}>
                I built Prosaria around one skill — finding conversations that matter before anyone else does.
              </h2>
              <div className="space-y-5 reveal reveal-delay-2">
                <p style={{color:'#1e3a5f'}}>
                  My background is in deal origination. I find opportunities, check both sides are real, and manage the process. I am not a sector consultant. I am a deal finder who knows these markets well enough to tell you when something is worth pursuing — and when it is not.
                </p>
                <p style={{color:'#1e3a5f'}}>
                  Prosaria is deliberately small. Faster decisions. No layers. The person who takes your call is the same person who closes your deal.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/about" className="btn-outline-dark">More about Nathan</Link>
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES — dark */}
      <section className="py-32 bg-[#020810]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
            <div className="reveal">
              <p className="eyebrow mb-4">Deal examples</p>
              <h2 className="font-serif text-display-md text-[#f0f4ff]">Real deals.<br />No client names.</h2>
            </div>
            <Link href="/case-studies" className="btn-outline reveal">All case studies</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={cs.headline} className={`border border-blue-500/10 bg-[#0a1628] p-8 flex flex-col reveal reveal-delay-${i+1} hover:border-blue-500/25 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="eyebrow text-blue-400">{cs.tag}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#475569]">{cs.region}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4 leading-snug">{cs.headline}</h3>
                <p className="text-body-sm text-[#94a3b8] flex-1 mb-6">{cs.outcome}</p>
                <div className="pt-5 border-t border-blue-500/8 flex justify-between">
                  <span className="text-label text-[#475569]">Timeframe</span>
                  <span className="text-label text-blue-400">{cs.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNETS — light */}
      <section className="light-section py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">Free tools</p>
            <h2 className="font-serif text-display-lg max-w-[28ch]" style={{color:'#050d1a'}}>
              Not sure where you stand? Start here.
            </h2>
            <p className="text-body-md mt-4 max-w-[44ch]" style={{color:'#1e3a5f'}}>
              Three free assessments. Takes two minutes each. Nathan reviews every single one personally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title:'Care exit readiness', desc:'Find out where your care business stands and what a buyer would think of it today.', href:'/care-snapshot', time:'2 min', sector:'Care M&A' },
              { title:'Infrastructure audit', desc:'Find out if your connectivity costs are too high or if you have digital assets sitting unused.', href:'/digital-audit', time:'2 min', sector:'Digital' },
              { title:'Working capital check', desc:'Find out how much cash is tied up in your invoices and what releasing it would cost.', href:'/capital-assessment', time:'2 min', sector:'Capital' },
            ].map((m, i) => (
              <div key={m.title} className={`bg-white border border-blue-100 p-8 flex flex-col reveal reveal-delay-${i+1} hover:border-blue-300 hover:shadow-lg transition-all duration-300`} style={{borderRadius:'2px'}}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-label text-blue-600 border border-blue-200 px-3 py-1">{m.sector}</span>
                  <span className="text-label text-[#94a3b8]">{m.time}</span>
                </div>
                <h3 className="font-serif text-display-sm mb-4" style={{color:'#050d1a'}}>{m.title}</h3>
                <p className="text-body-sm flex-1 mb-8" style={{color:'#1e3a5f'}}>{m.desc}</p>
                <Link href={m.href} className="btn-primary w-full justify-center">
                  Start free →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — dark */}
      <section className="py-24 bg-[#050d1a] border-t border-blue-500/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(29,78,216,0.08)_0%,transparent_70%)]" />
        <div className="relative max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#f0f4ff] max-w-[28ch]">
              Got a deal, an asset, or a problem worth talking about?
            </h2>
            <p className="text-body-md text-[#475569] mt-3">
              <a href="tel:02030267906" className="hover:text-blue-400 transition-colors">020 3026 7906</a>
              <span className="mx-3 text-[#1e3a5f]">·</span>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-blue-400 transition-colors">hello@prosaria.co.uk</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-1 flex-shrink-0">
            <Link href="/contact" className="btn-primary">Start a conversation</Link>
            <Link href="/work" className="btn-outline">See what we do</Link>
          </div>
        </div>
      </section>
    </>
  )
}
