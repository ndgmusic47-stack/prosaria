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

const studies = [
  {
    tag: 'Care Sector M&A',
    region: 'South East England',
    size: 'Undisclosed',
    headline: 'Owner-managed care group — confidential exit',
    situation: 'A founder who had operated a care group for 18 years was approaching retirement. He had spoken to two regional brokers but was uncomfortable with their approach — both wanted to market the business openly. He wanted to sell quietly, to the right buyer, without staff or residents finding out prematurely.',
    action: 'Nathan introduced the business to a shortlist of three qualified buyers within two weeks. One buyer was identified off-market from Prosaria\'s existing relationships. No public listing. No information memorandum circulated beyond qualified parties.',
    outcome: 'Heads of terms agreed within 11 weeks of first conversation. Full exit completed. Seller retained for a short transition period by mutual agreement.',
    timeframe: '4 months to completion',
    quote: 'I did not want a process. I wanted a result. That is what I got.',
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK',
    size: 'Balance sheet uplift: six figures',
    headline: 'Legacy IPv4 blocks identified and monetised for a telecoms group',
    situation: 'A mid-sized telecoms business had accumulated IPv4 address blocks over a decade of acquisitions. Nobody in the business was actively managing them. They appeared on the balance sheet at nominal value. The finance director had no idea they could be sold or leased.',
    action: 'Prosaria conducted an asset audit of the business\'s RIPE holdings. Identified a significant volume of underutilised address space. Prepared a simple monetisation proposal and introduced a qualified buyer.',
    outcome: 'Surplus IPv4 blocks placed with a network operator. Material balance-sheet uplift realised. Process took six weeks from audit to completion.',
    timeframe: '6 weeks',
    quote: 'We had no idea these were worth anything. Nathan found the value and got it done.',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    size: 'Facility: £400k',
    headline: 'SME manufacturer — invoice finance facility restructured',
    situation: 'A manufacturing business with strong order flow was using an invoice finance facility from a high-street bank. The facility was expensive, the service was poor, and the advance rate did not reflect the quality of their debtor book. They had tried to renegotiate but the bank was not interested.',
    action: 'Nathan reviewed the debtor book and current facility terms. Prepared a clear picture of the business for specialist lenders. Introduced two alternative providers who were actively looking for this profile of client.',
    outcome: 'New facility agreed at a materially better advance rate and lower cost. Monthly saving on fees was significant. Transition took three weeks.',
    timeframe: '3 weeks',
    quote: null,
  },
  {
    tag: 'Care Sector M&A',
    region: 'Midlands',
    size: 'Undisclosed',
    headline: 'Domiciliary care business — buyer introduced pre-market',
    situation: 'A regional care group was looking to expand its domiciliary care footprint in the Midlands. They did not want to wait for businesses to come to market through brokers. They wanted introductions to owners who might be open to a conversation but had not yet committed to a sale.',
    action: 'Prosaria mapped domiciliary care operators in the target geography and conducted direct outreach on behalf of the buyer. Three owners were identified who were open to a confidential conversation. Two proceeded to a structured discussion.',
    outcome: 'One acquisition completed. The other is ongoing. Total timeline from initial mandate to first completion was under six months.',
    timeframe: '6 months',
    quote: null,
  },
  {
    tag: 'Digital Infrastructure',
    region: 'UK & Europe',
    size: 'Contract value: undisclosed',
    headline: 'Multi-site business — connectivity renegotiated via GTT',
    situation: 'A professional services firm with 14 UK offices and three European locations was three months from contract renewal on its WAN. The incumbent provider had quoted a modest reduction. The IT director suspected they were significantly overpaying but lacked the market knowledge to negotiate effectively.',
    action: 'Prosaria benchmarked the current contract against current market pricing. Introduced GTT as an alternative provider. Managed the RFP process and supported the IT director through supplier conversations.',
    outcome: 'New connectivity contract agreed at substantially better terms. Improved SLAs and a modern SD-WAN solution included. Incumbent re-quoted but could not match.',
    timeframe: '8 weeks',
    quote: 'Having someone who actually understands the market made the difference.',
  },
  {
    tag: 'Working Capital',
    region: 'UK',
    size: 'Facility: £250k',
    headline: 'Recruitment business — first invoice finance facility',
    situation: 'A fast-growing recruitment business was funding its entire payroll from its own cash reserves while waiting for client invoices to be paid. It was profitable on paper but perpetually cash-short. The founders had never used invoice finance and did not know where to start.',
    action: 'Nathan explained the options clearly — selective invoice finance versus whole-book facilities. Identified two lenders with specific experience in the recruitment sector. Packaged the introduction with a clear summary of the debtor book.',
    outcome: 'First invoice finance facility agreed within two weeks of initial conversation. Founders could draw against invoices same day. Cash flow problem resolved.',
    timeframe: '2 weeks',
    quote: 'We went from stressed about payroll to comfortable overnight.',
  },
]

const tagColours: Record<string, string> = {
  'Care Sector M&A':        'text-blue-400',
  'Digital Infrastructure': 'text-[#8cb4c9]',
  'Working Capital':        'text-[#9cb88c]',
}

export default function CaseStudiesPage() {
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
          <p className="eyebrow mb-6">Case studies</p>
          <h1 className="font-serif text-display-xl text-[#f0ede8] max-w-[20ch] leading-tight mb-8">
            Anonymised. Outcome-led. Exactly what happened.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[50ch]">
            No names. No embellishment. Just what the situation was, what Prosaria did, and what the result was.
          </p>
        </div>
      </section>

      {/* ── FILTER STRIP ──────────────────────────────────── */}
      <section className="bg-[#0a0a0a] border-b border-white/5 py-4">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-wrap gap-6">
          {['All', 'Care Sector M&A', 'Digital Infrastructure', 'Working Capital'].map((f) => (
            <button
              key={f}
              className="text-label text-[#94a3b8] hover:text-blue-400 transition-colors duration-200 uppercase tracking-widest"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── CASE STUDY CARDS ──────────────────────────────── */}
      <section className="py-section bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studies.map((cs, i) => (
              <div
                key={cs.headline}
                className={`bg-[#0a1628] border border-blue-500/10 p-10 flex flex-col reveal reveal-delay-${(i % 2) + 1}`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`eyebrow ${tagColours[cs.tag] || 'text-blue-400'}`}>{cs.tag}</span>
                  <span className="text-stone-200">·</span>
                  <span className="text-label text-[#475569]">{cs.region}</span>
                  {cs.size && (
                    <>
                      <span className="text-stone-200">·</span>
                      <span className="text-label text-[#475569]">{cs.size}</span>
                    </>
                  )}
                </div>

                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-6 leading-snug">{cs.headline}</h3>

                {/* Three-part breakdown */}
                <div className="space-y-5 flex-1">
                  <div>
                    <p className="text-label text-[#475569] mb-2">Situation</p>
                    <p className="text-body-sm text-[#94a3b8]">{cs.situation}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#475569] mb-2">What Prosaria did</p>
                    <p className="text-body-sm text-[#94a3b8]">{cs.action}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#475569] mb-2">Outcome</p>
                    <p className="text-body-sm text-[#94a3b8]">{cs.outcome}</p>
                  </div>
                </div>

                {/* Quote */}
                {cs.quote && (
                  <blockquote className="mt-6 border-l-2 border-[#c9a96e] pl-5 py-1">
                    <p className="font-serif text-[1.05rem] italic text-[#f0f4ff]">&ldquo;{cs.quote}&rdquo;</p>
                  </blockquote>
                )}

                {/* Footer */}
                <div className="mt-6 pt-5 border-t border-blue-500/10 flex justify-between items-center">
                  <span className="text-label text-[#475569]">Timeframe</span>
                  <span className="text-label text-blue-400 font-medium">{cs.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] py-section-sm">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#f0ede8] max-w-[32ch]">
              Your situation is probably different to every one of these. That is fine. Talk to Nathan.
            </h2>
          </div>
          <Link href="/contact" className="btn-primary reveal reveal-delay-1 flex-shrink-0">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
