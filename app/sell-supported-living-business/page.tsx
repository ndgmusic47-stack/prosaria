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

const reasons = [
  'Succession, and what happens to the business next',
  'Retirement, or stepping back from day to day involvement',
  'Taking capital out of the business after years of building it',
  'Finding a larger partner with more resources behind them',
  'Understanding whether the business would interest serious buyers',
]

const buyerFactors = [
  { t: 'Revenue and profitability', d: 'The level of earnings, and how consistent and sustainable they look over time.' },
  { t: 'Regulatory position', d: 'Where applicable, CQC registration and inspection history, and how the service is regarded.' },
  { t: 'Commissioner relationships', d: 'The strength and length of local authority and other commissioner relationships.' },
  { t: 'Service user concentration', d: 'Whether income is spread sensibly, or dependent on a small number of placements.' },
  { t: 'Fee levels and funding mix', d: 'How fees are set, how they have moved, and where the funding comes from.' },
  { t: 'Staffing and management depth', d: 'Whether there is a management team, and how stable the staffing position is.' },
  { t: 'Dependence on the founder', d: 'How much of the business sits with the owner personally, and what happens when they step back.' },
  { t: 'Geography', d: 'Where the services are, and how that fits a buyer’s existing footprint or plans.' },
  { t: 'Property and tenancy arrangements', d: 'Freehold, leasehold, landlord relationships and the terms attached to them.' },
  { t: 'Growth potential', d: 'Whether there is room to add capacity, services or locations.' },
  { t: 'Specialist capabilities', d: 'Areas such as learning disabilities, autism, mental health, complex care and acquired brain injury or neurological support.' },
]

const prepareItems = [
  'Accounts, and how clearly they tell the story of the business',
  'Contracts and commissioner arrangements',
  'Management information a buyer would expect to see',
  'Staffing structure, rotas and dependency on agency',
  'Regulatory position and any open actions',
  'Property, leases and tenancy arrangements',
  'Concentration risks across service users, commissioners or sites',
  'The owner’s own role, and how the business runs without them',
]

const discreetSteps = [
  'Understand the business and what the owner actually wants',
  'Identify the types of buyer who may genuinely be relevant',
  'Approach the market carefully rather than broadcasting it',
  'Protect confidentiality throughout',
  'Qualify whether interest is real before it goes further',
  'Progress only the conversations that deserve it',
]

const businessTypes = [
  'Learning disability supported living',
  'Autism services',
  'Mental health supported living',
  'Complex care',
  'ABI and neurological services',
  'Multi site supported living operators',
  'Specialist community based care businesses',
]

const steps = [
  { n: '01', t: 'Confidential conversation', d: 'We understand the business, what you want from any move, and the likely timing. Nothing goes further without your say so.' },
  { n: '02', t: 'Readiness and financial review', d: 'We look at the business the way a serious buyer would, and identify what needs organising or clarifying. Where appropriate, financial information is reviewed with senior care sector CFO input.' },
  { n: '03', t: 'Buyer strategy', d: 'We work out which types of buyer may be appropriate, which are not, and how any approach should be handled.' },
  { n: '04', t: 'Progress the opportunity', d: 'Depending on where the business stands, that means further preparation, financial review, or confidential outreach to selected buyers.' },
]

const faqs = [
  { q: 'How do I know if my supported living business is ready to sell?',
    a: 'Readiness is less about a single moment and more about whether the business can be clearly understood by someone from the outside. That usually means clean accounts, clear contracts, a stable staffing position, and a business that does not depend entirely on the owner. If those things are not in place yet, that is useful to know early rather than midway through a buyer conversation.' },
  { q: 'How is a supported living business valued?',
    a: 'Buyers generally look at sustainable earnings alongside the wider picture: the regulatory position, commissioner relationships, fee levels, staffing, property arrangements and how much of the business rests on the owner. Every business is different, and so is every buyer, so no single factor determines the outcome. We are not valuers, and any formal valuation would come from an appropriately qualified adviser.' },
  { q: 'Do I need to tell my staff that I am considering selling?',
    a: 'Not at the point of an early conversation. Most owners we speak to are thinking privately and are not ready to say anything internally. Timing of any wider communication is something to plan deliberately rather than react to.' },
  { q: 'Can the sale process remain confidential?',
    a: 'Confidentiality is central to how we work. Rather than advertising a business openly, the approach is to speak with a small number of buyers who are genuinely relevant, at a pace the owner is comfortable with. No approach happens without the owner agreeing to it first.' },
  { q: 'What information will a buyer want to see?',
    a: 'Typically accounts and management information, contract and commissioner detail, staffing structure, the regulatory position, and property or lease arrangements. Serious buyers also want to understand how the business operates day to day and what changes when the owner steps back.' },
  { q: 'Can I speak to Prosaria if I am not ready to sell yet?',
    a: 'Yes, and that is often the better time. Owners who start thinking about it early tend to have more options, more time to organise the business properly, and less pressure when a conversation does happen. There is no expectation that you have made a decision.' },
  { q: 'How long can a supported living business sale take?',
    a: 'It varies considerably depending on the business, how prepared it is, the type of buyer, and the regulatory and property arrangements involved. Rather than quote a timeline that may not apply to your situation, we would rather understand the specifics and give you a realistic view.' },
]

export default function SellSupportedLivingPage() {
  useReveal()

  return (
    <>
      {/* HERO */}
      <section className="marble-bg marble-bg-strong pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Supported living</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[22ch] leading-tight mb-6">
            Thinking About Selling Your Supported Living Business?
          </h1>
          <p className="text-body-lg text-[#3C4A40] max-w-[52ch] mb-4">
            You may be ready now, or simply thinking about what comes next.
          </p>
          <p className="text-body-md text-[#4A574C] max-w-[52ch] mb-10">
            Prosaria helps UK supported living owners prepare the business properly, review the opportunity from a buyer&rsquo;s perspective and explore confidential conversations with serious acquirers.
          </p>
          <Link href="/contact?type=seller&amp;sector=supported-living" className="btn-primary">Start a confidential conversation</Link>
        </div>
      </section>

      {/* NOT READY TODAY */}
      <section className="py-32 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="reveal mb-12">
            <p className="eyebrow mb-4">No decision required</p>
            <h2 className="font-serif text-display-lg text-[#0F2E1D] max-w-[26ch]">
              You do not need to be ready to sell today.
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <p className="text-body-md text-[#3C4A40] mb-6">
                Many owners start the conversation before they have decided anything. They are thinking about what comes next, and want to understand the position before they commit to a direction.
              </p>
              <p className="text-body-md text-[#3C4A40]">
                Owners who start early tend to have more choices. There is time to organise the business, address anything that would concern a buyer, and choose the right moment rather than being pushed into one.
              </p>
            </div>
            <div className="reveal reveal-delay-1 space-y-3">
              {reasons.map(r => (
                <div key={r} className="bg-white rounded-xl border border-[#123524]/12 px-6 py-4">
                  <p className="text-body-sm text-[#3C4A40]">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT BUYERS LOOK AT */}
      <section className="light-section marble-bg py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="reveal mb-4">
            <p className="eyebrow mb-4">Buyer perspective</p>
            <h2 className="font-serif text-display-lg max-w-[30ch]" style={{color:'#0F2E1D'}}>
              What buyers look at in supported living businesses.
            </h2>
          </div>
          <p className="text-body-md max-w-[54ch] mb-12 reveal" style={{color:'#3C4A40'}}>
            Different buyers weigh things differently, and no single factor decides the outcome on its own. These are the areas that usually come up.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {buyerFactors.map((f, i) => (
              <div key={f.t} className={`bg-white rounded-2xl border border-[#123524]/12 p-6 reveal reveal-delay-${(i % 3) + 1}`}>
                <p className="font-serif text-[1.05rem] mb-2" style={{color:'#0F2E1D'}}>{f.t}</p>
                <p className="text-body-sm" style={{color:'#4A574C'}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREPARE FIRST */}
      <section className="py-32 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <p className="eyebrow mb-4">Preparation</p>
              <h2 className="font-serif text-display-lg text-[#0F2E1D] mb-6 max-w-[24ch]">
                Prepare before approaching buyers.
              </h2>
              <p className="text-body-md text-[#3C4A40] mb-6">
                The first buyer conversation should not be the first time you look properly at how the business presents from the outside.
              </p>
              <p className="text-body-md text-[#3C4A40]">
                We help owners organise and present the business so serious buyers can understand what has been built. Where appropriate, financial information can be reviewed with senior care sector CFO input before buyer conversations progress.
              </p>
              <p className="text-body-md text-[#3C4A40] mt-6">
                We are not accountants or solicitors, and formal legal, tax and financial advice should come from your own advisers.
              </p>
            </div>
            <div className="reveal reveal-delay-1 space-y-3">
              {prepareItems.map(p => (
                <div key={p} className="flex gap-3 items-start">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8650D] flex-shrink-0" />
                  <p className="text-body-sm text-[#3C4A40]">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISCREET ROUTE */}
      <section className="light-section marble-bg py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="reveal mb-12 max-w-[54ch]">
            <p className="eyebrow mb-4">Confidentiality</p>
            <h2 className="font-serif text-display-lg mb-6 max-w-[26ch]" style={{color:'#0F2E1D'}}>
              A discreet route to the market.
            </h2>
            <p className="text-body-md mb-4" style={{color:'#3C4A40'}}>
              Many supported living owners do not want their business advertised. Staff, commissioners and competitors finding out before anything is decided helps nobody.
            </p>
            <p className="text-body-md" style={{color:'#3C4A40'}}>
              The alternative is a controlled approach to a small number of buyers who are genuinely relevant.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {discreetSteps.map((s, i) => (
              <div key={s} className={`bg-white rounded-xl border border-[#123524]/12 px-6 py-5 reveal reveal-delay-${(i % 2) + 1}`}>
                <p className="text-body-sm" style={{color:'#3C4A40'}}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS TYPES */}
      <section className="py-32 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="reveal mb-10">
            <p className="eyebrow mb-4">Scope</p>
            <h2 className="font-serif text-display-lg text-[#0F2E1D] max-w-[28ch]">
              Supported living businesses we can work with.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {businessTypes.map(t => (
              <span key={t} className="rounded-full border border-[#123524]/20 bg-white px-5 py-2.5 text-body-sm text-[#3C4A40]">
                {t}
              </span>
            ))}
          </div>
          <p className="text-body-sm text-[#4A574C] mt-8 max-w-[48ch]">
            If your business sits close to these but is not an exact match, it is still worth a conversation.
          </p>
        </div>
      </section>

      {/* HOW IT STARTS */}
      <section className="light-section marble-bg py-32">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="reveal mb-12">
            <p className="eyebrow mb-4">The process</p>
            <h2 className="font-serif text-display-lg max-w-[26ch]" style={{color:'#0F2E1D'}}>
              How the conversation starts.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className={`bg-white rounded-2xl border border-[#123524]/12 p-7 reveal reveal-delay-${(i % 4) + 1}`}>
                <p className="eyebrow mb-4">{s.n}</p>
                <p className="font-serif text-display-sm mb-3" style={{color:'#0F2E1D'}}>{s.t}</p>
                <p className="text-body-sm" style={{color:'#4A574C'}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="reveal mb-12">
            <p className="eyebrow mb-4">Common questions</p>
            <h2 className="font-serif text-display-lg text-[#0F2E1D] max-w-[24ch]">
              Questions owners ask us.
            </h2>
          </div>
          <div className="max-w-[70ch] space-y-8">
            {faqs.map((f, i) => (
              <div key={f.q} className={`border-b border-[#123524]/12 pb-8 reveal reveal-delay-${(i % 2) + 1}`}>
                <h3 className="font-serif text-display-sm text-[#0F2E1D] mb-3">{f.q}</h3>
                <p className="text-body-sm text-[#3C4A40]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="marble-bg py-20 border-t border-[#123524]/12">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="reveal">
            <h2 className="font-serif text-display-md text-[#0F2E1D] max-w-[24ch] mb-3">
              Considering Your Next Move?
            </h2>
            <p className="text-body-md text-[#3C4A40] max-w-[48ch]">
              You do not need to have decided anything. If you are thinking about the future of your supported living business, a quiet conversation is a sensible place to begin.
            </p>
          </div>
          <Link href="/contact?type=seller&amp;sector=supported-living" className="btn-primary flex-shrink-0">Start a confidential conversation</Link>
        </div>
      </section>
    </>
  )
}
