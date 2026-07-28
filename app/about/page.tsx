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
      <section className="bg-[#F7F3EC] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">The team</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[20ch] leading-tight mb-6">
            A small team. A simple approach.
          </h1>
          <p className="text-body-lg text-[#4A574C] max-w-[48ch]">
            Prosaria operates lean by choice. The deals we work on benefit from a close, direct relationship not a large firm with many layers between you and the person doing the work.
          </p>
        </div>
      </section>

      {/* NATHAN */}
      <section className="light-section py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div className="reveal">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border border-[#D8CFC0] shadow-sm">
                  <Image src="/nathan.jpg" alt="Nathan Powell Prosaria" fill className="object-cover" sizes="208px" />
                </div>
                <p className="font-serif text-lg mt-5" style={{color:'#0F2E1D'}}>Nathan Powell</p>
                <p className="text-label mt-1" style={{color:'#123524'}}>Founder, Prosaria</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                {['UK Healthcare M&A','Care Businesses','Direct Owner Relationships'].map(t=>(
                  <span key={t} className="text-label text-[#123524] border border-[#D8CFC0] bg-[#EFF4EF] px-3 py-1.5">{t}</span>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div className="reveal">
                <p className="eyebrow mb-4" style={{color:'#123524'}}>Founder</p>
                <h2 className="font-serif text-display-md mb-6" style={{color:'#0F2E1D'}}>Nathan Powell</h2>
                <div className="space-y-4">
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    Nathan founded Prosaria and leads the work across both areas. His background is in finding deals before they reach the open market, checking both sides are a genuine fit, and seeing the process through to the end.
                  </p>
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    When you contact Prosaria, you deal with Nathan directly.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-1">
                <p className="eyebrow mb-4" style={{color:'#123524'}}>Why lean works here</p>
                <div className="space-y-4">
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    Most of what we do is off market and time sensitive. A small team makes faster decisions and stays closer to what matters.
                  </p>
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    We move quickly, speak plainly and have a real interest in getting the deal done.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-2">
                <p className="eyebrow mb-4" style={{color:'#123524'}}>How we charge</p>
                <p className="text-body-md" style={{color:'#3C4A40'}}>
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
      <section className="py-32 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-14 reveal">
            <p className="eyebrow mb-4">How we work</p>
            <h2 className="font-serif text-display-lg text-[#0F2E1D] max-w-[24ch]">How we actually work.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{background:'rgba(18,53,36,0.08)'}}>
            {values.map((v,i)=>(
              <div key={v.num} className={`bg-[#F7F3EC] p-10 reveal reveal-delay-${(i%2)+1} hover:bg-[#FBF8F2] transition-colors`}>
                <p className="text-label text-[#123524] mb-5">{v.num}</p>
                <h3 className="font-serif text-display-sm text-[#0F2E1D] mb-4">{v.title}</h3>
                <p className="text-body-sm text-[#4A574C]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="light-section py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="reveal">
            <p className="eyebrow mb-3" style={{color:'#123524'}}>Get in touch</p>
            <div className="flex flex-wrap gap-6 text-body-md" style={{color:'#3C4A40'}}>
              <a href="tel:02030267906" className="hover:text-[#123524] transition-colors font-medium">020 3026 7906</a>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-[#123524] transition-colors">hello@prosaria.co.uk</a>
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
