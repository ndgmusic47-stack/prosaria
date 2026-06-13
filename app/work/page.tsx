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
    id: 'staffing',
    num: '01',
    title: 'Healthcare Staffing Funding',
    subtitle: 'Cash flow funding for US healthcare staffing agencies.',
    intro: `Staffing agencies pay their workers every week. Their clients take 30, 45 or 60 days to pay. That means the agency is funding its clients from its own pocket, and it limits how much work it can take on.

Factoring fixes this. It turns unpaid invoices into cash straight away, so payroll is never the reason to say no to a contract. We work with funding partners who focus on staffing, with facilities up to $15m. Once we understand your situation, we handle the introduction and stay with you through to funding.`,
    whoFor: [
      'US healthcare staffing agencies paying staff weekly or every two weeks',
      'Agencies whose clients pay on 30 to 60 day terms',
      'Agencies turning down work because of cash flow',
      'Agencies already factoring but unhappy with their rate or service',
    ],
    steps: [
      { s:'01', label:'Check', desc:'We learn about your agency and check the fit with our funding partners.' },
      { s:'02', label:'Introduce', desc:'Where there is a fit, we put you in front of the right funder.' },
      { s:'03', label:'Support', desc:'We stay involved and help move things through to funding.' },
    ],
    magnet: '/capital-assessment',
    magnetLabel: 'Take the two minute check',
    note: null,
  },
  {
    id: 'care',
    num: '02',
    title: 'Healthcare M&A',
    subtitle: 'Buying and selling UK care businesses, handled quietly.',
    intro: `We help care business owners who want to sell, and buyers who want to find businesses before they hit the open market. This covers care homes, home care, supported living, day care and more.

The best deals in this sector happen quietly. Owners do not want staff finding out before a deal is done. Buyers do not want to fight in open auctions. We work off market on both sides.`,
    whoFor: [
      'Care business owners thinking about selling, at any stage',
      'Owners planning to step back over the next one to five years',
      'Care groups and investors looking to buy in the UK',
      'Operators looking for the right business to add on',
    ],
    steps: [
      { s:'01', label:'Find', desc:'We find opportunities before they reach the open market.' },
      { s:'02', label:'Check', desc:'We check the fit properly before any introduction. No wasted time.' },
      { s:'03', label:'Complete', desc:'We stay close through the deal and support both sides to the end.' },
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
            Two things. One sector.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            We work in healthcare. We fund US staffing agencies, and we help people buy and sell care businesses in the UK. Each one is different, but the approach is the same. Find the right path and get it done.
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
