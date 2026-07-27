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

const lines = [
  {
    id: 'owners',
    num: '01',
    title: 'For Care Business Owners',
    subtitle: 'Sale preparation before timing becomes urgent.',
    intro: `We help long standing care business owners prepare, organise, and present the company so serious buyers can understand the value of what has been built.

Most owners think about succession too late, and end up negotiating from urgency. Preparation creates choices. It does not commit you to selling. It means that when a conversation happens, it happens on your terms, quietly, and with the business shown properly.`,
    whoFor: [
      'Long standing care owners thinking about succession',
      'Husband and wife businesses with no clear next generation',
      'Owners planning to step back over the next one to five years',
      'Owners who want the business presented properly before any buyer conversation',
    ],
    steps: [
      { s:'01', label:'Understand', desc:'We understand your situation, your timing, and what matters to you.' },
      { s:'02', label:'Prepare', desc:'We help organise and package the business so its value is clear.' },
      { s:'03', label:'Support', desc:'When timing is right, we support serious conversations discreetly.' },
    ],
    magnet: '/contact',
    magnetLabel: 'Start a quiet conversation',
    note: null,
  },
  {
    id: 'buyers',
    num: '02',
    title: 'For Buyers, Funds & Operators',
    subtitle: 'Mandate led origination through direct owner relationships.',
    intro: `We support mandate led acquisition origination by identifying and building relationships with care business owners before opportunities become widely marketed.

This is not a market list. We build direct relationships with owners across the UK care sector, understand their situations over time, and connect serious buyers with genuine opportunities that fit a defined mandate.`,
    whoFor: [
      'UK care groups growing through acquisition',
      'Funds and investors with a healthcare mandate',
      'Operators seeking mandate fit UK care opportunities',
      'International buyers entering the UK care market',
    ],
    steps: [
      { s:'01', label:'Mandate', desc:'We understand your criteria, geography, size, and what a fit looks like.' },
      { s:'02', label:'Originate', desc:'We map the market and build direct owner relationships against the mandate.' },
      { s:'03', label:'Connect', desc:'We support serious conversations when the timing and fit are right.' },
    ],
    magnet: '/contact',
    magnetLabel: 'Discuss a mandate',
    note: null,
  },
]

export default function WorkPage() {
  useReveal()
  return (
    <>
      <section className="bg-[#F7F3EC] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">What we do</p>
          <h1 className="font-serif text-display-xl text-[#1F3D2B] max-w-[20ch] leading-tight mb-6">
            One sector. Two sides.
          </h1>
          <p className="text-body-lg text-[#5C6B5F] max-w-[48ch]">
            Prosaria works in UK healthcare M&A. We help care business owners prepare for a sale, and we help serious buyers originate opportunities through direct owner relationships. Understand the situation, map the market, build real relationships, prepare properly, and support serious conversations when timing is right.
          </p>
        </div>
      </section>

      {lines.map((line, idx) => (
        <section
          key={line.id}
          id={line.id}
          className={idx % 2 === 0 ? 'py-32 bg-[#F7F3EC]' : 'light-section py-32'}
        >
          <div className="max-w-site mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-7 reveal">
                <p className="eyebrow mb-4">{line.num}</p>
                <h2 className={`font-serif text-display-lg mb-4 ${idx % 2 === 0 ? 'text-[#1F3D2B]' : ''}`} style={idx % 2 !== 0 ? {color:'#1F3D2B'} : {}}>
                  {line.title}
                </h2>
                <p className={`text-body-lg mb-6 ${idx % 2 === 0 ? 'text-[#5C6B5F]' : ''}`} style={idx % 2 !== 0 ? {color:'#4A5B4E'} : {}}>
                  {line.subtitle}
                </p>
                {line.intro.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-body-md mb-4 ${idx % 2 === 0 ? 'text-[#5C6B5F]' : ''}`} style={idx % 2 !== 0 ? {color:'#4A5B4E'} : {}}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="lg:col-span-5 reveal reveal-delay-1">
                <div className={`p-8 border ${idx % 2 === 0 ? 'bg-[#FFFFFF] border-[#2E5E44]/15' : 'bg-white border-[#E6DFD2]'}`}>
                  <p className="eyebrow mb-5">Who this is for</p>
                  <ul className="space-y-4">
                    {line.whoFor.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="w-1 h-1 rounded-full bg-[#2E5E44] flex-shrink-0 mt-2" />
                        <p className={`text-body-sm ${idx % 2 === 0 ? 'text-[#5C6B5F]' : ''}`} style={idx % 2 !== 0 ? {color:'#4A5B4E'} : {}}>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12 reveal">
              <p className="eyebrow mb-8">How it works</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{background:'rgba(166,124,78,0.3)'}}>
                {line.steps.map((s, i) => (
                  <div key={s.s}
                    className={`p-8 reveal reveal-delay-${i+1} ${idx % 2 === 0 ? 'bg-[#F7F3EC]' : 'bg-[#FBF8F2]'}`}>
                    <p className="text-label text-[#2E5E44] mb-3">{s.s}</p>
                    <p className={`font-serif text-display-sm mb-3 ${idx % 2 === 0 ? 'text-[#1F3D2B]' : ''}`} style={idx % 2 !== 0 ? {color:'#1F3D2B'} : {}}>{s.label}</p>
                    <p className={`text-body-sm ${idx % 2 === 0 ? 'text-[#5C6B5F]' : ''}`} style={idx % 2 !== 0 ? {color:'#4A5B4E'} : {}}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <Link href={line.magnet} className="btn-primary">
                {line.magnetLabel}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-[#F7F3EC] border-t border-[#2E5E44]/12">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#1F3D2B] max-w-[32ch]">
              Not sure where to start? Get in touch and we will give you a straight answer.
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
