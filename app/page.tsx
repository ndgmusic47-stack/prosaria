'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const lines = [
  {
    num: '01',
    title: 'Digital Infrastructure',
    body: 'We find businesses overpaying for internet and network contracts. We identify unused digital assets sitting on balance sheets. We get better deals done.',
    href: '/work#digital',
    magnet: '/digital-audit',
    magnetLabel: 'Free infrastructure audit',
  },
  {
    num: '02',
    title: 'Working Capital',
    body: 'Your invoices go out. Payment takes 60 or 90 days. Meanwhile you still pay wages and suppliers. Invoice finance solves that gap. We find the right lender and get the right deal in place.',
    href: '/work#capital',
    magnet: '/capital-assessment',
    magnetLabel: 'Free capital assessment',
  },
  {
    num: '03',
    title: 'Care Sector M&A',
    body: 'Care home and domiciliary care owners thinking about selling. Buyers — private equity and care groups — looking to acquire. We work quietly, off-market, on both sides.',
    href: '/work#care',
    magnet: '/care-snapshot',
    magnetLabel: 'Exit readiness check',
  },
]

const stats = [
  { value: '3',    label: 'Specialist sectors' },
  { value: '8+',   label: 'Countries active' },
  { value: '100%', label: 'Founder-led' },
  { value: '0',    label: 'People in the room who do not need to be' },
]

const caseStudies = [
  {
    tag: 'Care M&A',
    region: 'South East England',
    headline: 'Owner-managed care business — quiet exit',
    outcome: 'Buyer and seller introduced. Deal reached agreement within 11 weeks. Full exit completed.',
    timeframe: '4 months',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK',
    headline: 'Network address blocks turned into cash',
    outcome: 'Business had unused internet address space on its books at zero value. We found the buyer. Deal done.',
    timeframe: '6 weeks',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    headline: 'Manufacturer — better finance facility',
    outcome: 'They were overpaying on their existing facility. We found a better lender and got it switched.',
    timeframe: '3 weeks',
  },
]

export default function HomePage() {
  useReveal()

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-32 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Heavy dark overlay so text is readable */}
          <div className="absolute inset-0 bg-[#050d1a]/80" />
          {/* Blue radial glow from centre */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(59,130,246,0.18)_0%,transparent_65%)]" />
          {/* Bottom fade to navy */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050d1a] to-transparent" />
        </div>

        {/* Scanlines retro overlay */}
        <div className="absolute inset-0 scanlines opacity-30" />

        <div className="relative z-10 max-w-site mx-auto px-6 lg:px-10 w-full pt-40">

          <p className="eyebrow mb-8 opacity-0 animate-fade-in" style={{animationDelay:'0.1s',animationFillMode:'forwards'}}>
            Prosaria Partners — Est. 2024
          </p>

          <h1 className="font-serif text-display-2xl text-[#f0f4ff] max-w-[16ch] leading-[1.0] mb-10 opacity-0 animate-fade-up glow-text"
            style={{animationDelay:'0.2s',animationFillMode:'forwards'}}>
            We find deals others{' '}
            <span className="italic text-blue-400">don&apos;t.</span>
          </h1>

          <p className="font-sans text-body-lg text-[#94a3b8] max-w-[48ch] mb-12 opacity-0 animate-fade-up"
            style={{animationDelay:'0.35s',animationFillMode:'forwards'}}>
            Independent deal origination across digital infrastructure, working capital and care sector M&A.
            Lean by design. Direct by nature.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{animationDelay:'0.5s',animationFillMode:'forwards'}}>
            <Link href="/work" className="btn-primary">Explore our work</Link>
            <Link href="/contact" className="btn-outline">Work with us</Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 border-t border-blue-500/10 pt-12">
            {stats.map((s, i) => (
              <div key={s.label} className="opacity-0 animate-fade-up pr-8"
                style={{animationDelay:`${0.6+i*0.1}s`,animationFillMode:'forwards'}}>
                <p className="font-serif text-display-lg text-blue-400 leading-none mb-1 glow-text">{s.value}</p>
                <p className="text-label text-[#475569] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY STRIP ─────────────────────────────── */}
      <section className="bg-[#020810] border-y border-blue-500/10 py-4">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-8 lg:gap-16">
          <p className="eyebrow text-blue-500/40">Authorised partner</p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-[#475569]">GTT Communications</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f]" />
            <span className="text-sm text-[#334155]">South Thames Trading Company Limited</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f]" />
            <span className="text-sm text-[#334155]">Registered England &amp; Wales</span>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────── */}
      <section className="py-32 bg-[#050d1a] relative overflow-hidden">
        {/* Blue glow top right */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] max-w-[28ch]">
              Three markets. One approach. No one in the room who does not need to be.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{background:'rgba(59,130,246,0.08)'}}>
            {lines.map((line, i) => (
              <div key={line.num}
                className={`bg-[#050d1a] p-10 lg:p-12 flex flex-col reveal reveal-delay-${i+1} group hover:bg-[#0a1628] transition-colors duration-300`}>
                {/* Number with glow dot */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-shadow duration-300" />
                  <p className="text-label text-blue-400">{line.num}</p>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-5">{line.title}</h3>
                <p className="text-body-sm text-[#94a3b8] leading-relaxed flex-1 mb-8">{line.body}</p>
                <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-blue-500/10">
                  <Link href={line.href} className="btn-outline-light border-blue-500/20 text-[#94a3b8] hover:text-blue-400 hover:border-blue-400/40 text-[0.72rem] self-start">
                    Learn more
                  </Link>
                  <Link href={line.magnet}
                    className="text-[0.72rem] font-sans font-medium tracking-[0.06em] uppercase text-blue-500 hover:text-blue-300 transition-colors duration-200 flex items-center gap-2">
                    <span className="line-accent w-3" />
                    {line.magnetLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ───────────────────────────────────────── */}
      <section className="py-32 bg-[#020810] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Logo as visual anchor */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative aspect-[4/5] bg-[#0a1628] border border-blue-500/10 glow-box flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="Prosaria Partners" width={280} height={280} className="object-contain opacity-80" />
                {/* Retro scanlines on the image block */}
                <div className="absolute inset-0 scanlines opacity-20" />
                <div className="absolute bottom-0 inset-x-0 p-8">
                  <p className="font-serif text-lg text-[#f0f4ff]">Nathan Powell</p>
                  <p className="eyebrow text-blue-400/60 mt-1">Founder, Prosaria Partners</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="line-accent mb-8 reveal" />
              <p className="eyebrow mb-6 reveal">The originator</p>
              <h2 className="font-serif text-display-lg text-[#f0f4ff] mb-8 reveal reveal-delay-1">
                I built Prosaria around one skill — finding conversations that matter before anyone else does.
              </h2>
              <div className="space-y-5 text-[#94a3b8] text-body-md reveal reveal-delay-2">
                <p>
                  My background is in deal origination. I find opportunities, check both sides are real, and manage the process between them. I am not a sector specialist. I am someone who understands these markets well enough to know when something is worth pursuing — and when it is not.
                </p>
                <p>
                  Prosaria is deliberately small. That means faster decisions, fewer layers, and a direct line to the person running the process. That person is always me.
                </p>
              </div>
              <div className="mt-10 reveal reveal-delay-3">
                <Link href="/about" className="btn-outline">More about Nathan</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────── */}
      <section className="py-32 bg-[#050d1a] relative">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
            <div className="reveal">
              <p className="eyebrow mb-4">Deal examples</p>
              <h2 className="font-serif text-display-md text-[#f0f4ff]">
                Real deals.<br />No client names.
              </h2>
            </div>
            <Link href="/case-studies" className="btn-outline reveal">All case studies</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={cs.headline}
                className={`border border-blue-500/10 bg-[#0a1628] p-8 flex flex-col reveal reveal-delay-${i+1} hover:border-blue-500/25 hover:glow-box transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="eyebrow text-blue-400">{cs.tag}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#475569]">{cs.region}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4 leading-snug">{cs.headline}</h3>
                <p className="text-body-sm text-[#94a3b8] flex-1 mb-6">{cs.outcome}</p>
                <div className="pt-5 border-t border-blue-500/10 flex justify-between items-center">
                  <span className="text-label text-[#475569]">Timeframe</span>
                  <span className="text-label text-blue-400 font-medium">{cs.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-24 bg-[#020810] border-t border-blue-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        <div className="relative max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#f0f4ff] max-w-[28ch]">
              Got a deal, an asset, or a problem that needs the right conversation?
            </h2>
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
