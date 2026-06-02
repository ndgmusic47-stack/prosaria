'use client'

import { useEffect } from 'react'
import Link from 'next/link'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const studies = [
  {
    tag: 'Care M&A',
    region: 'South East England',
    headline: 'Long-established care business — quiet exit',
    context: 'The owner had run the business for nearly two decades. He was ready to move on but did not want a public sale process. Previous brokers had pushed for open marketing. That was not going to work for him.',
    outcome: 'A shortlist of qualified buyers was assembled through existing relationships. No public listing. No broad circulation of information. Heads of terms were agreed within eleven weeks and the deal completed.',
    result: 'Full exit. Seller transitioned out on agreed terms.',
    timeframe: '4 months',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK',
    headline: 'Unused network address space turned into a balance sheet asset',
    context: 'A business that had grown through acquisitions was sitting on IPv4 address blocks it had never reviewed. They appeared at nominal value on the balance sheet. Nobody in the business knew there was a secondary market for them.',
    outcome: 'An audit of the holdings identified significant underutilised address space. A qualified buyer was found and the transaction was completed.',
    result: 'Material balance sheet uplift. Six weeks from audit to completion.',
    timeframe: '6 weeks',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    headline: 'Manufacturing business — invoice finance facility improved',
    context: 'Strong order book, reliable customers, but an invoice finance facility that had not been reviewed in years. The advance rate was low and the cost was high relative to what was available in the market.',
    outcome: 'The debtor book was reviewed and a clear picture prepared for alternative lenders. Two specialist providers were introduced. A better facility was agreed within three weeks.',
    result: 'Lower cost, better advance rate, same-day drawdown on invoices.',
    timeframe: '3 weeks',
  },
  {
    tag: 'Care M&A',
    region: 'Midlands',
    headline: 'Care group expansion — acquisitions sourced before market',
    context: 'A growing care operator wanted to add domiciliary care capacity in a specific region. They did not want to compete in open auction processes or pay broker premiums on marketed businesses.',
    outcome: 'Target operators in the geography were mapped and direct conversations opened with owners who had not committed to any process. Several were open to a confidential discussion.',
    result: 'One acquisition completed. A second remains in discussion.',
    timeframe: 'Ongoing',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK',
    headline: 'Multi-site business — connectivity costs reduced at renewal',
    context: 'A business with offices across the UK was approaching contract renewal. The incumbent had offered a small reduction. There was a reasonable suspicion that better terms were available.',
    outcome: 'Current contract benchmarked against market pricing. An alternative provider was introduced. The renewal was renegotiated with materially better commercial terms and improved service levels.',
    result: 'Better contract. Incumbent matched in part but could not compete on full terms.',
    timeframe: '8 weeks',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    headline: 'Fast-growing business — first invoice finance facility in place',
    context: 'A business growing quickly was funding operations from its own cash while waiting on client payments. Profitable on paper but cash-constrained in practice. The founders had not used invoice finance before and were not sure where to start.',
    outcome: 'Options were explained clearly. Two lenders with relevant sector experience were introduced. A facility was agreed and operational within two weeks of the first conversation.',
    result: 'Cash flow constraint resolved. Business able to take on larger contracts.',
    timeframe: '2 weeks',
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
          <p className="eyebrow mb-6">Deal observations</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[20ch] leading-tight mb-6">
            A selection of situations we have been involved in.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            All anonymised. Outcomes as they happened. No names, no embellishment.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studies.map((cs, i) => (
              <div key={cs.headline}
                className={`border border-blue-500/10 bg-[#0a1628] p-8 lg:p-10 flex flex-col reveal reveal-delay-${(i % 2) + 1} hover:border-blue-500/20 transition-all duration-300`}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`eyebrow ${tagColours[cs.tag] || 'text-blue-400'}`}>{cs.tag}</span>
                  <span className="text-blue-500/20">·</span>
                  <span className="text-label text-[#475569]">{cs.region}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-6 leading-snug">{cs.headline}</h3>
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-label text-[#334155] mb-2 uppercase tracking-widest">Situation</p>
                    <p className="text-body-sm text-[#94a3b8]">{cs.context}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#334155] mb-2 uppercase tracking-widest">What happened</p>
                    <p className="text-body-sm text-[#94a3b8]">{cs.outcome}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#334155] mb-2 uppercase tracking-widest">Result</p>
                    <p className="text-body-sm text-[#f0f4ff]">{cs.result}</p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-blue-500/8 flex justify-between items-center">
                  <span className="text-label text-[#334155] uppercase tracking-widest">Timeframe</span>
                  <span className="text-label text-blue-400">{cs.timeframe}</span>
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
              Every situation is different. If yours is worth a conversation, we will tell you.
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
