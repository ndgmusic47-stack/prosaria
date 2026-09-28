'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeroVideo from '@/components/HeroVideo'

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

const lines = [
  {
    num: '01',
    img: '/img-lounge.jpg',
    imgAlt: 'An established business at work',
    title: 'Invest',
    body: 'We acquire and invest in established businesses with strong underlying economics and clear opportunities for improvement.',
    href: '/what-we-invest-in',
    magnet: '/contact',
    magnetLabel: 'Discuss a business',
  },
  {
    num: '02',
    img: '/img-courtyard.jpg',
    imgAlt: 'Operational detail inside a working business',
    title: 'Improve',
    body: 'We focus on the things that materially change performance. Operations, people, systems, purchasing, sales, capital allocation and execution.',
    href: '/how-we-work',
    magnet: '/how-we-work',
    magnetLabel: 'How we invest',
  },
]

const buildLine = {
  title: 'Build',
  body: 'Our objective is not simply to acquire businesses. We want to build productive, durable companies that create lasting value for customers, employees and owners.',
}

const criteria = [
  'Established revenue and customer demand',
  'Positive underlying cashflow or a clear route to it',
  'Strong customer relationships or communities',
  'Operational improvement opportunities',
  'Owners considering succession or a change of direction',
  'Potential for organic growth or further acquisitions',
]


export default function HomePage() {
  useReveal()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-32 overflow-hidden">
        <HeroVideo />

        <div className="relative max-w-site mx-auto px-6 lg:px-10 w-full pt-36 text-center" style={{zIndex:10}}>
          <p className="opacity-0 animate-fade-up" style={{
            fontFamily:'var(--font-sans)',
            fontSize:'clamp(1rem,2.2vw,1.3rem)',
            fontWeight:800,
            letterSpacing:'0.28em',
            textTransform:'uppercase',
            color:'#E8650D',
            marginBottom:'0.75rem',
            textShadow:'none',
            animationDelay:'0.1s',
            animationFillMode:'forwards',
          }}>
            Prosaria
          </p>
          <h1 className="opacity-0 animate-fade-up" style={{
            fontFamily:'var(--font-serif)',
            fontSize:'clamp(2.2rem,6.5vw,5.2rem)',
            lineHeight:'0.95',
            letterSpacing:'-0.03em',
            color:'#1B4D33',
            maxWidth:'20ch',
            marginLeft:'auto',
            marginRight:'auto',
            marginBottom:'1.5rem',
            textShadow:'none',
            fontWeight:500,
            animationDelay:'0.2s',
            animationFillMode:'forwards',
          }}>
            We invest in businesses
            <em className="block" style={{color:'#E8650D',fontStyle:'italic',fontSize:'0.56em',marginTop:'0.3em',lineHeight:'1.15'}}>
              and help them become better businesses.
            </em>
          </h1>
          <p className="opacity-0 animate-fade-up" style={{
            fontFamily:'var(--font-sans)',
            fontSize:'1.15rem',
            lineHeight:'1.65',
            color:'#2B2B26',
            maxWidth:'46ch',
            marginLeft:'auto',
            marginRight:'auto',
            marginBottom:'3rem',
            textShadow:'none',
            animationDelay:'0.35s',
            animationFillMode:'forwards',
          }}>
            Prosaria is an independent investment company focused on acquiring and backing established businesses where better operations, patient capital and focused ownership can create long-term value.
          </p>
          <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-fade-up"
            style={{animationDelay:'0.5s',animationFillMode:'forwards'}}>
            <Link href="/contact" className="btn-primary">Discuss a business</Link>
            <Link href="/how-we-work" className="btn-outline">How we invest</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20 pt-10 border-t border-[#0F2E1D]/15">
            {[
              { v:'Established',   l:'Real revenue, real customers' },
              { v:'Operational',   l:'Improving how it actually works' },
              { v:'Long Term',     l:'Patient capital, committed ownership' },
              { v:'Direct',        l:'We approach owners ourselves' },
            ].map((s, i) => (
              <div key={s.l} className="opacity-0 animate-fade-up"
                style={{animationDelay:`${0.6+i*0.1}s`,animationFillMode:'forwards'}}>
                <p className="font-serif text-display-sm leading-tight mb-1" style={{color:'#0F2E1D'}}>{s.v}</p>
                <p className="text-label uppercase tracking-widest" style={{color:'#E8650D'}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-[#EFE9DE] border-y border-[#123524]/12 py-4">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-6 lg:gap-12">
          <a href="tel:02030267906" className="flex items-center gap-2 text-sm text-[#4A574C] hover:text-[#123524] transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#123524] flex-shrink-0" />
            020 3026 7906
          </a>
          <a href="mailto:hello@prosaria.co.uk" className="flex items-center gap-2 text-sm text-[#4A574C] hover:text-[#123524] transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#123524] flex-shrink-0" />
            hello@prosaria.co.uk
          </a>
          <span className="flex items-center gap-2 text-sm text-[#4A574C]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#123524] flex-shrink-0" />
            66 Paul Street, London EC2A 4NA
          </span>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-40 bg-[#F7F3EC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#123524]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">Our approach</p>
            <h2 className="font-serif text-display-lg text-[#0F2E1D] max-w-[24ch]">
              Invest. Improve. Build.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{background:'rgba(18,53,36,0.08)'}}>
            {lines.map((line, i) => (
              <div key={line.num}
                className={`bg-[#F7F3EC] p-10 lg:p-12 flex flex-col reveal reveal-delay-${i+1} group hover:bg-[#FBF8F2] transition-colors duration-300`}>
                <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-xl">
                  <Image src={line.img} alt={line.imgAlt} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123524] group-hover:shadow-[0_0_10px_rgba(232,101,13,0.6)] transition-shadow duration-300" />
                  <p className="text-label text-[#123524]">{line.num}</p>
                </div>
                <h3 className="font-serif text-display-sm text-[#0F2E1D] mb-5">{line.title}</h3>
                <p className="text-body-sm text-[#4A574C] leading-relaxed flex-1 mb-8">{line.body}</p>
                <div className="mt-auto pt-6 border-t border-[#123524]/12 space-y-3">
                  <Link href={line.href} className="text-label text-[#4A574C] hover:text-[#4A574C] transition-colors uppercase tracking-widest block">
                    Learn more
                  </Link>
                  <Link href={line.magnet} className="block w-full text-center btn-primary text-[0.75rem] py-3">
                    {line.magnetLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#FBF8F2] border border-[#123524]/12 rounded-2xl p-10 lg:p-12 reveal reveal-delay-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#123524]" />
              <p className="text-label text-[#123524]">03</p>
            </div>
            <h3 className="font-serif text-display-sm text-[#0F2E1D] mb-5">{buildLine.title}</h3>
            <p className="text-body-md text-[#4A574C] leading-relaxed max-w-[62ch]">{buildLine.body}</p>
          </div>
        </div>
      </section>

      {/* WHAT WE LOOK FOR */}
      <section className="py-32 bg-[#FBF8F2]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-12 reveal">
            <p className="eyebrow mb-4">What we look for</p>
            <h2 className="font-serif text-display-lg text-[#0F2E1D] max-w-[26ch] mb-6">
              Flexible on sector. Disciplined on fundamentals.
            </h2>
            <p className="text-body-md text-[#4A574C] max-w-[52ch]">
              We are flexible on sector where we understand the opportunity and believe we can add value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {criteria.map((item, i) => (
              <div key={item} className={`flex gap-4 items-start bg-white rounded-xl border border-[#123524]/12 px-6 py-5 reveal reveal-delay-${(i % 2) + 1}`}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8650D] flex-shrink-0" />
                <p className="text-body-sm text-[#3C4A40]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A DIFFERENT KIND OF BUYER */}
      <section className="marble-bg py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10 max-w-[70ch]">
          <p className="eyebrow mb-4 reveal">A different kind of buyer</p>
          <h2 className="font-serif text-display-lg text-[#0F2E1D] mb-8 max-w-[24ch] reveal">
            Built by owners. Understood as such.
          </h2>
          <div className="space-y-5 reveal reveal-delay-1">
            <p className="text-body-md text-[#3C4A40]">
              Many good businesses are built by owners who have spent years developing their customers, suppliers and reputation.
            </p>
            <p className="text-body-md text-[#3C4A40]">
              We approach those situations directly and practically.
            </p>
            <p className="text-body-md text-[#3C4A40]">
              Where there is a fit, we aim to understand what the owner wants, structure a sensible transaction and preserve what works while improving what does not.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="light-section marble-bg py-32 relative overflow-hidden">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="flex flex-col items-center text-center py-6">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border border-[#D8CFC0] shadow-sm">
                  <Image
                    src="/nathan.jpg"
                    alt="Nathan Powell, Prosaria"
                    fill
                    className="object-cover"
                    sizes="224px"
                  />
                </div>
                <p className="font-serif text-lg mt-5" style={{color:'#0F2E1D'}}>Nathan Powell</p>
                <p className="text-label mt-1" style={{color:'#123524'}}>Founder, Prosaria</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="line-accent mb-8 reveal" style={{background:'#E8650D'}} />
              <p className="eyebrow mb-5 reveal" style={{color:'#E8650D'}}>The business</p>
              <h2 className="font-serif text-display-lg mb-8 reveal reveal-delay-1" style={{color:'#0F2E1D'}}>
                Long-term thinking. Practical execution.
              </h2>
              <div className="space-y-5 reveal reveal-delay-2">
                <p className="text-body-md" style={{color:'#3C4A40'}}>
                  We believe capital is most useful when combined with good operators, disciplined execution and a willingness to improve the details of how a business actually works.
                </p>
                <p className="text-body-md" style={{color:'#3C4A40'}}>
                  That is how we approach every investment. Nathan Powell runs Prosaria. When you get in touch, you speak to the person doing the work.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/about" className="btn-outline-dark">About Prosaria</Link>
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[42vh] min-h-[300px] overflow-hidden">
        <Image src="/img-walk.jpg" alt="An established business environment" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(247,243,236,0.25) 0%, rgba(247,243,236,0) 30%, rgba(247,243,236,0) 70%, rgba(247,243,236,0.3) 100%)'}} />
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#F7F3EC] border-t border-[#123524]/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,101,13,0.08)_0%,transparent_70%)]" />
        <div className="relative max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#0F2E1D] max-w-[28ch] mb-3">
              Have a business worth discussing?
            </h2>
            <p className="text-body-md text-[#3C4A40] max-w-[48ch] mb-4">
              Whether you are considering selling, looking for a long-term partner or believe there is an opportunity we should understand, speak with us directly.
            </p>
            <p className="text-body-md text-[#4A574C]">
              <a href="tel:02030267906" className="hover:text-[#123524] transition-colors">020 3026 7906</a>
              <span className="mx-3 text-[#4A574C]">·</span>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-[#123524] transition-colors">hello@prosaria.co.uk</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-1 flex-shrink-0">
            <Link href="/contact" className="btn-primary">Start a conversation</Link>
          </div>
        </div>
      </section>
    </>
  )
}
