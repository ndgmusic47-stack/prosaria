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
    tag: 'Succession',
    region: 'UK',
    type: 'Owner side',
    headline: 'Long standing care owner thinking about succession',
    situation: 'An owner who built the business over decades is starting to think about stepping back. There is no urgency yet, but no plan either. The instinct is to wait, which quietly narrows the options.',
    whatWeDo: 'We help owners in this position prepare early. Organising the business, understanding what buyers look for, and building readiness long before any process starts. Preparation creates choices.',
    status: 'Care M&A',
  },
  {
    tag: 'Succession',
    region: 'UK',
    type: 'Owner side',
    headline: 'Husband and wife care business with no clear next generation',
    situation: 'A couple run the business together and the family is not taking it on. They care deeply about staff and residents, and worry about what a sale would mean for both.',
    whatWeDo: 'We work with owners to present the business properly and support quiet conversations with buyers who respect care continuity. No open marketing, no auction pressure.',
    status: 'Care M&A',
  },
  {
    tag: 'Origination',
    region: 'UK',
    type: 'Buyer side',
    headline: 'Buyer or fund seeking mandate fit UK care opportunities',
    situation: 'A buyer with a clear mandate wants opportunities before they are widely marketed. Generic broker lists have not delivered. What is missing is direct owner access.',
    whatWeDo: 'We map the market against the mandate and build direct relationships with owners over time. When timing and fit align, we support serious conversations.',
    status: 'Care M&A',
  },
  {
    tag: 'Preparation',
    region: 'UK',
    type: 'Owner side',
    headline: 'Care business that needs better preparation before buyer conversations',
    situation: 'A good business, but the numbers, management story, and presentation are not ready for buyer scrutiny. As it stands, value would be left on the table.',
    whatWeDo: 'We help organise and package the business so a serious buyer can quickly understand what has been built and why it holds together. Preparation before conversation.',
    status: 'Care M&A',
  },
]

const tagColours: Record<string, string> = {
  'Care M&A':               'text-[#123524]',
  'Succession':             'text-[#1B4D33]',
  'Origination':            'text-[#1B4D33]',
  'Preparation':            'text-[#1B4D33]',
}

export default function CaseStudiesPage() {
  useReveal()
  return (
    <>
      <section className="marble-bg marble-bg-strong pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">What we work on</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[22ch] leading-tight mb-6">
            The types of situations we get involved in.
          </h1>
          <p className="text-body-lg text-[#4A574C] max-w-[52ch]">
            These are the kinds of situations we work with across UK healthcare M&A, on both the owner side and the buyer side.
          </p>
        </div>
      </section>

      <section className="marble-bg py-24">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {examples.map((ex, i) => (
              <div key={ex.headline}
                className={`border border-[#123524]/15 bg-[#FFFFFF] p-8 lg:p-10 flex flex-col reveal reveal-delay-${(i % 2) + 1} hover:border-[#123524]/25 transition-all duration-300`}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`eyebrow ${tagColours[ex.tag] || 'text-[#123524]'}`}>{ex.tag}</span>
                  <span className="text-[#E8650D]/50">·</span>
                  <span className="text-label text-[#4A574C]">{ex.region}</span>
                  <span className="text-[#E8650D]/50">·</span>
                  <span className="text-label text-[#7E8A7E]">{ex.type}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#0F2E1D] mb-5 leading-snug mt-4">{ex.headline}</h3>
                <div className="space-y-5 flex-1">
                  <div>
                    <p className="text-label text-[#7E8A7E] uppercase tracking-widest mb-2">The situation</p>
                    <p className="text-body-sm text-[#4A574C]">{ex.situation}</p>
                  </div>
                  <div>
                    <p className="text-label text-[#7E8A7E] uppercase tracking-widest mb-2">Our role</p>
                    <p className="text-body-sm text-[#4A574C]">{ex.whatWeDo}</p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-[#123524]/12">
                  <span className="eyebrow text-[#123524]/50">{ex.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="light-section marble-bg py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md max-w-[32ch]" style={{color:'#0F2E1D'}}>
              If your situation fits any of these areas, get in touch.
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
