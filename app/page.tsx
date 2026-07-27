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
    imgAlt: 'A warm care home lounge',
    title: 'For Care Business Owners',
    body: 'We help long standing care business owners prepare, organise, and present the company so serious buyers can understand the value of what has been built. Preparation creates choices before timing becomes urgent.',
    href: '/work#owners',
    magnet: '/contact',
    magnetLabel: 'Start a quiet conversation',
  },
  {
    num: '02',
    img: '/img-courtyard.jpg',
    imgAlt: 'A UK care home courtyard garden',
    title: 'For Buyers, Funds & Operators',
    body: 'We support mandate led acquisition origination by identifying and building relationships with care business owners before opportunities become widely marketed. Real owner relationships, not generic market lists.',
    href: '/work#buyers',
    magnet: '/contact',
    magnetLabel: 'Discuss a mandate',
  },
]

const caseStudies = [
  {
    tag: 'Succession',
    region: 'UK',
    headline: 'Many care owners have no clear next generation',
    outcome: 'A large share of long standing care businesses are owner run with no succession plan. The ones that prepare early keep control of how and when they sell.',
    timeframe: 'Active now',
  },
  {
    tag: 'Healthcare M&A',
    region: 'UK',
    headline: 'Care owners are selling quietly',
    outcome: 'A growing number of care business owners want to sell without going public. Buyer demand is strong and most of the best deals never reach the open market.',
    timeframe: 'Active now',
  },
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
            fontSize:'clamp(0.85rem,1.8vw,1rem)',
            fontWeight:700,
            letterSpacing:'0.2em',
            textTransform:'uppercase',
            color:'#A67C4E',
            marginBottom:'0.75rem',
            textShadow:'none',
            animationDelay:'0.1s',
            animationFillMode:'forwards',
          }}>
            Prosaria
          </p>
          <h1 className="opacity-0 animate-fade-up" style={{
            fontFamily:'var(--font-serif)',
            fontSize:'clamp(3.5rem,11vw,8.5rem)',
            lineHeight:'0.88',
            letterSpacing:'-0.04em',
            color:'#3E7A58',
            maxWidth:'16ch',
            marginLeft:'auto',
            marginRight:'auto',
            marginBottom:'1.5rem',
            textShadow:'none',
            fontWeight:500,
            animationDelay:'0.2s',
            animationFillMode:'forwards',
          }}>
            UK Healthcare M&A<br/>
            <em style={{color:'#A67C4E',fontStyle:'italic'}}>Through Direct Owner Relationships.</em>
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
            Prosaria builds direct relationships with long standing care business owners and supports serious buyers, funds, and operators with mandate led acquisition conversations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-fade-up"
            style={{animationDelay:'0.5s',animationFillMode:'forwards'}}>
            <Link href="/contact" className="btn-primary">For care business owners</Link>
            <Link href="/contact" className="btn-outline">For buyers and funds</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-[#1F3D2B]/15">
            {[
              { v:'Care Sector',      l:'UK healthcare M&A only' },
              { v:'Direct Owners',    l:'Real relationships, not lists' },
              { v:'Sale Preparation', l:'Ready before timing is urgent' },
              { v:'Mandate Led',      l:'Serious buyers, defined criteria' },
            ].map((s, i) => (
              <div key={s.l} className="opacity-0 animate-fade-up"
                style={{animationDelay:`${0.6+i*0.1}s`,animationFillMode:'forwards'}}>
                <p className="font-serif text-display-sm leading-tight mb-1" style={{color:'#1F3D2B'}}>{s.v}</p>
                <p className="text-label uppercase tracking-widest" style={{color:'#A67C4E'}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-[#EFE9DE] border-y border-[#2E5E44]/12 py-4">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-6 lg:gap-12">
          <a href="tel:02030267906" className="flex items-center gap-2 text-sm text-[#5C6B5F] hover:text-[#2E5E44] transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2E5E44] flex-shrink-0" />
            020 3026 7906
          </a>
          <a href="mailto:hello@prosaria.co.uk" className="flex items-center gap-2 text-sm text-[#5C6B5F] hover:text-[#2E5E44] transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2E5E44] flex-shrink-0" />
            hello@prosaria.co.uk
          </a>
          <span className="flex items-center gap-2 text-sm text-[#5C6B5F]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2E5E44] flex-shrink-0" />
            66 Paul Street, London EC2A 4NA
          </span>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-40 bg-[#F7F3EC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E5E44]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="font-serif text-display-lg text-[#1F3D2B] max-w-[24ch]">
              One sector. Two sides. Done properly.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{background:'rgba(46,94,68,0.08)'}}>
            {lines.map((line, i) => (
              <div key={line.num}
                className={`bg-[#F7F3EC] p-10 lg:p-12 flex flex-col reveal reveal-delay-${i+1} group hover:bg-[#FBF8F2] transition-colors duration-300`}>
                <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-xl">
                  <Image src={line.img} alt={line.imgAlt} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E5E44] group-hover:shadow-[0_0_10px_rgba(166,124,78,0.6)] transition-shadow duration-300" />
                  <p className="text-label text-[#2E5E44]">{line.num}</p>
                </div>
                <h3 className="font-serif text-display-sm text-[#1F3D2B] mb-5">{line.title}</h3>
                <p className="text-body-sm text-[#5C6B5F] leading-relaxed flex-1 mb-8">{line.body}</p>
                <div className="mt-auto pt-6 border-t border-[#2E5E44]/12 space-y-3">
                  <Link href={line.href} className="text-label text-[#5C6B5F] hover:text-[#5C6B5F] transition-colors uppercase tracking-widest block">
                    Learn more
                  </Link>
                  <Link href={line.magnet} className="block w-full text-center btn-primary text-[0.75rem] py-3">
                    {line.magnetLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="light-section py-32 relative overflow-hidden">
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
                <p className="font-serif text-lg mt-5" style={{color:'#1F3D2B'}}>Nathan Powell</p>
                <p className="text-label mt-1" style={{color:'#2E5E44'}}>Founder, Prosaria</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="line-accent mb-8 reveal" style={{background:'#A67C4E'}} />
              <p className="eyebrow mb-5 reveal" style={{color:'#A67C4E'}}>The business</p>
              <h2 className="font-serif text-display-lg mb-8 reveal reveal-delay-1" style={{color:'#1F3D2B'}}>
                One sector. The people who matter. Deals done quietly.
              </h2>
              <div className="space-y-5 reveal reveal-delay-2">
                <p className="text-body-md" style={{color:'#4A5B4E'}}>
                  Prosaria is intentionally focused on UK healthcare M&A, with a particular focus on care businesses, succession, sale preparation, and direct owner relationships.
                </p>
                <p className="text-body-md" style={{color:'#4A5B4E'}}>
                  The best deals are quiet and move fast. That suits a small, focused team. Nathan Powell runs Prosaria. When you get in touch, you speak to the person doing the work.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/about" className="btn-outline-dark">About the team</Link>
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[42vh] min-h-[300px] overflow-hidden">
        <Image src="/img-walk.jpg" alt="A quiet walk through a UK care community" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(247,243,236,0.25) 0%, rgba(247,243,236,0) 30%, rgba(247,243,236,0) 70%, rgba(247,243,236,0.3) 100%)'}} />
      </section>

      {/* MARKET OBSERVATIONS */}
      <section className="py-40 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
            <div className="reveal">
              <p className="eyebrow mb-4">Market observations</p>
              <h2 className="font-serif text-display-md text-[#1F3D2B]">
                What we are seeing<br />in the market right now.
              </h2>
            </div>
            <Link href="/case-studies" className="btn-outline reveal">See more</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={cs.headline}
                className={`border border-[#2E5E44]/15 bg-[#FFFFFF] p-8 flex flex-col case-card reveal reveal-delay-${i+1} hover:border-[#2E5E44]/25 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="eyebrow text-[#2E5E44]">{cs.tag}</span>
                  <span className="text-[#A67C4E]/50">·</span>
                  <span className="text-label text-[#5C6B5F]">{cs.region}</span>
                </div>
                <h3 className="font-serif text-display-sm text-[#1F3D2B] mb-4 leading-snug">{cs.headline}</h3>
                <p className="text-body-sm text-[#5C6B5F] flex-1 mb-6">{cs.outcome}</p>
                <div className="pt-5 border-t border-[#2E5E44]/12 flex justify-between">
                  <span className="text-label text-[#5C6B5F]">Status</span>
                  <span className="text-label text-[#2E5E44]">{cs.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNETS */}
      <section className="light-section py-40">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-14 reveal text-center">
            <p className="eyebrow mb-4" style={{color:'#A67C4E'}}>Start here</p>
            <h2 className="font-serif text-display-lg max-w-[28ch] mx-auto" style={{color:'#1F3D2B'}}>
              Two ways to start a conversation.
            </h2>
            <p className="text-body-md mt-4 max-w-[48ch] mx-auto" style={{color:'#4A5B4E'}}>
              Every conversation is direct, confidential, and without obligation. Choose the route that fits you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: 'I own or run a care business',
                desc: 'Whether a sale is years away or closer than you planned, preparation creates choices. A quiet, no obligation conversation about where you stand.',
                href: '/contact',
                tag: 'Owners',
                value: 'Discreet',
              },
              {
                title: 'I am a buyer, fund, or operator',
                desc: 'Mandate led origination built on direct owner relationships. Tell us your criteria and we will discuss whether there is a fit.',
                href: '/contact',
                tag: 'Buyers & Funds',
                value: 'Mandate led',
              },
            ].map((m, i) => (
              <div key={m.title}
                className={`bg-white border border-[#E6DFD2] p-8 flex flex-col reveal reveal-delay-${i+1} hover:border-[#C9BFA9] hover:shadow-md transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-label text-[#2E5E44] border border-[#D8CFC0] bg-[#EFF4EF] px-3 py-1">{m.tag}</span>
                  <span className="text-label text-[#A67C4E] font-medium">{m.value}</span>
                </div>
                <h3 className="font-serif text-display-sm mb-4" style={{color:'#1F3D2B'}}>{m.title}</h3>
                <p className="text-body-sm flex-1 mb-8" style={{color:'#4A5B4E'}}>{m.desc}</p>
                <Link href={m.href} className="btn-primary w-full justify-center">
                  Get in touch
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#F7F3EC] border-t border-[#2E5E44]/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(166,124,78,0.08)_0%,transparent_70%)]" />
        <div className="relative max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#1F3D2B] max-w-[28ch]">
              Have something worth talking about?
            </h2>
            <p className="text-body-md text-[#5C6B5F] mt-3">
              <a href="tel:02030267906" className="hover:text-[#2E5E44] transition-colors">020 3026 7906</a>
              <span className="mx-3 text-[#5C6B5F]">·</span>
              <a href="mailto:hello@prosaria.co.uk" className="hover:text-[#2E5E44] transition-colors">hello@prosaria.co.uk</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-1 flex-shrink-0">
            <Link href="/contact" className="btn-primary">For care business owners</Link>
            <Link href="/contact" className="btn-outline">For buyers and funds</Link>
          </div>
        </div>
      </section>
    </>
  )
}
