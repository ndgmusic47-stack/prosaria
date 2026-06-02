'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
    id: 'digital',
    num: '01',
    title: 'Digital Infrastructure',
    subtitle: 'Connectivity, network rights and the assets businesses forget they own.',
    intro: `Most businesses treat their connectivity as a utility bill. They pay it, they forget about it, and they never question whether what they are paying for still matches what they actually need.

That gap — between what a business is contracted for and what it actually uses — is where Prosaria operates. We work on both sides: finding better commercial terms for businesses that are overpaying, and identifying and monetising network assets that are sitting unused on balance sheets.`,
    whoFor: [
      'Businesses spending £5k+ per month on WAN, MPLS or connectivity contracts',
      'Companies that acquired or were allocated IPv4 address blocks and have never reviewed them',
      'Organisations with dark fibre, unused spectrum licences or legacy network capacity',
      'IT and procurement teams who want independent advice before a contract renewal',
    ],
    whatWeDo: [
      { step: '01', label: 'Audit', desc: 'We review your current contracts, assets and usage. No cost. Confidential.' },
      { step: '02', label: 'Identify', desc: 'We identify where you are overpaying, underutilising or sitting on unmonetised assets.' },
      { step: '03', label: 'Introduce', desc: 'We introduce the right counterparties — whether that is a better provider, a buyer for your assets, or a specialist partner.' },
      { step: '04', label: 'Execute', desc: 'We stay in the process until it completes. Success-based where possible.' },
    ],
    magnet: '/digital-audit',
    magnetLabel: 'Start with a free infrastructure audit',
    partnerNote: 'Prosaria is an authorised GTT Communications channel partner for connectivity and networking solutions across the UK and Europe.',
  },
  {
    id: 'capital',
    num: '02',
    title: 'Working Capital',
    subtitle: 'Invoice finance and asset-based lending for businesses that are growing faster than their cash flow.',
    intro: `Strong businesses run into cash flow problems. It is not a sign of weakness — it is a sign of growth. When invoices go out on 60 or 90-day terms and the business still has to pay wages, suppliers and overheads in the meantime, the gap becomes painful quickly.

Invoice finance solves that gap. But the market is fragmented, the products are confusing, and most business owners have no idea what rate they should be paying or which lender actually suits their situation. That is where we come in.`,
    whoFor: [
      'SMEs with £500k+ annual turnover invoicing on credit terms of 30 days or longer',
      'Businesses that have been told they do not qualify for a standard bank overdraft',
      'Owner-managed firms that want working capital without giving up equity',
      'Companies already using invoice finance but paying too much or getting poor service',
    ],
    whatWeDo: [
      { step: '01', label: 'Assess', desc: 'We look at your invoice profile, debtor quality and current funding position.' },
      { step: '02', label: 'Match', desc: 'We identify the right lenders for your specific sector, size and debtor mix.' },
      { step: '03', label: 'Package', desc: 'We prepare the introduction properly so lenders see the deal clearly from day one.' },
      { step: '04', label: 'Place', desc: 'We stay involved through to facility agreement. No disappearing after the intro.' },
    ],
    magnet: '/capital-assessment',
    magnetLabel: 'Get a free working capital assessment',
    partnerNote: null,
  },
  {
    id: 'care',
    num: '03',
    title: 'Care Sector M&A',
    subtitle: 'Quiet, confidential deal origination for care home and domiciliary care transactions.',
    intro: `The care sector is one of the most relationship-driven M&A markets in the UK. Owners do not put their businesses on Rightmove. Buyers do not want to compete in open auctions. The best deals happen quietly, between people who know what they are doing.

Prosaria works with both sides. On the sell side, we work with owners who are thinking about what comes next — whether that is in six months or three years. On the buy side, we work with care groups, private equity and operators looking for acquisitions before they reach the open market.`,
    whoFor: [
      'Care home owners considering exit — at any stage of readiness',
      'Domiciliary care business owners looking at succession or sale',
      'Private equity and care groups actively acquiring in the UK',
      'Operators looking for bolt-on acquisitions in specific regions',
    ],
    whatWeDo: [
      { step: '01', label: 'Originate', desc: 'We identify opportunities before they are marketed. Off-market is the starting point, not the exception.' },
      { step: '02', label: 'Qualify', desc: 'We assess the business properly before making introductions. No wasted meetings.' },
      { step: '03', label: 'Introduce', desc: 'We make the right introduction at the right time with the right framing.' },
      { step: '04', label: 'Support', desc: 'We stay involved through heads of terms and support both sides to completion.' },
    ],
    magnet: '/care-snapshot',
    magnetLabel: 'Take the exit readiness snapshot',
    partnerNote: null,
  },
]

export default function WorkPage() {
  useReveal()

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #c9a96e 1px, transparent 1px), linear-gradient(to bottom, #c9a96e 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">What we do</p>
          <h1 className="font-serif text-display-xl text-[#f0ede8] max-w-[20ch] leading-tight mb-8">
            Three markets. One originator. No unnecessary complexity.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            Prosaria operates in digital infrastructure, working capital and care sector M&A.
            Each market is different. The approach is the same — find the deal first, qualify it properly, execute it cleanly.
          </p>
        </div>
      </section>

      {/* ── BUSINESS LINES ────────────────────────────────── */}
      {lines.map((line, idx) => (
        <section
          key={line.id}
          id={line.id}
          className={`py-section ${idx % 2 === 0 ? 'bg-[#050d1a]' : 'bg-[#020810]'}`}
        >
          <div className="max-w-site mx-auto px-6 lg:px-10">

            {/* Section header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-7 reveal">
                <p className="eyebrow mb-4">{line.num} — {line.title}</p>
                <h2 className="font-serif text-display-lg text-[#f0f4ff] mb-6">{line.subtitle}</h2>
                {line.intro.split('\n\n').map((para, i) => (
                  <p key={i} className="text-body-md text-[#94a3b8] mb-4">{para}</p>
                ))}
              </div>

              {/* Who it's for */}
              <div className="lg:col-span-5 reveal reveal-delay-1">
                <div className="bg-[#0a1628] border border-blue-500/10 p-8">
                  <p className="eyebrow mb-6">Who this is for</p>
                  <ul className="space-y-4">
                    {line.whoFor.map((item, i) => (
                      <li key={i} className="flex gap-4 text-body-sm text-[#94a3b8]">
                        <span className="w-1 h-1 rounded-full bg-[#c9a96e] flex-shrink-0 mt-2.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-14 reveal">
              <p className="eyebrow mb-8">How it works</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-blue-500/8">
                {line.whatWeDo.map((s, i) => (
                  <div
                    key={s.step}
                    className={`bg-${idx % 2 === 0 ? 'parchment' : 'stone-50'} p-8 reveal reveal-delay-${i + 1}`}
                    style={{ background: idx % 2 === 0 ? '#fafaf8' : '#f7f6f2' }}
                  >
                    <p className="font-sans text-label text-blue-400 mb-3">{s.step}</p>
                    <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">{s.label}</p>
                    <p className="text-body-sm text-[#94a3b8]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner note */}
            {line.partnerNote && (
              <div className="mb-10 reveal">
                <div className="border-l-2 border-[#c9a96e] pl-6 py-2">
                  <p className="text-body-sm text-[#94a3b8] italic">{line.partnerNote}</p>
                </div>
              </div>
            )}

            {/* Lead magnet CTA */}
            <div className="reveal reveal-delay-2">
              <Link href={line.magnet} className="btn-primary">
                {line.magnetLabel}
              </Link>
            </div>

          </div>

          {/* Section divider */}
          {idx < lines.length - 1 && <div className="divider mt-section" />}
        </section>
      ))}

      {/* ── BOTTOM CTA ────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] py-section-sm">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#f0ede8] max-w-[32ch]">
              Not sure which area applies to you? Talk to Nathan directly.
            </h2>
          </div>
          <Link href="/contact" className="btn-primary reveal reveal-delay-1 flex-shrink-0">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
