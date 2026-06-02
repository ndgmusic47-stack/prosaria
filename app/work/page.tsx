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
    id: 'digital',
    num: '01',
    title: 'Digital Infrastructure',
    subtitle: 'IPv4 address space and network assets.',
    intro: `Many businesses are holding IPv4 address blocks they acquired years ago and have never reviewed. These blocks have real market value. A secondary market exists and transactions happen regularly through established processes.

We work with businesses to identify what they hold, understand what it might be worth, and connect them with the right counterparty to sell or lease unused address space. We work with a specialist broker in this area and handle the process end to end.`,
    whoFor: [
      'Businesses that have grown through acquisition and may have inherited IP address allocations',
      'Technology and telecoms companies with legacy RIPE or ARIN holdings',
      'Organisations that were allocated address blocks in the early days of the internet',
      'Finance and IT teams who want to understand whether there is value on the balance sheet',
    ],
    steps: [
      { s:'01', label:'Review', desc:'We look at what you hold through the relevant registry. Takes minutes.' },
      { s:'02', label:'Value', desc:'We give you an honest view of what the market looks like for your specific blocks.' },
      { s:'03', label:'Connect', desc:'If there is value to realise, we make the right introduction and support the process.' },
    ],
    magnet: '/digital-audit',
    magnetLabel: 'Start with a free IPv4 check',
    note: null,
  },
  {
    id: 'capital',
    num: '02',
    title: 'Working Capital',
    subtitle: 'Invoice finance for businesses that need cash to move faster than their payment terms allow.',
    intro: `Invoice finance is a straightforward tool that many businesses either do not use or are using badly. If you are invoicing customers on 30, 60 or 90 day terms and covering costs in the meantime from your own cash, there is a gap. Invoice finance closes it.

We help identify the right facility for your business and get it in place. We work with specialist lenders across a range of sectors and can usually move quickly.`,
    whoFor: [
      'Businesses invoicing on 30 day terms or longer with consistent customer payment',
      'Owner-managed firms that want working capital without giving up equity',
      'Businesses already using invoice finance but not happy with the cost or service',
      'Growing businesses that need cash to fulfil larger contracts',
    ],
    steps: [
      { s:'01', label:'Understand', desc:'We look at your invoice profile, customers and current position.' },
      { s:'02', label:'Match', desc:'We identify lenders who are a genuine fit for your sector and size.' },
      { s:'03', label:'Place', desc:'We make the introduction properly and stay involved until the facility is agreed.' },
    ],
    magnet: '/capital-assessment',
    magnetLabel: 'Get a free working capital estimate',
    note: null,
  },
  {
    id: 'care',
    num: '03',
    title: 'Care Sector M&A',
    subtitle: 'Acquisitions and exits across care businesses of all types.',
    intro: `We work with care business owners who are thinking about selling and with buyers looking for acquisitions before they reach the open market. This covers care homes, domiciliary care, supported living, day care and other care businesses that are not technology companies.

The best transactions in this space happen quietly. Owners do not want their businesses publicly marketed. Buyers do not want to compete in open processes. We operate off-market on both sides.`,
    whoFor: [
      'Care business owners considering exit at any stage of readiness',
      'Founders planning succession over the next one to five years',
      'Private equity and care groups actively acquiring in the UK',
      'Operators looking for bolt-on acquisitions in specific regions',
    ],
    steps: [
      { s:'01', label:'Source', desc:'We identify opportunities before they are in market. Off-market is the starting point.' },
      { s:'02', label:'Qualify', desc:'We assess properly before making introductions. No wasted time on either side.' },
      { s:'03', label:'Complete', desc:'We stay close through heads of terms and support both sides to the end.' },
    ],
    magnet: '/care-snapshot',
    magnetLabel: 'Check your exit readiness',
    note: null,
  },
]

export default function WorkPage() {
  useReveal()
  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">What we do</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[20ch] leading-tight mb-6">
            Three areas where we can help.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            Digital infrastructure, working capital and care sector M&A. Each one is different. The approach is the same find the right path and get it done.
          </p>
        </div>
      </section>

      {lines.map((line, idx) => (
        <section
          key={line.id}
          id={line.id}
          className={idx % 2 === 0 ? 'py-32 bg-[#050d1a]' : 'light-section py-32'}
        >
          <div className="max-w-site mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-7 reveal">
                <p className="eyebrow mb-4">{line.num}</p>
                <h2 className={`font-serif text-display-lg mb-4 ${idx % 2 === 0 ? 'text-[#f0f4ff]' : ''}`} style={idx % 2 !== 0 ? {color:'#050d1a'} : {}}>
                  {line.title}
                </h2>
                <p className={`text-body-lg mb-6 ${idx % 2 === 0 ? 'text-[#94a3b8]' : ''}`} style={idx % 2 !== 0 ? {color:'#1e3a5f'} : {}}>
                  {line.subtitle}
                </p>
                {line.intro.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-body-md mb-4 ${idx % 2 === 0 ? 'text-[#94a3b8]' : ''}`} style={idx % 2 !== 0 ? {color:'#1e3a5f'} : {}}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="lg:col-span-5 reveal reveal-delay-1">
                <div className={`p-8 border ${idx % 2 === 0 ? 'bg-[#0a1628] border-blue-500/10' : 'bg-white border-blue-100'}`}>
                  <p className="eyebrow mb-5">Who this is for</p>
                  <ul className="space-y-4">
                    {line.whoFor.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                        <p className={`text-body-sm ${idx % 2 === 0 ? 'text-[#94a3b8]' : ''}`} style={idx % 2 !== 0 ? {color:'#1e3a5f'} : {}}>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12 reveal">
              <p className="eyebrow mb-8">How it works</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{background: idx % 2 === 0 ? 'rgba(59,130,246,0.06)' : 'rgba(59,130,246,0.12)'}}>
                {line.steps.map((s, i) => (
                  <div key={s.s}
                    className={`p-8 reveal reveal-delay-${i+1} ${idx % 2 === 0 ? 'bg-[#050d1a]' : 'bg-[#f5f7fa]'}`}>
                    <p className="text-label text-blue-400 mb-3">{s.s}</p>
                    <p className={`font-serif text-display-sm mb-3 ${idx % 2 === 0 ? 'text-[#f0f4ff]' : ''}`} style={idx % 2 !== 0 ? {color:'#050d1a'} : {}}>{s.label}</p>
                    <p className={`text-body-sm ${idx % 2 === 0 ? 'text-[#94a3b8]' : ''}`} style={idx % 2 !== 0 ? {color:'#1e3a5f'} : {}}>{s.desc}</p>
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

      <section className="py-20 bg-[#050d1a] border-t border-blue-500/8">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#f0f4ff] max-w-[32ch]">
              Not sure where to start? Get in touch and we will point you in the right direction.
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
