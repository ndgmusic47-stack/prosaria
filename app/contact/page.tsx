'use client'

import { useEffect, useState } from 'react'
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

const paths = [
  {
    num: '01',
    title: 'Care sector M&A',
    desc: 'You own or operate a care business and you are thinking about what comes next. Or you are a buyer looking for acquisitions.',
    action: 'Take the exit readiness snapshot',
    href: '/care-snapshot',
    secondary: 'Or just email Nathan directly',
  },
  {
    num: '02',
    title: 'Digital infrastructure',
    desc: 'You want to review your connectivity costs, explore your network assets, or understand what your IPv4 holdings might be worth.',
    action: 'Start with a free infrastructure audit',
    href: '/digital-audit',
    secondary: 'Or just email Nathan directly',
  },
  {
    num: '03',
    title: 'Working capital',
    desc: 'Your business has strong invoices going out but cash is tight. You want to know what a better facility looks like.',
    action: 'Get a free working capital assessment',
    href: '/capital-assessment',
    secondary: 'Or just email Nathan directly',
  },
]

export default function ContactPage() {
  useReveal()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simple mailto fallback — replace with API route + Resend when ready
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

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
          <p className="eyebrow mb-6">Work with us</p>
          <h1 className="font-serif text-display-xl text-[#f0ede8] max-w-[20ch] leading-tight mb-8">
            The right conversation starts here.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            Pick the path that fits your situation. Or skip straight to the email if you would rather just talk.
          </p>
        </div>
      </section>

      {/* ── THREE PATHS ───────────────────────────────────── */}
      <section className="py-section bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">

          <div className="mb-14 reveal">
            <p className="eyebrow mb-4">Where does this apply to you?</p>
            <h2 className="font-serif text-display-md text-[#f0f4ff] max-w-[28ch]">
              Three ways in. All lead to Nathan.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-blue-500/8 mb-20">
            {paths.map((path, i) => (
              <div
                key={path.num}
                className={`bg-[#050d1a] p-10 lg:p-12 flex flex-col reveal reveal-delay-${i + 1}`}
              >
                <p className="text-label text-blue-400 mb-5">{path.num}</p>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4">{path.title}</h3>
                <p className="text-body-sm text-[#94a3b8] flex-1 mb-8">{path.desc}</p>
                <div className="space-y-3">
                  <Link href={path.href} className="btn-primary block text-center">
                    {path.action}
                  </Link>
                  <a
                    href="mailto:hello@prosaria.co.uk"
                    className="block text-center text-label text-[#94a3b8] hover:text-blue-400 transition-colors duration-200 py-2"
                  >
                    {path.secondary}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* ── DIRECT CONTACT ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left — message form */}
            <div className="reveal">
              <p className="eyebrow mb-6">Send a message</p>
              {sent ? (
                <div className="py-12 border border-blue-500/10 bg-[#0a1628] px-10">
                  <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Received.</p>
                  <p className="text-body-sm text-[#94a3b8]">Nathan will come back to you directly — usually within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-label text-[#94a3b8] block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-blue-500/10 bg-[#0a1628] px-4 py-3 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-label text-[#94a3b8] block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-blue-500/10 bg-[#0a1628] px-4 py-3 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-label text-[#94a3b8] block mb-2">What is this about?</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-blue-500/10 bg-[#0a1628] px-4 py-3 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200 resize-none"
                      placeholder="Brief description of your situation"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center"
                  >
                    {loading ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </div>

            {/* Right — direct details */}
            <div className="reveal reveal-delay-1">
              <p className="eyebrow mb-6">Direct contact</p>
              <div className="space-y-8">
                <div>
                  <p className="text-label text-[#475569] mb-2">Email</p>
                  <a
                    href="mailto:hello@prosaria.co.uk"
                    className="font-serif text-display-sm text-[#f0f4ff] hover:text-blue-400 transition-colors duration-200"
                  >
                    hello@prosaria.co.uk
                  </a>
                </div>
                <div>
                  <p className="text-label text-[#475569] mb-2">LinkedIn</p>
                  <a
                    href="https://linkedin.com/in/mrpowell22/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-display-sm text-[#f0f4ff] hover:text-blue-400 transition-colors duration-200"
                  >
                    Nathan Powell
                  </a>
                </div>
                <div className="pt-8 border-t border-blue-500/10">
                  <p className="text-label text-[#475569] mb-3">Response time</p>
                  <p className="text-body-sm text-[#94a3b8]">
                    Nathan responds to every serious enquiry personally, usually within one business day. There is no inbox filter.
                  </p>
                </div>
                <div>
                  <p className="text-label text-[#475569] mb-3">Registered business</p>
                  <p className="text-body-sm text-[#94a3b8]">
                    South Thames Trading Company Limited<br />
                    Trading as Prosaria Partners<br />
                    Registered in England & Wales
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
