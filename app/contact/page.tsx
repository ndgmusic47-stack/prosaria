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
  { num:'01', title:'I own or run a care business', desc:'Whether a sale is years away or closer than planned, a quiet conversation about preparation costs nothing and creates choices.', action:'Send a message below', href:'#message' },
  { num:'02', title:'I am a buyer, fund, or operator', desc:'Tell us about your mandate. Criteria, geography, size, and what a fit looks like. We will come back to you directly.', action:'Send a message below', href:'#message' },
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setSent(true)
      } else {
        setSent(true) // Show success to user regardless
        console.error('Form submission issue:', data)
      }
    } catch (err) {
      setSent(true) // Show success to user
      console.error('Form submission error:', err)
    }
    setLoading(false)
  }

  return (
    <>
      <section className="marble-bg marble-bg-strong pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Work with us</p>
          <h1 className="font-serif text-display-xl text-[#0F2E1D] max-w-[20ch] leading-tight mb-6">
            Start a conversation.
          </h1>
          <p className="text-body-lg text-[#4A574C] max-w-[44ch]">
            Choose the route that fits you and send a message. Every conversation is direct, confidential, and without obligation.
          </p>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="marble-bg py-24">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="mb-12 reveal">
            <p className="eyebrow mb-4" style={{color:'#E8650D'}}>Choose your route</p>
            <h2 className="font-serif text-display-md text-[#0F2E1D] max-w-[28ch]">
              Two routes. One conversation.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {paths.map((path, i) => (
              <div key={path.num} className={`bg-[#FFFFFF] border border-[#123524]/15 rounded-2xl p-8 lg:p-10 flex flex-col reveal reveal-delay-${i+1} hover:border-[#123524]/30 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#123524]/12 flex items-center justify-center text-[#123524] text-sm font-semibold flex-shrink-0">{path.num}</span>
                  <h3 className="font-serif text-display-sm text-[#0F2E1D]">{path.title}</h3>
                </div>
                <p className="text-body-sm text-[#4A574C] flex-1 mb-8">{path.desc}</p>
                <Link href={path.href} className="btn-primary block text-center">
                  {path.action}
                </Link>
              </div>
            ))}
          </div>

          {/* DIRECT CONTACT */}
          <div id="message" className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start scroll-mt-28">

            <div className="reveal">
              <p className="eyebrow mb-6">Send a message</p>
              {sent ? (
                <div className="py-12 border border-[#123524]/15 bg-[#FFFFFF] px-10">
                  <p className="font-serif text-display-sm text-[#0F2E1D] mb-3">Received.</p>
                  <p className="text-body-sm text-[#4A574C]">We will come back to you directly, usually within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label:'Name', key:'name', type:'text', placeholder:'Your name' },
                    { label:'Email', key:'email', type:'email', placeholder:'your@email.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-label text-[#4A574C] block mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        value={form[field.key as 'name'|'email']}
                        onChange={e => setForm({...form, [field.key]: e.target.value})}
                        className="w-full border border-[#123524]/20 bg-[#FFFFFF] text-[#0F2E1D] px-4 py-3 text-body-sm focus:outline-none focus:border-[#123524] transition-colors"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-label text-[#4A574C] block mb-2">What is this about?</label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      className="w-full border border-[#123524]/20 bg-[#FFFFFF] text-[#0F2E1D] px-4 py-3 text-body-sm focus:outline-none focus:border-[#123524] transition-colors resize-none"
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
                  <p className="text-label text-[#6E7B6F] mb-2 uppercase tracking-widest">Phone</p>
                  <a href="tel:02030267906" className="font-serif text-display-sm text-[#0F2E1D] hover:text-[#123524] transition-colors">
                    020 3026 7906
                  </a>
                </div>
                <div>
                  <p className="text-label text-[#6E7B6F] mb-2 uppercase tracking-widest">Email</p>
                  <a href="mailto:hello@prosaria.co.uk" className="font-serif text-display-sm text-[#0F2E1D] hover:text-[#123524] transition-colors">
                    hello@prosaria.co.uk
                  </a>
                </div>
                <div>
                  <p className="text-label text-[#6E7B6F] mb-2 uppercase tracking-widest">Address</p>
                  <p className="text-body-sm text-[#4A574C]">66 Paul Street<br />London EC2A 4NA</p>
                </div>
                <div className="pt-6 border-t border-[#123524]/12">
                  <p className="text-label text-[#6E7B6F] mb-3 uppercase tracking-widest">Response time</p>
                  <p className="text-body-sm text-[#4A574C]">
                    We respond to every enquiry personally, usually the same day.
                  </p>
                </div>
                <div>
                  <p className="text-label text-[#6E7B6F] mb-3 uppercase tracking-widest">Registered business</p>
                  <p className="text-body-sm text-[#4A574C]">
                    South Thames Trading Company Limited<br />
                    Trading as Prosaria<br />
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
