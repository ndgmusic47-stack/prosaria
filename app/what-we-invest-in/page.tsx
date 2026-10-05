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
    title: 'Specialist hobby retailers',
    body: 'Established shops and online retailers selling trading cards, anime figures, Gundam and Gunpla kits, collectibles, accessories and related board games. Physical stores, ecommerce, marketplace sellers or a mix of all three.',
  },
  {
    num: '02',
    title: 'Succession',
    body: 'Owners thinking about retirement, a change of direction or a gradual step back from running the shop day to day. We are comfortable with a handover that takes time.',
  },
  {
    num: '03',
    title: 'Established customer communities',
    body: 'Regulars who come back, a mailing list that opens, an events night that fills up, a following built over years. That relationship is usually the hardest part of the business to rebuild and the part we most want to keep.',
  },
  {
    num: '04',
    title: 'Supplier and distributor relationships',
    body: 'Accounts and allocations that took time to earn are worth preserving. We want to understand what a business buys, from whom and on what terms before anything else.',
  },
  {
    num: '05',
    title: 'Ecommerce expansion',
    body: 'Good shops frequently sell far less online than they could. Listings, photography, stock accuracy, fulfilment and marketplace presence are usually where the quickest practical gains sit.',
  },
  {
    num: '06',
    title: 'Operational improvement',
    body: 'Buying discipline, stock turnover, pricing, margin, shrinkage and the systems behind them. Steady demand with untidy operations is the situation we are most interested in.',
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
            We look at established specialist hobby retailers and the businesses that supply or support them. We are interested where there is something worth preserving and a clear opportunity to improve how the business trades.
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
