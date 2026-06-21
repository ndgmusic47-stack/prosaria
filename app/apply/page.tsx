'use client'

import { useState } from 'react'
import Link from 'next/link'

const steps = [
  { id: 'active', label: 'Are you actively looking at UK healthcare acquisitions in the next 12 months?',
    options: ['Yes, actively', 'Yes, within 12 months', 'Exploring seriously', 'Not yet'] },
  { id: 'buyerType', label: 'What type of buyer are you?',
    options: ['International healthcare operator', 'UK healthcare consolidator', 'Healthcare-focused family office', 'PE firm or independent sponsor'] },
  { id: 'geographies', label: 'Which UK geographies are you considering?',
    options: ['England', 'Scotland', 'Wales', 'Northern Ireland', 'UK-wide'] },
  { id: 'subsectors', label: 'Which healthcare subsectors interest you?',
    options: ['Care homes', 'Home care / domiciliary', 'Supported living', 'Specialist care', 'Broader healthcare'] },
  { id: 'size', label: 'What target size are you looking for?',
    options: ['Under £1m EBITDA', '£1m to £3m EBITDA', '£3m to £10m EBITDA', 'Over £10m EBITDA'] },
  { id: 'dealType', label: 'Platform, bolt-on, or either?',
    options: ['Platform', 'Bolt-on', 'Either'] },
  { id: 'capital', label: 'Do you have acquisition capital or credible funding access?',
    options: ['Capital in place', 'Credible funding access', 'Arranging funding', 'Not yet'] },
  { id: 'decision', label: 'Who makes the acquisition decision?',
    options: ['I do', 'Investment committee', 'Board', 'Principal / family'] },
  { id: 'priorDeals', label: 'Have you completed acquisitions before?',
    options: ['Several', 'One or two', 'In progress', 'None yet'] },
  { id: 'ownerLed', label: 'Are you open to direct owner-led opportunities before they become broker-led?',
    options: ['Yes, strongly prefer it', 'Yes', 'Depends', 'No'] },
  { id: 'retained', label: 'Are you comfortable with a retained buyer-side mandate model plus success fee where applicable?',
    options: ['Yes', 'Open to discussing', 'Need to understand more', 'No'] },
]

export default function ApplyPage() {
  const [step, setStep]       = useState(-1) // -1 = intro
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [org, setOrg]         = useState('')
  const [value, setValue]     = useState('')
  const [submitted, setSub]   = useState(false)
  const [loading, setLoading] = useState(false)

  const TOTAL = steps.length

  function choose(v: string) {
    const s = steps[step]
    setAnswers(prev => ({ ...prev, [s.id]: v }))
    setTimeout(() => setStep(step + 1), 220)
  }

  async function submit() {
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/submit-application', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, organisation: org, value,
          active: answers.active, buyerType: answers.buyerType,
          geographies: answers.geographies, subsectors: answers.subsectors,
          size: answers.size, dealType: answers.dealType, capital: answers.capital,
          decision: answers.decision, priorDeals: answers.priorDeals,
          ownerLed: answers.ownerLed, retained: answers.retained,
        }),
      })
    } catch {}
    setLoading(false); setSub(true)
  }

  // CONFIRMATION
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <p className="eyebrow text-blue-400 mb-6">Application received</p>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-4">Thank you. Your mandate application is in.</h1>
          <p className="text-body-md text-[#94a3b8] mb-3">We review every application against the current mandate lanes. If your criteria are clear, fundable, and non-conflicting, we will be in touch to arrange a mandate review.</p>
          <p className="text-body-sm text-[#64748b] mb-10">This is not a sales call. It is a review of fit. Not every application proceeds.</p>
          <Link href="/" className="btn-outline">Return home</Link>
        </div>
      </div>
    )
  }

  // INTRO
  if (step === -1) {
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          <p className="eyebrow text-blue-400 mb-5">Apply for a protected mandate review</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] mb-5 leading-tight">This is an application, not a contact form.</h1>
          <p className="text-body-lg text-[#94a3b8] mb-4 max-w-[48ch]">Prosaria accepts a maximum of three protected UK healthcare acquisition mandates per year. The first step is a mandate review, not a sales call.</p>
          <p className="text-body-sm text-[#64748b] mb-10 max-w-[48ch]">If your acquisition criteria are clear, fundable, and non-conflicting, we will review whether your mandate qualifies for one of the annual seats. Vague searchers and unfunded buyers are not accepted.</p>
          <button onClick={() => setStep(0)} className="btn-primary px-10 py-4 text-base">Begin application</button>
          <p className="text-label text-[#475569] mt-5">Eleven short questions, then your details. Two minutes.</p>
        </div>
      </div>
    )
  }

  // FINAL DETAILS
  if (step >= TOTAL) {
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[560px] mx-auto px-6">
          <p className="eyebrow text-blue-400 mb-3">Final step</p>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-2">Your details.</h2>
          <p className="text-body-sm text-[#94a3b8] mb-8">So we can review your mandate and respond directly.</p>
          <div className="space-y-4 mb-5">
            {[
              { v: name, set: setName, label: 'Your name *', ph: 'First and last name', t: 'text' },
              { v: email, set: setEmail, label: 'Email *', ph: 'you@company.com', t: 'email' },
              { v: phone, set: setPhone, label: 'Phone (optional)', ph: '+44 / international', t: 'tel' },
              { v: org, set: setOrg, label: 'Organisation (optional)', ph: 'Company or fund name', t: 'text' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-label text-[#94a3b8] block mb-2 uppercase tracking-widest">{f.label}</label>
                <input type={f.t} value={f.v} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                  className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]" />
              </div>
            ))}
            <div>
              <label className="text-label text-[#94a3b8] block mb-2 uppercase tracking-widest">What would make this valuable enough to proceed?</label>
              <textarea value={value} onChange={e => setValue(e.target.value)} rows={3} placeholder="In one or two lines"
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569] resize-none" />
            </div>
          </div>
          <button onClick={submit} disabled={loading || !name.trim() || !email.trim()}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-40">
            {loading ? 'Submitting…' : 'Submit mandate application'}
          </button>
          <button onClick={() => setStep(TOTAL - 1)} className="text-label text-[#64748b] hover:text-blue-400 mt-4 block mx-auto uppercase tracking-widest">← Back</button>
        </div>
      </div>
    )
  }

  // QUESTION STEPS
  const s = steps[step]
  return (
    <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
      <div className="max-w-[640px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-blue-400' : 'bg-[#1e3a5f]'}`} />
          ))}
        </div>
        <p className="text-label text-[#94a3b8] mb-3 uppercase tracking-widest">Question {step + 1} of {TOTAL}</p>
        <div key={step} className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8 leading-snug">{s.label}</h2>
          <div className="space-y-3">
            {s.options.map(opt => (
              <button key={opt} onClick={() => choose(opt)}
                className={`w-full text-left px-6 py-4 border text-body-sm transition-all duration-150 ${
                  answers[s.id] === opt ? 'border-blue-400 bg-blue-500/10 text-[#f0f4ff]'
                  : 'border-blue-500/15 bg-[#0a1628] text-[#94a3b8] hover:border-blue-400/50 hover:text-[#f0f4ff]'
                }`}>
                {opt}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-label text-[#64748b] hover:text-blue-400 mt-6 uppercase tracking-widest">← Back</button>
          )}
        </div>
      </div>
    </div>
  )
}
