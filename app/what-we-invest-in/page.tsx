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

const areas = [
  {
    num: '01',
    title: 'Owner-operated businesses',
    body: 'Strong businesses often become constrained by the amount of time, capital or operational capacity available to their owners. We are interested in businesses where new ownership can provide the resources for the next stage.',
  },
  {
    num: '02',
    title: 'Succession',
    body: 'We work with owners considering retirement, a change of direction or a gradual transition away from day-to-day operations.',
  },
  {
    num: '03',
    title: 'Operational improvement',
    body: 'We are particularly interested in businesses with good underlying demand but opportunities to improve systems, staffing, purchasing, sales, technology or execution.',
  },
  {
    num: '04',
    title: 'Customer and community-led businesses',
    body: 'We value businesses that have built strong relationships, repeat customers, communities or trusted positions within their markets.',
  },
  {
    num: '05',
    title: 'Buy-and-build',
    body: 'Where the economics support it, an initial investment can become a platform for further acquisitions and expansion.',
  },
  {
    num: '06',
    title: 'Flexible sector approach',
    body: 'We are not restricted to a single industry. We focus on understanding the underlying economics, customers, competitive position and opportunity.',
  },
]

export default function WhatWeInvestInPage() {
  useReveal()
  return (
    <>
      <section className="marble-bg marble-bg-strong pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Investment criteria</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[18ch] leading-tight mb-6">
            What we invest in
          </h1>
          <p className="text-body-lg text-[#3C4A40] max-w-[54ch]">
            We look for established businesses where there is something worth preserving and a clear opportunity to create more value through better ownership, operations and investment.
          </p>
        </div>
      </section>

      <section className="marble-bg py-24">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((a, i) => (
              <div key={a.num} className={`bg-white rounded-2xl border border-[#123524]/12 p-8 lg:p-10 reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8650D]" />
                  <p className="text-label text-[#123524]">{a.num}</p>
                </div>
                <h2 className="font-serif text-display-sm text-[#0F2E1D] mb-4">{a.title}</h2>
                <p className="text-body-sm text-[#4A574C] leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marble-bg py-20 border-t border-[#123524]/12">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <h2 className="font-serif text-display-md text-[#0F2E1D] max-w-[30ch] reveal">
            If something here sounds like your business, we would like to hear about it.
          </h2>
          <Link href="/contact" className="btn-primary flex-shrink-0 reveal reveal-delay-1">Discuss an opportunity</Link>
        </div>
      </section>
    </>
  )
}
