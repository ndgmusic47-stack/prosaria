'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'turnover',
    question: 'What is your approximate annual turnover?',
    options: [
      { label: 'Under £500k',          value: 'under-500k',  monthly: 35000 },
      { label: '£500k – £1.5m',        value: '500k-1.5m',   monthly: 85000 },
      { label: '£1.5m – £5m',          value: '1.5m-5m',     monthly: 270000 },
      { label: '£5m – £15m',           value: '5m-15m',      monthly: 830000 },
      { label: 'Over £15m',            value: 'over-15m',    monthly: 1500000 },
    ],
  },
  {
    id: 'terms',
    question: 'What payment terms do you typically offer your customers?',
    options: [
      { label: '7 – 14 days',    value: '7-14d' },
      { label: '30 days',        value: '30d' },
      { label: '60 days',        value: '60d' },
      { label: '90 days',        value: '90d' },
      { label: '90+ days',       value: '90d-plus' },
    ],
  },
  {
    id: 'facility',
    question: 'Do you currently have an invoice finance or asset-based lending facility?',
    options: [
      { label: 'Yes — and it works well',             value: 'yes-good' },
      { label: 'Yes — but I think I could do better', value: 'yes-poor' },
      { label: 'No — never used one',                 value: 'no-never' },
      { label: 'No — tried to get one but was declined', value: 'no-declined' },
    ],
  },
  {
    id: 'sector',
    question: 'What sector does your business operate in?',
    options: [
      { label: 'Recruitment / staffing',    value: 'recruitment' },
      { label: 'Construction / contracting', value: 'construction' },
      { label: 'Manufacturing',             value: 'manufacturing' },
      { label: 'Wholesale / distribution',  value: 'wholesale' },
      { label: 'Professional services',     value: 'professional' },
      { label: 'Care / health',             value: 'care' },
      { label: 'Other',                     value: 'other' },
    ],
  },
  {
    id: 'contact',
    question: 'Where should we send your assessment?',
    type: 'contact',
  },
]

function calcReleasable(turnoverValue: string, termsValue: string): number | null {
  const turnoverOpt = questions[0].options?.find((o) => o.value === turnoverValue)
  if (!turnoverOpt || !('monthly' in turnoverOpt)) return null
  const monthly = (turnoverOpt as { monthly: number }).monthly
  const longTerms = ['60d', '90d', '90d-plus'].includes(termsValue)
  if (!longTerms) return null
  return Math.round((monthly * 0.8) / 1000) * 1000
}

function formatCurrency(n: number): string {
  if (n >= 1000000) return `£${(n / 1000000).toFixed(1)}m`
  if (n >= 1000) return `£${Math.round(n / 1000)}k`
  return `£${n}`
}

export default function CapitalAssessmentPage() {
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
    const releasable = calcReleasable(answers.turnover, answers.terms)
    const hasExisting = answers.facility === 'yes-good' || answers.facility === 'yes-poor'
    const canImprove  = answers.facility === 'yes-poor'

    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">

          <p className="eyebrow text-blue-400 mb-6">Your working capital assessment</p>

          {/* Headline result */}
          <div className="bg-[#0f0f0f] p-10 mb-8">
            {releasable ? (
              <>
                <p className="text-body-sm text-[#94a3b8] mb-3">Estimated monthly cash you could release</p>
                <p className="font-serif text-[3.5rem] text-blue-400 leading-none mb-4">
                  {formatCurrency(releasable)}
                </p>
                <p className="text-body-sm text-[#6b6760]">
                  Based on your payment terms and turnover. This is an estimate — the actual figure depends on your debtor book quality and the facility structure.
                </p>
              </>
            ) : (
              <>
                <p className="font-serif text-display-sm text-[#f0ede8] mb-4">
                  Your payment terms are short — invoice finance may not be the primary tool here.
                </p>
                <p className="text-body-sm text-[#94a3b8]">
                  Nathan will review your situation and suggest what might be more useful.
                </p>
              </>
            )}
          </div>

          {/* Observations */}
          <div className="space-y-4 mb-10">
            {canImprove && (
              <div className="flex gap-4 p-5 bg-[#0a1628] border border-blue-500/10">
                <span className="text-blue-400 font-serif text-lg mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">You have an existing facility but think you could do better. In most cases, you can. The market has changed and many businesses are significantly overpaying.</p>
              </div>
            )}
            {!hasExisting && (
              <div className="flex gap-4 p-5 bg-[#0a1628] border border-blue-500/10">
                <span className="text-blue-400 font-serif text-lg mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">You do not currently have a facility. Depending on your debtor quality, there are several lenders who would actively want to work with a business in your sector and size range.</p>
              </div>
            )}
            {releasable && (
              <div className="flex gap-4 p-5 bg-[#0a1628] border border-blue-500/10">
                <span className="text-blue-400 font-serif text-lg mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">On 60+ day terms, roughly 80% of your outstanding invoices could be available to draw against immediately. The facility costs a fraction of what that cash sitting idle costs you.</p>
              </div>
            )}
          </div>

          <p className="text-label text-[#475569] mb-6">
            Indicative estimate only. Not financial advice. Nathan Powell, Prosaria Partners.
          </p>

          {/* CTA */}
          <div className="bg-[#0f0f0f] p-10">
            <p className="font-serif text-display-sm text-[#f0ede8] mb-6">
              Want Nathan to look at this properly?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:hello@prosaria.co.uk" className="btn-primary">
                Email Nathan directly
              </a>
              <Link href="/contact" className="btn-outline">
                Go to contact page
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
      <div className="max-w-[680px] mx-auto px-6">

        <div className="mb-10">
          <Link href="/work#capital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-6 block">
            ← Working capital
          </Link>
          <p className="eyebrow text-blue-400 mb-3">Working capital assessment</p>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-4">
            How much cash is tied up in your invoices?
          </h1>
          <p className="text-body-sm text-[#94a3b8]">
            5 questions. Instant result. Nathan reviews every submission personally.
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
                Your results are reviewed personally by Nathan. No automated emails, no marketing.
              </p>
              <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-50">
                {loading ? 'Calculating...' : 'See my assessment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
