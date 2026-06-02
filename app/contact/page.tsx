'use client'

import { useEffect, useState } from 'react'
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

const paths = [
  { num:'01', title:'Care sector M&A', desc:'You own or operate a care business and are thinking about what comes next. Or you are a buyer looking for acquisitions.', action:'Check exit readiness', href:'/care-snapshot' },
  { num:'02', title:'Digital infrastructure', desc:'You want to know if your business is holding IPv4 address space or other network assets that have value.', action:'Start with a free IPv4 check', href:'/digital-audit' },
  { num:'03', title:'Working capital', desc:'Your invoices are going out on long payment terms and you want to understand what releasing that cash looks like.', action:'Get a working capital estimate', href:'/capital-assessment' },
]

export default function ContactPage() {
  useReveal()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', message:'' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {}
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Work with us</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[20ch] leading-tight mb-6">
            Start a conversation.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[44ch]">
            Use the tools below to get an immediate answer, or send a message directly.
          </p>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="py-24 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-12 reveal">
            <p className="eyebrow mb-4">Quick start</p>
            <h2 className="font-serif text-display-md text-[#f0f4ff] max-w-[28ch]">
              Pick the area that fits your situation.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px mb-20" style={{background:'rgba(59,130,246,0.06)'}}>
            {paths.map((path, i) => (
              <div key={path.num} className={`bg-[#050d1a] p-10 flex flex-col reveal reveal-delay-${i+1} hover:bg-[#070d1c] transition-colors`}>
                <p className="text-label text-blue-400 mb-5">{path.num}</p>
                <h3 className="font-serif text-display-sm text-[#f0f4ff] mb-4">{path.title}</h3>
                <p className="text-body-sm text-[#94a3b8] flex-1 mb-8">{path.desc}</p>
                <Link href={path.href} className="btn-primary block text-center">
                  {path.action}
                </Link>
              </div>
            ))}
          </div>

          {/* DIRECT CONTACT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div className="reveal">
              <p className="eyebrow mb-6">Send a message</p>
              {sent ? (
                <div className="py-12 border border-blue-500/10 bg-[#0a1628] px-10">
                  <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Received.</p>
                  <p className="text-body-sm text-[#94a3b8]">We will come back to you directly, usually within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label:'Name', key:'name', type:'text', placeholder:'Your name' },
                    { label:'Email', key:'email', type:'email', placeholder:'your@email.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-label text-[#475569] block mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        value={form[field.key as 'name'|'email']}
                        onChange={e => setForm({...form, [field.key]: e.target.value})}
                        className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-4 py-3 text-body-sm focus:outline-none focus:border-blue-400 transition-colors"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-label text-[#475569] block mb-2">What is this about?</label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-4 py-3 text-body-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                      placeholder="Brief description of your situation"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </div>

            <div className="reveal reveal-delay-1">
              <p className="eyebrow mb-6">Direct contact</p>
              <div className="space-y-8">
                <div>
                  <p className="text-label text-[#334155] mb-2 uppercase tracking-widest">Phone</p>
                  <a href="tel:02030267906" className="font-serif text-display-sm text-[#f0f4ff] hover:text-blue-400 transition-colors">
                    020 3026 7906
                  </a>
                </div>
                <div>
                  <p className="text-label text-[#334155] mb-2 uppercase tracking-widest">Email</p>
                  <a href="mailto:hello@prosaria.co.uk" className="font-serif text-display-sm text-[#f0f4ff] hover:text-blue-400 transition-colors">
                    hello@prosaria.co.uk
                  </a>
                </div>
                <div>
                  <p className="text-label text-[#334155] mb-2 uppercase tracking-widest">Address</p>
                  <p className="text-body-sm text-[#94a3b8]">66 Paul Street<br />London EC2A 4NA</p>
                </div>
                <div className="pt-6 border-t border-blue-500/8">
                  <p className="text-label text-[#334155] mb-3 uppercase tracking-widest">Response time</p>
                  <p className="text-body-sm text-[#94a3b8]">
                    We respond to every serious enquiry personally, usually within one business day.
                  </p>
                </div>
                <div>
                  <p className="text-label text-[#334155] mb-3 uppercase tracking-widest">Registered business</p>
                  <p className="text-body-sm text-[#94a3b8]">
                    South Thames Trading Company Limited<br />
                    Trading as Prosaria Partners<br />
                    Registered in England &amp; Wales
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
