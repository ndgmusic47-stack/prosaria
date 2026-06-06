'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'revenue',
    question: 'What is the approximate annual revenue of your care business?',
    options: [
      { label:'Under £500k',   value:'under-500k', score:0 },
      { label:'£500k to £1m',  value:'500k-1m',    score:1 },
      { label:'£1m to £3m',    value:'1m-3m',      score:2 },
      { label:'Over £3m',      value:'over-3m',     score:2 },
    ],
  },
  {
    id: 'size',
    question: 'How many beds or service users does the business have?',
    type: 'text',
    placeholder: 'e.g. 40 beds or 120 service users',
  },
  {
    id: 'occupancy',
    question: 'What is your current occupancy rate?',
    options: [
      { label:'Under 70%', value:'under-70', score:0 },
      { label:'70 to 80%', value:'70-80',    score:1 },
      { label:'80 to 90%', value:'80-90',    score:2 },
      { label:'Over 90%',  value:'over-90',  score:2 },
    ],
  },
  {
    id: 'manager',
    question: 'Do you have a registered manager in post?',
    options: [
      { label:'Yes, in post and stable', value:'yes',        score:2 },
      { label:'In transition',           value:'transition', score:1 },
      { label:'No',                      value:'no',         score:0 },
    ],
  },
  {
    id: 'cqc',
    question: 'What is your most recent CQC rating?',
    options: [
      { label:'Outstanding',          value:'outstanding', score:3 },
      { label:'Good',                 value:'good',        score:2 },
      { label:'Requires improvement', value:'requires',    score:1 },
      { label:'Inadequate',           value:'inadequate',  score:0 },
      { label:'Not yet rated',        value:'not-rated',   score:1 },
    ],
  },
  {
    id: 'timeframe',
    question: 'What is your rough timeframe for exit or transition?',
    options: [
      { label:'Under 12 months', value:'under-12m', score:0 },
      { label:'1 to 2 years',    value:'1-2y',      score:1 },
      { label:'2 to 5 years',    value:'2-5y',      score:2 },
      { label:'Just exploring',  value:'exploring', score:2 },
    ],
  },
  {
    id: 'contact',
    question: 'Where should we send a copy of your results?',
    type: 'contact',
  },
]

function getScoreBand(score: number) {
  if (score <= 4) return {
    label: 'Early stage',
    colour: 'text-blue-300',
    summary: 'Your business has real potential but a buyer would flag a few things today. The good news is there is time to address them.',
    points: [
      'Occupancy and CQC rating are the first two things any buyer looks at. Improving either one moves your valuation meaningfully.',
      'Starting a quiet conversation now, even at this stage, gives you options rather than removing them.',
      'We can give you a clear picture of what buyers in your sector are actually focused on.',
    ],
  }
  if (score <= 8) return {
    label: 'Building readiness',
    colour: 'text-blue-400',
    summary: 'Your business is in reasonable shape. Focused effort in one or two areas over the next 12 months could make a meaningful difference to your exit outcome.',
    points: [
      'Buyers pay more for stability. A registered manager in post, consistent occupancy and a clean CQC record all move the price.',
      'Your timeframe gives you room to prepare properly rather than rushing into a process.',
      'The off market route is likely the right one for a business like yours.',
    ],
  }
  return {
    label: 'Exit ready',
    colour: 'text-blue-200',
    summary: 'Your business is in strong shape. If a sale is on your radar, there is no reason to wait.',
    points: [
      'Buyers are active in your size range right now. Demand is real.',
      'You do not need a public process. The right buyer does not need to see you on a broker list.',
      'We can make introductions to qualified buyers who are actively looking, without any open process.',
    ],
  }
}



export default function CareSnapshotPage() {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<Record<string,string>>({})
  const [textVal, setTextVal]     = useState('')
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const q        = questions[step]
  const progress = (step / questions.length) * 100

  function calcScore() {
    let score = 0
    questions.forEach(q => {
      if (q.options) {
        const opt = q.options.find(o => o.value === answers[q.id])
        if (opt) score += opt.score
      }
    })
    return score
  }

  function handleOption(value: string) {
    setAnswers({ ...answers, [q.id]: value })
    setTimeout(() => setStep(step + 1), 250)
  }

  function handleText() {
    if (!textVal.trim()) return
    setAnswers({ ...answers, [q.id]: textVal })
    setTextVal('')
    setStep(step + 1)
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    const score = calcScore()
    const band  = getScoreBand(score).label
    // Notify Prosaria silently no redirect
    try {
      await fetch('/api/submit-care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, score, band, ...answers }),
      })
    } catch {}
    setSubmitted(true)
  }

  if (submitted) {
    const score = calcScore()
    const band  = getScoreBand(score)
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          <Link href="/work#care" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
            Back to care M&A
          </Link>
          <p className="eyebrow text-blue-400 mb-6">Your exit readiness result</p>

          <div className="bg-[#0a1628] border border-blue-500/10 p-10 mb-8">
            <div className="flex items-end gap-4 mb-4">
              <span className={`font-serif text-[4rem] leading-none ${band.colour}`}>{score}</span>
              <span className="font-serif text-[2rem] text-[#94a3b8] leading-none mb-2">/ 11</span>
            </div>
            <p className={`font-serif text-display-sm mb-3 ${band.colour}`}>{band.label}</p>
            <p className="text-body-sm text-[#94a3b8]">{band.summary}</p>
          </div>

          <div className="space-y-4 mb-10">
            {band.points.map((point, i) => (
              <div key={i} className="flex gap-4 p-6 bg-[#0a1628] border border-blue-500/8">
                <span className="text-blue-400 font-serif text-lg leading-none mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">{point}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0a1628] border border-blue-500/10 p-8">
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Want to talk this through?</p>
            <p className="text-body-sm text-[#94a3b8] mb-6">Get in touch directly and we will pick up from your results.</p>
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
        <Link href="/work#care" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
          Back to care M&A
        </Link>
        <p className="eyebrow text-blue-400 mb-3">Care exit readiness</p>
        <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-3">Where does your care business stand?</h1>
        <p className="text-body-sm text-[#94a3b8] mb-10">6 questions. Instant score. No obligation.</p>

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

          {q.type === 'text' && (
            <div className="space-y-4">
              <input type="text" value={textVal} onChange={e => setTextVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleText()}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder={q.placeholder} autoFocus />
              <button onClick={handleText} className="btn-primary">Continue</button>
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
              <p className="text-label text-[#94a3b8]">Your score is shown instantly. Your details are sent to Prosaria.</p>
              <button onClick={handleSubmit} disabled={!name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-40 w-full justify-center">
                See my score
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
