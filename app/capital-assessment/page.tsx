'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'turnover',
    question: 'What is your approximate annual turnover?',
    options: [
      { label:'Under £500k',    value:'under-500k', monthly:35000 },
      { label:'£500k to £1.5m', value:'500k-1.5m',  monthly:85000 },
      { label:'£1.5m to £5m',   value:'1.5m-5m',    monthly:270000 },
      { label:'£5m to £15m',    value:'5m-15m',      monthly:830000 },
      { label:'Over £15m',      value:'over-15m',    monthly:1500000 },
    ],
  },
  {
    id: 'terms',
    question: 'What payment terms do you offer your customers?',
    options: [
      { label:'7 to 14 days', value:'7-14d' },
      { label:'30 days',      value:'30d' },
      { label:'60 days',      value:'60d' },
      { label:'90 days',      value:'90d' },
      { label:'90+ days',     value:'90d-plus' },
    ],
  },
  {
    id: 'facility',
    question: 'Do you currently have an invoice finance facility?',
    options: [
      { label:'Yes, and it works well',             value:'yes-good' },
      { label:'Yes, but I think I can do better',   value:'yes-poor' },
      { label:'No',                                 value:'no' },
    ],
  },
  {
    id: 'sector',
    question: 'What sector does your business operate in?',
    options: [
      { label:'Recruitment or staffing',    value:'recruitment' },
      { label:'Construction',              value:'construction' },
      { label:'Manufacturing',             value:'manufacturing' },
      { label:'Wholesale or distribution', value:'wholesale' },
      { label:'Professional services',     value:'professional' },
      { label:'Care or health',            value:'care' },
      { label:'Other',                     value:'other' },
    ],
  },
  {
    id: 'contact',
    question: 'Where should we send your estimate?',
    type: 'contact',
  },
]

function calcReleasable(turnoverValue: string, termsValue: string): string | null {
  const opt = questions[0].options?.find(o => o.value === turnoverValue)
  if (!opt || !('monthly' in opt)) return null
  const monthly = (opt as {monthly:number}).monthly
  if (!['60d','90d','90d-plus'].includes(termsValue)) return null
  const n = Math.round((monthly * 0.8) / 1000) * 1000
  if (n >= 1000000) return `£${(n/1000000).toFixed(1)}m`
  if (n >= 1000) return `£${Math.round(n/1000)}k`
  return `£${n}`
}



export default function CapitalAssessmentPage() {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<Record<string,string>>({})
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const q        = questions[step]
  const progress = (step / questions.length) * 100

  function handleOption(value: string) {
    setAnswers({ ...answers, [q.id]: value })
    setTimeout(() => setStep(step + 1), 250)
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    const releasable = calcReleasable(answers.turnover, answers.terms)
    try {
      await fetch('/api/submit-capital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, releasable, ...answers }),
      })
    } catch {}
    setSubmitted(true)
  }

  if (submitted) {
    const releasable  = calcReleasable(answers.turnover, answers.terms)
    const canImprove  = answers.facility === 'yes-poor'
    const noFacility  = answers.facility === 'no'

    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          <Link href="/work#capital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
            Back to working capital
          </Link>
          <p className="eyebrow text-blue-400 mb-6">Your working capital estimate</p>

          <div className="bg-[#0a1628] border border-blue-500/10 p-10 mb-8">
            {releasable ? (
              <>
                <p className="text-body-sm text-[#94a3b8] mb-3">Estimated monthly cash you could release</p>
                <p className="font-serif text-[4rem] text-blue-400 leading-none mb-4"
                  style={{textShadow:'0 0 30px rgba(59,130,246,0.3)'}}>{releasable}</p>
                <p className="text-body-sm text-[#94a3b8]">
                  Based on your payment terms and turnover. The actual figure depends on your debtor book and facility structure.
                </p>
              </>
            ) : (
              <>
                <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Your payment terms are short.</p>
                <p className="text-body-sm text-[#94a3b8]">
                  Invoice finance may not be the main tool here but there may be other options worth looking at.
                </p>
              </>
            )}
          </div>

          <div className="space-y-4 mb-10">
            {canImprove && (
              <div className="flex gap-4 p-6 bg-[#0a1628] border border-blue-500/8">
                <span className="text-blue-400 font-serif text-lg mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">You have an existing facility but think you can do better. In most cases you can. Many businesses are overpaying on facilities that have not been reviewed in years.</p>
              </div>
            )}
            {noFacility && (
              <div className="flex gap-4 p-6 bg-[#0a1628] border border-blue-500/8">
                <span className="text-blue-400 font-serif text-lg mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">You do not have a facility yet. There are specialist lenders who actively want to work with businesses in your sector and size range.</p>
              </div>
            )}
            {releasable && (
              <div className="flex gap-4 p-6 bg-[#0a1628] border border-blue-500/8">
                <span className="text-blue-400 font-serif text-lg mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">On 60 or 90 day terms, roughly 80% of your outstanding invoices could be available to draw against immediately. The cost of a facility is typically a fraction of what tied-up cash costs you.</p>
              </div>
            )}
          </div>

          <p className="text-label text-[#64748b] mb-6">Indicative estimate only. Not financial advice.</p>

          <div className="bg-[#0a1628] border border-blue-500/10 p-8">
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Want us to look at this properly?</p>
            <p className="text-body-sm text-[#94a3b8] mb-6">Get in touch and we will give you a straight view on your options.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:hello@prosaria.co.uk" className="btn-primary">Email us</a>
              <a href="tel:02030267906" className="btn-outline">020 3026 7906</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
      <div className="max-w-[680px] mx-auto px-6">
        <Link href="/work#capital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
          Back to working capital
        </Link>
        <p className="eyebrow text-blue-400 mb-3">Working capital estimate</p>
        <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-3">How much cash is tied up in your invoices?</h1>
        <p className="text-body-sm text-[#94a3b8] mb-10">4 questions. Instant cash estimate. No obligation.</p>

        <div className="w-full h-0.5 bg-[#0a1628] mb-10">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{width:`${progress}%`}} />
        </div>
        <p className="text-label text-[#94a3b8] mb-8">{step + 1} of {questions.length}</p>

        <div key={step} className="animate-fade-in" style={{animationDuration:'0.3s'}}>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8">{q.question}</h2>

          {q.options && (
            <div className="space-y-3">
              {q.options.map(opt => (
                <button key={opt.value} onClick={() => handleOption(opt.value)}
                  className={`w-full text-left px-6 py-4 border text-body-sm transition-all duration-150 ${
                    answers[q.id] === opt.value
                      ? 'border-blue-400 bg-blue-500/10 text-[#f0f4ff]'
                      : 'border-blue-500/15 bg-[#0a1628] text-[#94a3b8] hover:border-blue-400/50 hover:text-[#f0f4ff]'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {q.type === 'contact' && (
            <div className="space-y-5">
              <div>
                <label className="text-label text-[#94a3b8] block mb-2">Your name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                  placeholder="First and last name" />
              </div>
              <div>
                <label className="text-label text-[#94a3b8] block mb-2">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                  placeholder="your@email.com" />
              </div>
              <p className="text-label text-[#94a3b8]">Your estimate is shown instantly. Your details are sent to Prosaria.</p>
              <button onClick={handleSubmit} disabled={!name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-40 w-full justify-center">
                See my estimate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
