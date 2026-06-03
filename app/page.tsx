'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import HeroVideo from '@/components/HeroVideo'


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const lines = [
  {
    num: '01',
    title: 'Digital Infrastructure',
    body: 'Many businesses are sitting on IPv4 address blocks they have never looked at. We help identify what is there and connect you with the right buyer or broker.',
    href: '/work#digital',
    magnet: '/digital-audit',
    magnetLabel: 'Free IPv4 audit',
  },
  {
    num: '02',
    title: 'Working Capital',
    body: 'Invoices going out on 60 or 90 day terms while you cover costs every month? We help identify the right invoice finance facility and get it in place.',
    href: '/work#capital',
    magnet: '/capital-assessment',
    magnetLabel: 'See how much you could release',
  },
  {
    num: '03',
    title: 'Care Sector M&A',
    body: 'Care business owners thinking about what comes next. Buyers looking for acquisitions before they reach the open market. We work quietly on both sides.',
    href: '/work#care',
    magnet: '/care-snapshot',
    magnetLabel: 'Check your exit readiness',
  },
]

const caseStudies = [
  {
    tag: 'Care M&A',
    region: 'South East England',
    headline: 'Long-established care business quiet exit',
    outcome: 'Heads of terms in 11 weeks. Full exit completed off-market.',
    timeframe: '4 months',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK',
    headline: 'Unused IPv4 holdings turned into a balance sheet gain',
    outcome: 'Address blocks reviewed, surplus identified, buyer introduced. Deal completed.',
    timeframe: '6 weeks',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    headline: 'Manufacturing business moved to a better facility',
    outcome: 'Existing invoice finance was underperforming. Better terms sourced and agreed.',
    timeframe: '3 weeks',
  },
]

export default function HomePage() {
  useReveal()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-32 overflow-hidden">
        <HeroVideo />

        <div className="relative max-w-site mx-auto px-6 lg:px-10 w-full pt-36" style={{zIndex:10}}>
          <p className="eyebrow mb-6 opacity-0 animate-fade-in" style={{color:'#ffffff',animationDelay:'0.1s',animationFillMode:'forwards'}}>
            Prosaria Partners
          </p>
          <h1
            className="font-serif text-[clamp(2.8rem,8vw,6.5rem)] leading-none tracking-tight max-w-[16ch] mb-8 opacity-0 animate-fade-up"
            style={{animationDelay:'0.2s',animationFillMode:'forwards',color:'#ffffff',textShadow:'2px 2px 20px rgba(0,0,0,0.8)'}}>
            We help opportunities<br />
            <span className="italic text-blue-400">take shape.</span>
          </h1>
          <p className="font-sans text-body-lg max-w-[42ch] mb-12 opacity-0 animate-fade-up"
            style={{animationDelay:'0.35s',animationFillMode:'forwards',color:'#e2e8f0'}}>
            Independent deal origination across digital infrastructure, working capital and care sector M&A.
          </p>
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{animationDelay:'0.5s',animationFillMode:'forwards'}}>
            <Link href="/work" className="btn-primary">See what we do</Link>
            <Link href="/contact" className="btn-outline">Get in touch</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/8">
            {[
              { v:'3',          l:'Sectors' },
              { v:'London',     l:'Based' },
              { v:'Off-market', l:'How we work' },
              { v:'Direct',     l:'Always' },
            ].map((s, i) => (
              <div key={s.l} className="opacity-0 animate-fade-up"
                style={{animationDelay:`${0.6+i*0.1}s`,animationFillMode:'forwards'}}>
                <p className="font-serif text-display-md leading-none mb-1" style={{color:'#ffffff',textShadow:'0 0 20px rgba(59,130,246,0.35)'}}>{s.v}</p>
                <p className="text-label uppercase tracking-widest" style={{color:'#cbd5e1'}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-[#020810] border-y border-blue-500/8 py-4">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-6 lg:gap-12">
          <a href="tel:02030267906" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-blue-400 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            020 3026 7906
          </a>
          <a href="mailto:hello@prosaria.co.uk" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-blue-400 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] flex-shrink-0" />
            hello@prosaria.co.uk
          </a>
          <span className="text-sm text-[#94a3b8]">66 Paul Street, London EC2A 4NA</span>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-40 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] max-w-[24ch]">
              Three areas. A direct approach. No unnecessary steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{background:'rgba(59,130,246,0.06)'}}>
            {lines.map((line, i) => (
              <div key={line.num}
                className={`bg-[#050d1a] p-10 lg:p-12 flex flex-col reveal reveal-delay-${i+1} group hover:bg-[#070d1c] transition-colors duration-300`}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.8)] transition-shadow duration-300" />
                  <p className="text-label text-blue-400">{line.num}</p>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-5">{line.title}</h3>
                <p className="text-body-sm text-[#94a3b8] leading-relaxed flex-1 mb-8">{line.body}</p>
                <div className="mt-auto pt-6 border-t border-blue-500/8 space-y-3">
                  <Link href={line.href} className="text-label text-[#94a3b8] hover:text-[#94a3b8] transition-colors uppercase tracking-widest block">
                    Learn more
                  </Link>
                  <Link href={line.magnet} className="block w-full text-center btn-primary text-[0.75rem] py-3">
                    {line.magnetLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="light-section py-32 relative overflow-hidden">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/nathan.jpg"
                  alt="Nathan Powell, Prosaria Partners"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050d1a]/85 to-transparent">
                  <p className="font-serif text-base text-white">Nathan Powell</p>
                  <p className="text-label text-blue-400 mt-1">Founder</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="line-accent mb-8 reveal" style={{background:'#1d4ed8'}} />
              <p className="eyebrow mb-5 reveal" style={{color:'#1d4ed8'}}>The business</p>
              <h2 className="font-serif text-display-lg mb-8 reveal reveal-delay-1" style={{color:'#050d1a'}}>
                A small team that works in markets where timing and relationships matter most.
              </h2>
              <div className="space-y-5 reveal reveal-delay-2">
                <p className="text-body-md" style={{color:'#1e3a5f'}}>
                  Prosaria works across digital infrastructure, working capital and care sector M&A. The deals we are close to tend to be off-market and time-sensitive. That suits a lean operation better than a large one.
                </p>
                <p className="text-body-md" style={{color:'#1e3a5f'}}>
                  Nathan Powell founded Prosaria and leads the origination work. The people and businesses we work with deal directly with someone who is close to the market and invested in the outcome.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/about" className="btn-outline-dark">About the team</Link>
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-40 bg-[#020810]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
            <div className="reveal">
              <p className="eyebrow mb-4">Case studies</p>
              <h2 className="font-serif text-display-md text-[#f0f4ff]">
                Deals across all three areas.<br />All anonymised.
              </h2>
            </div>
            <Link href="/case-studies" className="btn-outline reveal">View all</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={cs.headline}
                className={`border border-blue-500/10 bg-[#0a1628] p-8 flex flex-col case-card reveal reveal-delay-${i+1} hover:border-blue-500/20 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="eyebrow text-blue-400">{cs.tag}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#94a3b8]">{cs.region}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4 leading-snug">{cs.headline}</h3>
                <p className="text-body-sm text-[#94a3b8] flex-1 mb-6">{cs.outcome}</p>
                <div className="pt-5 border-t border-blue-500/8 flex justify-between">
                  <span className="text-label text-[#94a3b8]">Timeframe</span>
                  <span className="text-label text-blue-400">{cs.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNETS */}
      <section className="light-section py-40">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-14 reveal">
            <p className="eyebrow mb-4" style={{color:'#1d4ed8'}}>Free tools</p>
            <h2 className="font-serif text-display-lg max-w-[28ch]" style={{color:'#050d1a'}}>
              Get a clear picture before you commit to anything.
            </h2>
            <p className="text-body-md mt-4 max-w-[48ch]" style={{color:'#1e3a5f'}}>
              Three short tools. You get a straight answer immediately. We follow up personally on every submission.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Care exit readiness',
                desc: 'Answer 6 questions. Get an instant readiness score with a clear breakdown of where you stand and what a buyer would focus on.',
                href: '/care-snapshot',
                tag: 'Care M&A',
                value: 'Instant score + breakdown',
              },
              {
                title: 'IPv4 opportunity check',
                desc: 'Answer 5 questions about your network. Find out if you are likely sitting on address blocks with real market value.',
                href: '/digital-audit',
                tag: 'Digital Infrastructure',
                value: 'Instant assessment',
              },
              {
                title: 'Working capital estimate',
                desc: 'Answer 4 questions. Get an immediate estimate of how much cash could be released from your invoices and what it would cost.',
                href: '/capital-assessment',
                tag: 'Working Capital',
                value: 'Instant cash estimate',
              },
            ].map((m, i) => (
              <div key={m.title}
                className={`bg-white border border-blue-100 p-8 flex flex-col reveal reveal-delay-${i+1} hover:border-blue-300 hover:shadow-md transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-label text-blue-700 border border-blue-200 bg-blue-50 px-3 py-1">{m.tag}</span>
                  <span className="text-label text-green-600 font-medium">{m.value}</span>
                </div>
                <h3 className="font-serif text-display-sm mb-4" style={{color:'#050d1a'}}>{m.title}</h3>
                <p className="text-body-sm flex-1 mb-8" style={{color:'#1e3a5f'}}>{m.desc}</p>
                <Link href={m.href} className="btn-primary w-full justify-center">
                  Start free
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#050d1a] border-t border-blue-500/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(29,78,216,0.07)_0%,transparent_70%)]" />
        <div className="relative max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#f0f4ff] max-w-[28ch]">
              Got a deal, an asset or a situation worth a conversation?
            </h2>
            <p className="text-body-md text-[#94a3b8] mt-3">
              <a href="tel:02030267906" className="hover:text-blue-400 transition-colors">020 3026 7906</a>
              <span className="mx-3 text-[#94a3b8]">·</span>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-blue-400 transition-colors">hello@prosaria.co.uk</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-1 flex-shrink-0">
            <Link href="/contact" className="btn-primary">Get in touch</Link>
            <Link href="/work" className="btn-outline">See what we do</Link>
          </div>
        </div>
      </section>
    </>
  )
}
