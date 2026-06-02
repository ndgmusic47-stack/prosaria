'use client'

import { useState } from 'react'
import Link from 'next/link'

type Answer = string | null

const questions = [
  {
    id: 'revenue',
    question: 'What is the approximate annual revenue of your care business?',
    options: [
      { label: 'Under £500k',   value: 'under-500k',  score: 0 },
      { label: '£500k – £1m',   value: '500k-1m',     score: 1 },
      { label: '£1m – £3m',     value: '1m-3m',       score: 2 },
      { label: 'Over £3m',      value: 'over-3m',     score: 2 },
    ],
  },
  {
    id: 'size',
    question: 'How many beds or service users does the business have?',
    type: 'text',
    placeholder: 'e.g. 40 beds, or 120 service users',
  },
  {
    id: 'occupancy',
    question: 'What is your current occupancy rate?',
    options: [
      { label: 'Under 70%',  value: 'under-70',  score: 0 },
      { label: '70 – 80%',   value: '70-80',     score: 1 },
      { label: '80 – 90%',   value: '80-90',     score: 2 },
      { label: 'Over 90%',   value: 'over-90',   score: 2 },
    ],
  },
  {
    id: 'manager',
    question: 'Do you have a registered manager in post?',
    options: [
      { label: 'Yes — in post and stable',  value: 'yes',         score: 2 },
      { label: 'In transition',             value: 'transition',  score: 1 },
      { label: 'No',                        value: 'no',          score: 0 },
    ],
  },
  {
    id: 'cqc',
    question: 'What is your most recent CQC rating?',
    options: [
      { label: 'Outstanding',           value: 'outstanding',  score: 3 },
      { label: 'Good',                  value: 'good',         score: 2 },
      { label: 'Requires improvement',  value: 'requires',     score: 1 },
      { label: 'Inadequate',            value: 'inadequate',   score: 0 },
      { label: 'Not yet rated',         value: 'not-rated',    score: 1 },
    ],
  },
  {
    id: 'timeframe',
    question: 'What is your rough timeframe for exit or transition?',
    options: [
      { label: 'Under 12 months',  value: 'under-12m',  score: 0 },
      { label: '1 – 2 years',      value: '1-2y',       score: 1 },
      { label: '2 – 5 years',      value: '2-5y',       score: 2 },
      { label: 'Just exploring',   value: 'exploring',  score: 2 },
    ],
  },
  {
    id: 'contact',
    question: 'Where should we send your results?',
    type: 'contact',
  },
]

type ScoreBand = {
  label: string
  summary: string
  points: string[]
  cta: string
}

function getScoreBand(score: number): ScoreBand {
  if (score <= 4) return {
    label: 'Early stage',
    summary: 'Your business has real potential but there are a few things to address before a sale process would go smoothly.',
    points: [
      'Occupancy and CQC rating will be the first things any buyer looks at — improving either materially changes your valuation.',
      'Now is a good time to start thinking about exit — not to rush it, but to build towards it with intention.',
      'A confidential conversation now costs nothing and gives you a clear picture of where you stand.',
    ],
    cta: 'Talk to Nathan about what to work on',
  }
  if (score <= 8) return {
    label: 'Building readiness',
    summary: 'Your business is in reasonable shape. There are specific areas where focused effort now will make a meaningful difference to your exit outcome.',
    points: [
      'Buyers will pay more for businesses with stable management, strong occupancy and a clean CQC record — addressing any gaps now is worth the time.',
      'Your timeframe gives you room to prepare properly rather than rushing.',
      'The off-market route is likely the right one for a business like yours — discretion matters and the right buyer is probably not going to come from a public listing.',
    ],
    cta: 'Get a clearer picture with Nathan',
  }
  return {
    label: 'Exit ready',
    summary: 'Your business is in strong shape. If a sale is on your radar, there is no reason to wait for a conversation.',
    points: [
      'Buyers are active right now — particularly in your size range. Demand is real.',
      'The off-market route suits businesses like yours. The right buyer does not need to see you on a broker\'s list.',
      'Nathan can introduce you to qualified buyers who are actively looking, without any public process.',
    ],
    cta: 'Start a confidential conversation with Nathan',
  }
}

export default function CareSnapshotPage() {
  const [step, setStep]         = useState(0)
  const [answers, setAnswers]   = useState<Record<string, Answer>>({})
  const [textVal, setTextVal]   = useState('')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const q = questions[step]
  const isLast = step === questions.length - 1
  const progress = ((step) / questions.length) * 100

  // Calculate score from multiple-choice answers
  function calcScore() {
    let score = 0
    questions.forEach((q) => {
      if (q.options) {
        const ans = answers[q.id]
        const opt = q.options.find((o) => o.value === ans)
        if (opt) score += opt.score
      }
    })
    return score
  }

  function handleOption(value: string) {
    setAnswers({ ...answers, [q.id]: value })
    setTimeout(() => setStep(step + 1), 300)
  }

  function handleText() {
    if (!textVal.trim()) return
    setAnswers({ ...answers, [q.id]: textVal })
    setTextVal('')
    setStep(step + 1)
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    // TODO: POST to /api/submit-care when Airtable/Resend is configured
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    const score = calcScore()
    const band  = getScoreBand(score)

    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">

          <p className="eyebrow text-blue-400 mb-6">Your exit readiness snapshot</p>

          {/* Score */}
          <div className="bg-[#0f0f0f] p-10 mb-10">
            <div className="flex items-end gap-4 mb-6">
              <span className="font-serif text-[4rem] text-blue-400 leading-none">{score}</span>
              <span className="font-serif text-[2rem] text-[#94a3b8] leading-none mb-2">/ 11</span>
            </div>
            <p className="font-serif text-display-sm text-[#f0ede8] mb-2">{band.label}</p>
            <p className="text-body-sm text-[#94a3b8]">{band.summary}</p>
          </div>

          {/* Points */}
          <div className="space-y-5 mb-12">
            {band.points.map((point, i) => (
              <div key={i} className="flex gap-4 p-6 bg-[#0a1628] border border-blue-500/10">
                <span className="text-blue-400 font-serif text-lg leading-none mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">{point}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#0f0f0f] p-10">
            <p className="font-serif text-display-sm text-[#f0ede8] mb-6">{band.cta}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:nathan@prosaria.co.uk" className="btn-primary">
                Email Nathan directly
              </a>
              <Link href="/contact" className="btn-outline">
                Go to contact page
              </Link>
            </div>
            <p className="text-label text-[#3a3834] mt-6">
              Nathan will review your snapshot and come back to you personally within one business day.
            </p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
      <div className="max-w-[680px] mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <Link href="/work#care" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-6 block">
            ← Care sector M&A
          </Link>
          <p className="eyebrow text-blue-400 mb-3">Exit readiness snapshot</p>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-4">
            Where does your care business stand?
          </h1>
          <p className="text-body-sm text-[#94a3b8]">
            7 questions. Takes 2 minutes. Nathan reviews every result personally.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-[#0a1628] mb-10">
          <div
            className="h-full bg-[#c9a96e] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step counter */}
        <p className="text-label text-[#475569] mb-8">{step + 1} of {questions.length}</p>

        {/* Question */}
        <div key={step} className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8">{q.question}</h2>

          {/* Multiple choice */}
          {q.options && (
            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOption(opt.value)}
                  className={`w-full text-left px-6 py-4 border text-body-sm transition-all duration-150 ${
                    answers[q.id] === opt.value
                      ? 'border-[#c9a96e] bg-[#c9a96e]/5 text-[#f0f4ff]'
                      : 'border-blue-500/10 bg-[#0a1628] text-[#94a3b8] hover:border-[#c9a96e]/50 hover:text-[#f0f4ff]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Text input */}
          {q.type === 'text' && (
            <div className="space-y-4">
              <input
                type="text"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleText()}
                className="w-full border border-blue-500/10 bg-[#0a1628] px-5 py-4 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors"
                placeholder={q.placeholder}
                autoFocus
              />
              <button onClick={handleText} className="btn-primary">
                Continue
              </button>
            </div>
          )}

          {/* Contact */}
          {q.type === 'contact' && (
            <div className="space-y-5">
              <div>
                <label className="text-label text-[#94a3b8] block mb-2">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-blue-500/10 bg-[#0a1628] px-5 py-4 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors"
                  placeholder="First and last name"
                />
              </div>
              <div>
                <label className="text-label text-[#94a3b8] block mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-blue-500/10 bg-[#0a1628] px-5 py-4 text-body-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a96e] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <p className="text-label text-[#475569]">
                Your results are sent to Nathan. He reviews every submission personally and responds within one business day. No marketing emails.
              </p>
              <button
                onClick={handleSubmit}
                disabled={loading || !name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'See my results'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
