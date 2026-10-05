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

const steps = [
  {
    num: '01',
    title: 'Understand the economics',
    body: 'What the business sells, what it buys and at what margin. Which lines turn and which sit. Who the regular customers are and what keeps them coming back. We want the real picture, not a tidied one.',
  },
  {
    num: '02',
    title: 'Assess stock and working capital',
    body: 'In retail, most of the value and most of the risk sits in the stock. We look carefully at what is on the shelves, how it was bought, what it is genuinely worth and how much working capital the business needs to trade properly.',
  },
  {
    num: '03',
    title: 'Agree a transaction that suits the situation',
    body: 'We shape the deal around the business and the owner rather than forcing every opportunity into one model. Timing, handover and what happens to staff are part of that conversation, not an afterthought.',
  },
  {
    num: '04',
    title: 'Support the transition, then improve',
    body: 'We take on the running of the business and keep what works: supplier accounts, regulars, the people who know the product. Then we work on buying, stock turn, listings, fulfilment and the systems underneath.',
  },
]

export default function HowWeWorkPage() {
  useReveal()
  return (
    <>
      <section className="marble-bg marble-bg-strong pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Our approach</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[16ch] leading-tight mb-6">
            How we work
          </h1>
          <p className="text-body-lg text-[#3C4A40] max-w-[56ch]">
            We buy businesses to run them. Understand the economics, look properly at the stock, agree a transaction that suits the situation, support the handover and then improve how the business trades.
          </p>
        </div>
      </section>

      <section className="marble-bg py-24">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className={`bg-white rounded-2xl border border-[#123524]/12 p-8 lg:p-10 reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8650D]" />
                  <p className="text-label text-[#123524]">{s.num}</p>
                </div>
                <h2 className="font-serif text-display-sm text-[#0F2E1D] mb-4">{s.title}</h2>
                <p className="text-body-sm text-[#4A574C] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FBF8F2]">
        <div className="max-w-site mx-auto px-6 lg:px-10 max-w-[64ch]">
          <p className="eyebrow mb-4 reveal">Our operating approach</p>
          <h2 className="font-serif text-display-md text-[#0F2E1D] mb-6 max-w-[26ch] reveal">
            We own the businesses we buy.
          </h2>
          <div className="space-y-5 reveal reveal-delay-1">
            <p className="text-body-md text-[#3C4A40]">
              When we acquire a business we take responsibility for running it. That means the buying decisions, the stock, the pricing, the listings, the fulfilment and the people.
            </p>
            <p className="text-body-md text-[#3C4A40]">
              Our interest in a business continues long after completion, because the returns come from how well it trades rather than from the transaction itself.
            </p>
          </div>
        </div>
      </section>

      <section className="marble-bg py-24">
        <div className="max-w-site mx-auto px-6 lg:px-10 max-w-[64ch]">
          <p className="eyebrow mb-4 reveal">Funding an acquisition</p>
          <h2 className="font-serif text-display-md text-[#0F2E1D] mb-6 max-w-[26ch] reveal">
            Structured deal by deal.
          </h2>
          <div className="space-y-5 reveal reveal-delay-1">
            <p className="text-body-md text-[#3C4A40]">
              Acquisition capital may combine founder and company capital, investment partners and appropriate financing, depending on the business and the terms agreed.
            </p>
            <p className="text-body-md text-[#3C4A40]">
              Prosaria is not a fund and does not hold committed capital allocated to every opportunity. Each transaction is assessed and funded on its own terms, and we will say plainly where we are in that process.
            </p>
          </div>
        </div>
      </section>

      <section className="marble-bg py-20 border-t border-[#123524]/12">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <h2 className="font-serif text-display-md text-[#0F2E1D] max-w-[28ch] reveal">
            Have a business worth discussing?
          </h2>
          <Link href="/contact" className="btn-primary flex-shrink-0 reveal reveal-delay-1">Start a conversation</Link>
        </div>
      </section>
    </>
  )
}
