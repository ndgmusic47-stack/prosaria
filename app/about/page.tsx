'use client'

import { useEffect } from 'react'
import Link from 'next/link'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const values = [
  {
    num: '01',
    title: 'Direct by default',
    body: 'No account managers. No layers. You deal with Nathan. That is the whole model.',
  },
  {
    num: '02',
    title: 'Origination first',
    body: 'We find the deal before it exists. That means outbound, research and relationships — not waiting for inbounds.',
  },
  {
    num: '03',
    title: 'Lean on purpose',
    body: 'Small means fast. Fast means deals get done while larger firms are still arranging the introductory call.',
  },
  {
    num: '04',
    title: 'Honest about fit',
    body: 'If it is not the right deal or the right time, Nathan will say so. No pipeline inflation. No wasted months.',
  },
]

export default function AboutPage() {
  useReveal()

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #c9a96e 1px, transparent 1px), linear-gradient(to bottom, #c9a96e 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">The founder</p>
          <h1 className="font-serif text-display-xl text-[#f0ede8] max-w-[18ch] leading-tight mb-8">
            Nathan Powell
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            Founder of Prosaria Partners. Originator. The person you actually speak to.
          </p>
        </div>
      </section>

      {/* ── MAIN BIO ──────────────────────────────────────── */}
      <section className="py-section bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Photo */}
            <div className="reveal">
              <div className="aspect-[4/5] bg-[#0a1628] border border-blue-500/10 flex items-end p-8 relative overflow-hidden">
                {/* Replace this div with an <img> tag when you have your photo */}
                {/* <img src="/nathan.jpg" alt="Nathan Powell" className="absolute inset-0 w-full h-full object-cover" /> */}
                <div className="relative z-10">
                  <p className="font-serif text-xl text-[#f0f4ff]">Nathan Powell</p>
                  <p className="eyebrow text-blue-400 mt-1">Founder, Prosaria Partners</p>
                </div>
              </div>
              {/* Credibility tags below photo */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  'GTT Authorised Channel Partner',
                  'Care Sector M&A',
                  'Digital Infrastructure',
                  'Working Capital',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-label text-[#94a3b8] border border-blue-500/10 px-3 py-1.5 bg-[#0a1628]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="space-y-8 text-body-md text-[#94a3b8]">

              <div className="reveal">
                <p className="eyebrow mb-5">Background</p>
                <div className="space-y-5">
                  <p>
                    I built Prosaria around one thing I know how to do well — finding conversations that matter before anyone else does. Not waiting for mandates to land. Not sitting on a panel of 12 advisers all chasing the same deal. Going out and finding it.
                  </p>
                  <p>
                    My background is in origination and deal sourcing. I have worked across the care sector, digital infrastructure and working capital markets — not as a sector specialist but as someone who understands these markets well enough to know what a good deal looks like and how to get both sides to the table.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-1">
                <p className="eyebrow mb-5">Why Prosaria</p>
                <div className="space-y-5">
                  <p>
                    Most intermediaries are too big to move fast and too cautious to say anything useful. Prosaria exists because there is a real gap between the firms dealing in hundred-million-pound mandates and the brokers who are purely transactional. The middle market — the £1m to £20m deal, the owner-managed business, the growing company with a real but non-standard need — is underserved.
                  </p>
                  <p>
                    That is where I operate. Small enough to be direct. Experienced enough to be useful. Independent enough to tell you the truth.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-delay-2">
                <p className="eyebrow mb-5">How I work</p>
                <div className="space-y-5">
                  <p>
                    I take on a small number of live situations at any time. That means when you are working with Prosaria, you have my full attention. I do not hand you to a junior. I do not disappear after the introduction. I stay in the deal until it is done.
                  </p>
                  <p>
                    Fees are success-based where possible. I back myself to deliver.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
                <Link href="/contact" className="btn-primary">
                  Start a conversation
                </Link>
                <Link href="/work" className="btn-outline">
                  What we do
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES / APPROACH ─────────────────────────────── */}
      <section className="py-section bg-[#020810]">
        <div className="max-w-site mx-auto px-6 lg:px-10">

          <div className="mb-16 reveal">
            <p className="eyebrow mb-4">The approach</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] max-w-[24ch]">
              Four things that do not change regardless of the deal.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200">
            {values.map((v, i) => (
              <div
                key={v.num}
                className={`bg-[#020810] p-10 reveal reveal-delay-${(i % 2) + 1}`}
              >
                <p className="font-sans text-label text-blue-400 mb-5">{v.num}</p>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4">{v.title}</h3>
                <p className="text-body-sm text-[#94a3b8]">{v.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── LINKEDIN / INSIGHT STRIP ──────────────────────── */}
      <section className="relative bg-[#050d1a] py-section-sm">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="reveal">
            <p className="eyebrow mb-3">Follow the thinking</p>
            <p className="font-serif text-display-sm text-[#f0ede8] max-w-[36ch]">
              Nathan writes about deal origination, the markets Prosaria operates in, and what is actually happening on the ground.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-1 flex-shrink-0">
            <a
              href="https://linkedin.com/in/nathanpowell"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              LinkedIn
            </a>
            <Link href="/insight" className="btn-primary">
              Read the insight
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-section bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10 text-center">
          <div className="reveal">
            <p className="eyebrow mb-6">Work with Nathan</p>
            <h2 className="font-serif text-display-lg text-[#f0f4ff] mb-6 max-w-[28ch] mx-auto">
              If you have a deal worth talking about, let&apos;s talk about it.
            </h2>
            <p className="text-body-md text-[#94a3b8] max-w-[44ch] mx-auto mb-10">
              No forms with twelve fields. No automated responses. Just a direct conversation with Nathan about whether Prosaria can help.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
