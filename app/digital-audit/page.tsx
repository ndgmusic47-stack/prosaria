'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'ipv4',
    question: 'Does your business own or have access to any IPv4 address blocks?',
    options: [
      { label:'Yes, we own blocks',               value:'own' },
      { label:'We may do through past acquisitions', value:'possibly' },
      { label:'Not sure',                          value:'unsure' },
      { label:'No',                                value:'no' },
    ],
  },
  {
    id: 'age',
    question: 'How long has your business been operating or holding these assets?',
    options: [
      { label:'Under 5 years',  value:'under-5' },
      { label:'5 to 15 years',  value:'5-15' },
      { label:'Over 15 years',  value:'over-15' },
      { label:'Not sure',       value:'unsure' },
    ],
  },
  {
    id: 'review',
    question: 'Have you ever formally reviewed what IP address space your business holds?',
    options: [
      { label:'Yes, recently',           value:'yes-recent' },
      { label:'Yes, but a long time ago', value:'yes-old' },
      { label:'Never',                   value:'never' },
      { label:'Not sure',                value:'unsure' },
    ],
  },
  {
    id: 'acquisition',
    question: 'Has your business grown through acquisitions of other companies?',
    options: [
      { label:'Yes, multiple acquisitions', value:'multiple' },
      { label:'Yes, one acquisition',       value:'one' },
      { label:'No',                         value:'no' },
    ],
  },
  {
    id: 'contact',
    question: 'Where should we send our assessment?',
    type: 'contact',
  },
]

function getResult(answers: Record<string,string>) {
  const likely = answers.ipv4 === 'own' || answers.ipv4 === 'possibly'
  const old    = answers.age === 'over-15' || answers.age === '5-15'
  const unreviewed = answers.review === 'never' || answers.review === 'yes-old' || answers.review === 'unsure'
  const acquired = answers.acquisition === 'multiple' || answers.acquisition === 'one'

  const signals = []
  if (likely) signals.push('You may hold address blocks that have real market value today.')
  if (old && unreviewed) signals.push('Businesses with holdings that have not been reviewed in several years often find they are carrying assets at zero on the balance sheet.')
  if (acquired) signals.push('Acquisitions frequently bring IP address allocations that never get reviewed. These can be significant.')
  if (answers.ipv4 === 'unsure' || answers.ipv4 === 'possibly') signals.push('Even if you are unsure, a quick check of your RIPE or ARIN records takes minutes and may find something worth acting on.')

  if (signals.length === 0) signals.push('Based on your answers, IPv4 holdings are less likely to be a major opportunity, but it is worth a quick check to be certain.')

  return { signals, likely: signals.length > 1 }
}

export default function DigitalAuditPage() {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<Record<string,string>>({})
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const q        = questions[step]
  const progress = (step / questions.length) * 100

  function handleOption(value: string) {
    setAnswers({ ...answers, [q.id]: value })
    setTimeout(() => setStep(step + 1), 250)
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/submit-digital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, ...answers }),
      })
    } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    const result = getResult(answers)
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          <Link href="/work#digital" className="eyebrow text-[#475569] hover:text-blue-400 transition-colors mb-8 block">
            Back to digital infrastructure
          </Link>
          <p className="eyebrow text-blue-400 mb-6">Your IPv4 assessment</p>

          <div className="bg-[#0a1628] border border-blue-500/10 p-10 mb-8">
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">
              {result.likely ? 'There are signals worth looking into.' : 'Lower likelihood, but worth confirming.'}
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              Based on what you have told us, here is what stands out.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {result.signals.map((s, i) => (
              <div key={i} className="flex gap-4 p-6 bg-[#0a1628] border border-blue-500/8">
                <span className="text-blue-400 font-serif text-lg leading-none mt-0.5">—</span>
                <p className="text-body-sm text-[#94a3b8]">{s}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0a1628] border border-blue-500/10 p-8">
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Next step</p>
            <p className="text-body-sm text-[#94a3b8] mb-6">
              We will review your answers and come back to you within 48 hours with a straight view on whether there is something here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:hello@prosaria.co.uk" className="btn-primary">Email us directly</a>
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
        <Link href="/work#digital" className="eyebrow text-[#475569] hover:text-blue-400 transition-colors mb-8 block">
          Back to digital infrastructure
        </Link>
        <p className="eyebrow text-blue-400 mb-3">IPv4 opportunity check</p>
        <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-3">
          Is your business sitting on IPv4 address space?
        </h1>
        <p className="text-body-sm text-[#94a3b8] mb-10">
          4 questions. Instant assessment. We follow up on every submission.
        </p>

        <div className="w-full h-0.5 bg-[#0a1628] mb-10">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{width:`${progress}%`}} />
        </div>
        <p className="text-label text-[#334155] mb-8">{step + 1} of {questions.length}</p>

        <div key={step} className="animate-fade-in" style={{animationDuration:'0.3s'}}>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8">{q.question}</h2>

          {q.options && (
            <div className="space-y-3">
              {q.options.map(opt => (
                <button key={opt.value} onClick={() => handleOption(opt.value)}
                  className={`w-full text-left px-6 py-4 border text-body-sm transition-all duration-150 ${
                    answers[q.id] === opt.value
                      ? 'border-blue-400 bg-blue-500/8 text-[#f0f4ff]'
                      : 'border-blue-500/10 bg-[#0a1628] text-[#94a3b8] hover:border-blue-500/30'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {q.type === 'contact' && (
            <div className="space-y-5">
              <div>
                <label className="text-label text-[#475569] block mb-2">Your name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="First and last name" />
              </div>
              <div>
                <label className="text-label text-[#475569] block mb-2">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="your@email.com" />
              </div>
              <p className="text-label text-[#334155]">
                Your result shows immediately. We also receive it and will follow up within 48 hours.
              </p>
              <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-40">
                {loading ? 'One moment...' : 'See my assessment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
