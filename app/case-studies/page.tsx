'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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

const examples = [
  {
    tag: 'Care M&A',
    region: 'South East England',
    type: 'Sell side',
    headline: 'Owner approaching retirement, no public process wanted',
    situation: 'A care home owner with a long-established business was thinking about exit. He had spoken to two regional brokers but was not comfortable with the idea of marketing the business openly. He wanted a quiet approach to a small number of credible buyers.',
    whatWeDo: 'We work with owners in exactly this situation. We identify buyers who are genuinely active in the market, make a direct and confidential approach, and manage the process without putting the business on any public platform.',
    status: 'Type of mandate we work on',
  },
  {
    tag: 'Care M&A',
    region: 'Midlands',
    type: 'Buy side',
    headline: 'Care group looking for acquisitions before they reach the market',
    situation: 'A growing care operator wanted to expand into a specific region. They were not interested in businesses already being marketed by brokers. They wanted to identify owners who might be open to a conversation but had not yet committed to a sale process.',
    whatWeDo: 'We map target businesses in a defined geography, make direct outreach to owners and facilitate introductions where there is genuine mutual interest. We do not approach businesses speculatively or without a clear buyer mandate.',
    status: 'Type of mandate we work on',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK and Europe',
    type: 'Buy side',
    headline: 'Network operator with a specific IPv4 requirement',
    situation: 'A network operator needed to acquire a specific volume of IPv4 address space within a defined timeframe. The open market options were limited and they needed an introduction to holders willing to transact directly.',
    whatWeDo: 'We work with specialist partners who are active in the IPv4 secondary market. Where a buyer has a clear requirement, we assess whether there is a relevant opportunity through our network and facilitate introductions where there is a genuine fit.',
    status: 'Type of enquiry we support',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK',
    type: 'Sell side',
    headline: 'Business holding unused IPv4 address space exploring options',
    situation: 'A technology business that had grown through acquisitions held IPv4 address blocks it was not using. The finance team wanted to understand whether there was any commercial value and, if so, how a transaction would work.',
    whatWeDo: 'Through our specialist partner network, we can assess whether there is buyer interest for a specific holding and facilitate introductions where the commercial case is clear. We do not run general audits or speculative outreach.',
    status: 'Type of enquiry we support',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    type: 'Funding',
    headline: 'Recruitment business with strong revenue but consistent cash pressure',
    situation: 'A recruitment business was profitable but regularly stretched on cash. Placing staff and waiting 60 days for client payment while covering weekly payroll created a recurring gap. The founders had not used invoice finance before.',
    whatWeDo: 'We work with a small number of specialist lenders who understand the recruitment sector. We qualify the opportunity first and, where there is a clear fit, make a direct introduction to the right lender.',
    status: 'Type of situation we work with',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    type: 'Refinancing',
    headline: 'Manufacturing business on an invoice finance facility it had outgrown',
    situation: 'A manufacturer had an existing invoice finance facility but the business had grown significantly since it was arranged. The advance rate and cost no longer reflected the quality of the debtor book.',
    whatWeDo: 'We assess whether a better structure exists through our lending partners. Where it does, we make the introduction and support the transition. We are not searching the whole market. We work within a defined partner network.',
    status: 'Type of situation we work with',
  },
]

const tagColours: Record<string, string> = {
  'Care M&A':               'text-blue-400',
  'Digital Infrastructure': 'text-blue-300',
  'Working Capital':        'text-blue-200',
}

export default function CaseStudiesPage() {
  useReveal()
  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">How we work</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[22ch] leading-tight mb-6">
            Examples of the types of situations we get involved in.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[52ch]">
            These are not claimed transactions. They are examples of the mandates, enquiries and situations we work with across our three areas.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {examples.map((ex, i) => (
              <div key={ex.headline}
                className={`border border-blue-500/10 bg-[#0a1628] p-8 lg:p-10 flex flex-col reveal reveal-delay-${(i % 2) + 1} hover:border-blue-500/20 transition-all duration-300`}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`eyebrow ${tagColours[ex.tag] || 'text-blue-400'}`}>{ex.tag}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#94a3b8]">{ex.region}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#475569]">{ex.type}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-5 leading-snug mt-4">{ex.headline}</h3>
                <div className="space-y-5 flex-1">
                  <div>
                    <p className="text-label text-[#475569] uppercase tracking-widest mb-2">The situation</p>
                    <p className="text-body-sm text-[#94a3b8]">{ex.situation}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#475569] uppercase tracking-widest mb-2">Our role</p>
                    <p className="text-body-sm text-[#94a3b8]">{ex.whatWeDo}</p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-blue-500/8">
                  <span className="text-label text-blue-400/60">{ex.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="light-section py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md max-w-[32ch]" style={{color:'#050d1a'}}>
              If your situation is similar to any of these, get in touch.
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
