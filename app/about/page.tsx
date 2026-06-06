'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

const values = [
  {
    num:'01',
    title:'Direct outreach',
    body:'We identify the people and businesses we want to speak to and reach out directly. We do not wait for leads to come in. Most of what we do starts with a conversation we initiated.'
  },
  {
    num:'02',
    title:'Qualifying first',
    body:'Before making any introduction we make sure there is a genuine fit. That means understanding what each party actually needs and whether there is a realistic basis for a conversation.'
  },
  {
    num:'03',
    title:'Relationships over volume',
    body:'We work with a small number of people and partners at any one time. That means every opportunity gets proper attention. We are not running a pipeline of hundreds of names.'
  },
  {
    num:'04',
    title:'Honest about what we can do',
    body:'If something is outside what we work on, or the timing is not right, we say so. We would rather be clear upfront than waste time on both sides.'
  },
]

export default function AboutPage() {
  useReveal()
  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">The team</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[20ch] leading-tight mb-6">
            A small team. A simple approach.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            Prosaria operates lean by choice. The deals we work on benefit from a close, direct relationship not a large firm with many layers between you and the person doing the work.
          </p>
        </div>
      </section>

      {/* NATHAN */}
      <section className="light-section py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div className="reveal">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="/nathan.jpg" alt="Nathan Powell Prosaria Partners" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#050d1a]/85 to-transparent">
                  <p className="font-serif text-base text-white">Nathan Powell</p>
                  <p className="text-label text-blue-400 mt-1">Founder</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {['GTT Authorised Partner','Care Sector M&A','Digital Infrastructure','Working Capital'].map(t=>(
                  <span key={t} className="text-label text-blue-700 border border-blue-200 bg-blue-50 px-3 py-1.5">{t}</span>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div className="reveal">
                <p className="eyebrow mb-4" style={{color:'#1d4ed8'}}>Founder</p>
                <h2 className="font-serif text-display-md mb-6" style={{color:'#050d1a'}}>Nathan Powell</h2>
                <div className="space-y-4">
                  <p className="text-body-md" style={{color:'#1e3a5f'}}>
                    Nathan founded Prosaria and leads the origination work across all three practice areas. His background is in deal sourcing identifying opportunities before they are formally in market, qualifying both sides and managing the process to a conclusion.
                  </p>
                  <p className="text-body-md" style={{color:'#1e3a5f'}}>
                    When you contact Prosaria, you deal with Nathan directly.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-1">
                <p className="eyebrow mb-4" style={{color:'#1d4ed8'}}>Why lean works here</p>
                <div className="space-y-4">
                  <p className="text-body-md" style={{color:'#1e3a5f'}}>
                    Most of what we do is off market and time sensitive. A small team makes faster decisions and stays closer to what matters.
                  </p>
                  <p className="text-body-md" style={{color:'#1e3a5f'}}>
                    We move quickly, speak plainly and have a real interest in getting the deal done.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-2">
                <p className="eyebrow mb-4" style={{color:'#1d4ed8'}}>How we charge</p>
                <p className="text-body-md" style={{color:'#1e3a5f'}}>
                  We charge on success wherever we can. If the deal does not happen, we do not get paid.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
                <a href="https://www.linkedin.com/in/mrpowell22/" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">Nathan on LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-32 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-14 reveal">
            <p className="eyebrow mb-4">How we work</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] max-w-[24ch]">How we actually work.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{background:'rgba(59,130,246,0.06)'}}>
            {values.map((v,i)=>(
              <div key={v.num} className={`bg-[#050d1a] p-10 reveal reveal-delay-${(i%2)+1} hover:bg-[#070d1c] transition-colors`}>
                <p className="text-label text-blue-400 mb-5">{v.num}</p>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4">{v.title}</h3>
                <p className="text-body-sm text-[#94a3b8]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="light-section py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="reveal">
            <p className="eyebrow mb-3" style={{color:'#1d4ed8'}}>Get in touch</p>
            <div className="flex flex-wrap gap-6 text-body-md" style={{color:'#1e3a5f'}}>
              <a href="tel:02030267906" className="hover:text-blue-700 transition-colors font-medium">020 3026 7906</a>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-blue-700 transition-colors">hello@prosaria.co.uk</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 reveal reveal-delay-1">
            <Link href="/contact" className="btn-primary">Work with us</Link>
            <a href="https://www.linkedin.com/company/prosaria-partners" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">Prosaria on LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  )
}
