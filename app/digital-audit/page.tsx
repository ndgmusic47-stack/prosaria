'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'ipv4',
    question: 'Does your business own or lease any IPv4 address blocks?',
    options: [
      { label: 'Yes — we own blocks',              value: 'own' },
      { label: 'Yes — we lease from someone else', value: 'lease' },
      { label: 'Not sure',                         value: 'unsure' },
      { label: 'No',                               value: 'no' },
    ],
  },
  {
    id: 'sites',
    question: 'How many sites or locations does your business operate?',
    options: [
      { label: '1 – 5',     value: '1-5' },
      { label: '6 – 20',    value: '6-20' },
      { label: '21 – 100',  value: '21-100' },
      { label: 'Over 100',  value: 'over-100' },
    ],
  },
  {
    id: 'spend',
    question: 'Approximately how much does your business spend on connectivity (internet, WAN, MPLS) per month?',
    options: [
      { label: 'Under £2,000',        value: 'under-2k' },
      { label: '£2,000 – £10,000',    value: '2k-10k' },
      { label: '£10,000 – £50,000',   value: '10k-50k' },
      { label: 'Over £50,000',        value: 'over-50k' },
      { label: 'Not sure',            value: 'unsure' },
    ],
  },
  {
    id: 'darkfibre',
    question: 'Does your business have any dark fibre routes, unused spectrum licences, or other network capacity that is not currently in use?',
    options: [
      { label: 'Yes',       value: 'yes' },
      { label: 'Possibly',  value: 'possibly' },
      { label: 'No',        value: 'no' },
      { label: 'Not sure',  value: 'unsure' },
    ],
  },
  {
    id: 'renewal',
    question: 'When did you last formally review your connectivity contracts?',
    options: [
      { label: 'In the last 12 months',  value: 'under-12m' },
      { label: '1 – 3 years ago',        value: '1-3y' },
      { label: 'Over 3 years ago',       value: 'over-3y' },
      { label: 'Never formally reviewed', value: 'never' },
    ],
  },
  {
    id: 'contact',
    question: 'Where should Nathan send his findings?',
    type: 'contact',
  },
]

export default function DigitalAuditPage() {
  const [step, setStep]         = useState(0)
  const [answers, setAnswers]   = useState<Record<string, string>>({})
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const q        = questions[step]
  const progress = (step / questions.length) * 100

  function handleOption(value: string) {
    setAnswers({ ...answers, [q.id]: value })
    setTimeout(() => setStep(step + 1), 300)
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">

          <p className="eyebrow text-blue-400 mb-6">Infrastructure audit — submitted</p>

          <div className="bg-[#0f0f0f] p-10 mb-8">
            <p className="font-serif text-display-sm text-[#f0ede8] mb-4">
              Nathan will review your answers and come back to you within 48 hours.
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              Based on what you have told us, there may be meaningful value or savings available. Nathan will look at this properly and give you a straight answer — not a sales pitch.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { flag: answers.ipv4 === 'own' || answers.ipv4 === 'unsure', text: 'Possible IPv4 asset value — Nathan will check your RIPE/ARIN holdings.' },
              { flag: answers.spend === '10k-50k' || answers.spend === 'over-50k', text: 'Connectivity spend suggests meaningful benchmark and renegotiation opportunity.' },
              { flag: answers.darkfibre === 'yes' || answers.darkfibre === 'possibly', text: 'Potential unused network assets worth reviewing.' },
              { flag: answers.renewal === 'over-3y' || answers.renewal === 'never', text: 'Contract not recently reviewed — market pricing has changed significantly.' },
            ]
              .filter((item) => item.flag)
              .map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#0a1628] border border-blue-500/10">
                  <span className="text-blue-400 font-serif text-lg leading-none mt-0.5">—</span>
                  <p className="text-body-sm text-[#94a3b8]">{item.text}</p>
                </div>
              ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:nathan@prosaria.co.uk" className="btn-primary">
              Email Nathan directly
            </a>
            <Link href="/contact" className="btn-outline">
              Back to contact
            </Link>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
      <div className="max-w-[680px] mx-auto px-6">

        <div className="mb-10">
          <Link href="/work#digital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-6 block">
            ← Digital infrastructure
          </Link>
          <p className="eyebrow text-blue-400 mb-3">Infrastructure audit</p>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-4">
            What is your network actually worth?
          </h1>
          <p className="text-body-sm text-[#94a3b8]">
            6 questions. Nathan reviews every submission personally and responds within 48 hours.
          </p>
        </div>

        <div className="w-full h-0.5 bg-[#0a1628] mb-10">
          <div className="h-full bg-[#c9a96e] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-label text-[#475569] mb-8">{step + 1} of {questions.length}</p>

        <div key={step}>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8">{q.question}</h2>

          {q.options && (
            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOption(opt.value)}
                  className={`w-full text-left px-6 py-4 border text-body-sm transition-all duration-150 ${
                    answers[q.id] === opt.value
                      ? 'border-[#c9a96e] bg-[#c9a96e]/5 text-[#f0f4ff]'
                      : 'border-blue-500/10 bg-[#0a1628] text-[#94a3b8] hover:border-[#c9a96e]/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {q.type === 'contact' && (
            <div className="space-y-5">
              <div>
                <label className="text-label text-[#94a3b8] block mb-2">Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full border border-blue-500/10 bg-[#0a1628] px-5 py-4 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors"
                  placeholder="First and last name" />
              </div>
              <div>
                <label className="text-label text-[#94a3b8] block mb-2">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-blue-500/10 bg-[#0a1628] px-5 py-4 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors"
                  placeholder="your@email.com" />
              </div>
              <p className="text-label text-[#475569]">
                Nathan reviews every submission personally. No automated responses, no marketing emails.
              </p>
              <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit for review'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
