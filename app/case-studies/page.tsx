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

const observations = [
  {
    tag: 'Care M&A',
    region: 'UK',
    headline: 'Owner managed care businesses are selling quietly',
    body: 'A growing number of care business owners are exploring exit without going to market publicly. The preference is for a direct approach to a small number of qualified buyers. Many have had poor experiences with traditional brokers and are looking for a more discreet route.',
    signal: 'Buyer demand is strong in this segment, particularly from care groups looking to grow through acquisition.',
  },
  {
    tag: 'Care M&A',
    region: 'UK',
    headline: 'Buyers are looking for off-market opportunities',
    body: 'Private equity and trade buyers in the care sector are increasingly focused on sourcing businesses before they are formally marketed. Competition for publicly listed businesses is intense. Buyers who can access direct introductions are willing to move quickly.',
    signal: 'There is genuine appetite from well-funded buyers at various size points across care homes, supported living and domiciliary care.',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK and Europe',
    headline: 'Demand for IPv4 address space remains strong',
    body: 'The exhaustion of available IPv4 addresses continues to drive a secondary market for address space. Buyers include network operators, internet service providers and businesses scaling their digital infrastructure. Prices have remained firm.',
    signal: 'Organisations with IPv4 holdings they are not actively using may find there is commercial value worth exploring.',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK and Europe',
    headline: 'Infrastructure transactions require the right introductions',
    body: 'Digital infrastructure deals, including IPv4 transactions, depend heavily on connecting the right parties. The market is not transparent and most activity happens through established networks and direct relationships.',
    signal: 'Working with partners who have existing relationships in the space significantly improves the chance of finding a genuine commercial fit.',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    headline: 'Many businesses are using the wrong facility or overpaying',
    body: 'Invoice finance is a well-established tool but the market is fragmented. Many businesses are on facilities that were arranged years ago and have not been reviewed. Rates and structures vary significantly between lenders.',
    signal: 'Businesses that have grown or whose debtor profile has improved often find better terms are available through specialist lenders.',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    headline: 'Short-term cash flow is a consistent pressure for growing businesses',
    body: 'Businesses in sectors with long payment terms, including construction, recruitment and professional services, regularly experience cash flow pressure despite being profitable. Invoice finance can bridge the gap between delivering work and receiving payment.',
    signal: 'The barrier for many is not eligibility but awareness of what is available and who the right lender is for their specific situation.',
  },
]

const tagColours: Record<string, string> = {
  'Care M&A': 'text-blue-400',
  'Digital Infrastructure': 'text-blue-300',
  'Working Capital': 'text-blue-200',
}

export default function CaseStudiesPage() {
  useReveal()
  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Market observations</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[22ch] leading-tight mb-6">
            What we are seeing in the markets we work in.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            We are active across care sector M&A, digital infrastructure and working capital. These are observations from that activity.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {observations.map((obs, i) => (
              <div key={obs.headline}
                className={`border border-blue-500/10 bg-[#0a1628] p-8 lg:p-10 flex flex-col reveal reveal-delay-${(i % 2) + 1} hover:border-blue-500/20 transition-all duration-300`}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`eyebrow ${tagColours[obs.tag] || 'text-blue-400'}`}>{obs.tag}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#94a3b8]">{obs.region}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-5 leading-snug">{obs.headline}</h3>
                <p className="text-body-sm text-[#94a3b8] leading-relaxed flex-1 mb-6">{obs.body}</p>
                <div className="pt-5 border-t border-blue-500/8">
                  <p className="text-label text-[#475569] uppercase tracking-widest mb-2">What this means</p>
                  <p className="text-body-sm text-[#60a5fa]">{obs.signal}</p>
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
              If any of this is relevant to your situation, get in touch.
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
