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
    title: 'Understand',
    body: 'We start with the business itself. Its customers, economics, people, suppliers and the owner’s objectives.',
  },
  {
    num: '02',
    title: 'Invest',
    body: 'We structure transactions around the circumstances of the business and the people involved rather than forcing every opportunity into the same model.',
  },
  {
    num: '03',
    title: 'Improve',
    body: 'After investment, we focus on practical improvements to operations, systems, staffing, purchasing, sales and capital allocation.',
  },
  {
    num: '04',
    title: 'Build',
    body: 'We reinvest behind businesses that have the potential to grow, expand into new markets or become platforms for further acquisitions.',
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
            Our approach is straightforward: understand the business, determine what is worth preserving, identify where value can be added and structure the right transaction.
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
          <p className="eyebrow mb-4 reveal">What we do not do</p>
          <h2 className="font-serif text-display-md text-[#0F2E1D] mb-6 max-w-[24ch] reveal">
            Not brokers. Not consultants.
          </h2>
          <p className="text-body-md text-[#3C4A40] reveal reveal-delay-1">
            We are not business brokers and we are not short-term consultants. We invest behind businesses where we believe committed ownership can create long-term value.
          </p>
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
