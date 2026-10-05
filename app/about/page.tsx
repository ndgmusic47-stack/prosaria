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
    title:'Direct approach',
    body:'We identify the businesses we want to understand and approach owners directly. Most of what we do starts with a conversation we initiated rather than a process we were invited into.'
  },
  {
    num:'02',
    title:'Understand before acting',
    body:'We take time to understand the economics, the stock and what the owner actually wants before proposing anything. Forcing a business into a standard model rarely works.'
  },
  {
    num:'03',
    title:'Preserve what works',
    body:'A hobby shop with loyal regulars and hard-won supplier accounts has something that took years to build. We aim to keep that intact and put capital and attention where it genuinely improves trading.'
  },
  {
    num:'04',
    title:'Honest about fit',
    body:'If a business is not right for us, or the timing is not right, we say so early. We would rather be clear than waste time on either side.'
  },
]

export default function AboutPage() {
  useReveal()
  return (
    <>
      <section className="marble-bg marble-bg-strong pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">About Prosaria</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[20ch] leading-tight mb-6">
            Building a retail business.
          </h1>
          <p className="text-body-lg text-[#3C4A40] max-w-[54ch]">
            Prosaria was founded to own, operate and grow specialist hobby retail: trading cards, anime figures, Gundam and Gunpla, collectibles and the games and accessories around them.
          </p>
        </div>
      </section>

      {/* NATHAN */}
      <section className="light-section marble-bg py-32">
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
                {['Sourcing & Buying','Acquisitions','Retail Operations'].map(t=>(
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
                    Nathan founded Prosaria to build a specialist hobby retail business through trading, selective acquisitions and investment.
                  </p>
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    He leads sourcing and buying, supplier development, acquisitions, capital allocation and the day-to-day running of the business.
                  </p>
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    When you contact Prosaria, you deal with Nathan directly.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-1">
                <p className="eyebrow mb-4" style={{color:'#123524'}}>How we operate</p>
                <div className="space-y-4">
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    We take a practical approach: understand the economics, keep what already works and put capital and attention where it measurably improves how the business trades.
                  </p>
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    Prosaria is deliberately lean. We bring in relevant specialists when a particular piece of work calls for it rather than carrying a structure the business does not need.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-2">
                <p className="eyebrow mb-4" style={{color:'#123524'}}>Prosaria and Mum Where&rsquo;s My Cards</p>
                <div className="space-y-4">
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    Prosaria is the corporate side: ownership, acquisitions and capital allocation. Mum Where&rsquo;s My Cards is the retail brand customers buy from.
                  </p>
                  <p className="text-body-md" style={{color:'#3C4A40'}}>
                    The brand is building out its range and supply channels, selling through ecommerce and marketplaces, with shows and events alongside.
                  </p>
                </div>
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
      <section className="marble-bg py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-14 reveal">
            <p className="eyebrow mb-4">Principles</p>
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
      <section className="light-section marble-bg py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="reveal">
            <p className="eyebrow mb-3" style={{color:'#123524'}}>Get in touch</p>
            <div className="flex flex-wrap gap-6 text-body-md" style={{color:'#3C4A40'}}>
              <a href="tel:02030267906" className="hover:text-[#123524] transition-colors font-medium">020 3026 7906</a>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-[#123524] transition-colors">hello@prosaria.co.uk</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 reveal reveal-delay-1">
            <Link href="/contact" className="btn-primary">Start a conversation</Link>
            <a href="https://www.linkedin.com/company/prosaria-partners" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">Prosaria on LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  )
}
