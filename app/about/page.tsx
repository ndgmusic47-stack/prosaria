'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const values = [
  { num:'01', title:'Direct by default', body:'No account managers. No layers. You deal with Nathan. That is the whole model.' },
  { num:'02', title:'Origination first', body:'We find the deal before it exists. Outbound, research and relationships — not waiting for inbounds.' },
  { num:'03', title:'Lean on purpose', body:'Small means fast. Fast means deals get done while larger firms are still arranging the introductory call.' },
  { num:'04', title:'Honest about fit', body:'If it is not the right deal or the right time, Nathan will say so. No pipeline inflation. No wasted months.' },
]

export default function AboutPage() {
  useReveal()
  return (
    <>
      {/* HERO */}
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">The founder</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[18ch] leading-tight mb-6">Nathan Powell</h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[44ch]">Founder of Prosaria Partners. Deal originator. The person you actually speak to.</p>
        </div>
      </section>

      {/* MAIN BIO */}
      <section className="light-section py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Photo */}
            <div className="reveal">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="/nathan.jpg" alt="Nathan Powell, Founder of Prosaria Partners" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#050d1a]/80 to-transparent">
                  <p className="font-serif text-lg text-white">Nathan Powell</p>
                  <p className="text-label text-blue-400 mt-1">Founder, Prosaria Partners</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {['GTT Authorised Partner','Care Sector M&A','Digital Infrastructure','Working Capital'].map(t=>(
                  <span key={t} className="text-label text-blue-700 border border-blue-200 bg-blue-50 px-3 py-1.5">{t}</span>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="space-y-10">
              {[
                { label:'Background', paras:[
                  'I built Prosaria around one thing I know how to do well — finding conversations that matter before anyone else does. Not waiting for mandates to land. Going out and finding them.',
                  'My background is in origination and deal sourcing across the care sector, digital infrastructure and working capital markets. I am not a sector specialist. I am someone who understands these markets well enough to know what a good deal looks like and how to get both sides to the table.',
                ]},
                { label:'Why Prosaria', paras:[
                  'Most intermediaries are too big to move fast and too cautious to say anything useful. Prosaria exists because there is a real gap in the middle market — the £1m to £20m deal, the owner-managed business, the growing company with a real but non-standard need.',
                  'That is where I operate. Small enough to be direct. Experienced enough to be useful. Independent enough to tell you the truth.',
                ]},
                { label:'How I work', paras:[
                  'I take on a small number of live situations at any time. When you are working with Prosaria you have my full attention. I do not hand you to a junior. I stay in the deal until it is done.',
                  'Fees are success-based where possible. I back myself to deliver.',
                ]},
              ].map((section, i) => (
                <div key={section.label} className={`reveal reveal-delay-${i+1}`}>
                  <p className="eyebrow mb-4">{section.label}</p>
                  <div className="space-y-4">
                    {section.paras.map((p,j) => <p key={j} style={{color:'#1e3a5f'}} className="text-body-md">{p}</p>)}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
                <a href="https://www.linkedin.com/in/mrpowell22/" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-32 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-14 reveal">
            <p className="eyebrow mb-4">The approach</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] max-w-[24ch]">Four things that do not change.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{background:'rgba(59,130,246,0.06)'}}>
            {values.map((v,i)=>(
              <div key={v.num} className={`bg-[#050d1a] p-10 reveal reveal-delay-${(i%2)+1} hover:bg-[#080f1e] transition-colors`}>
                <p className="text-label text-blue-400 mb-5">{v.num}</p>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4">{v.title}</h3>
                <p className="text-body-sm text-[#94a3b8]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="light-section py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="reveal">
            <p className="eyebrow mb-3">Talk directly to Nathan</p>
            <div className="flex flex-wrap gap-6 text-body-md" style={{color:'#1e3a5f'}}>
              <a href="tel:02030267906" className="hover:text-blue-600 transition-colors font-medium">020 3026 7906</a>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-blue-600 transition-colors">hello@prosaria.co.uk</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 reveal reveal-delay-1">
            <Link href="/contact" className="btn-primary">Work with Nathan</Link>
            <a href="https://www.linkedin.com/company/prosaria-partners" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">Prosaria on LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  )
}
