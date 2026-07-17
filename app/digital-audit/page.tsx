'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'type',
    question: 'What best describes your interest in digital infrastructure?',
    options: [
      { label: 'We are looking to acquire IPv4 address space',           value: 'buyer' },
      { label: 'We hold IPv4 address space and want to explore options', value: 'seller' },
      { label: 'We are a network operator or ISP',                       value: 'operator' },
      { label: 'We have a general infrastructure requirement',            value: 'general' },
    ],
  },
  {
    id: 'size',
    question: 'What scale of opportunity are you considering?',
    options: [
      { label: 'Small under 1,000 addresses',     value: 'small' },
      { label: 'Medium 1,000 to 10,000 addresses', value: 'medium' },
      { label: 'Large over 10,000 addresses',      value: 'large' },
      { label: 'Not sure yet',                       value: 'unsure' },
    ],
  },
  {
    id: 'timeline',
    question: 'What is your timeline?',
    options: [
      { label: 'Immediate actively looking now', value: 'immediate' },
      { label: 'Within 3 to 6 months',            value: 'soon' },
      { label: 'Longer term or exploratory',       value: 'exploratory' },
    ],
  },
  {
    id: 'contact',
    question: 'How should we reach you?',
    type: 'contact',
  },
]

function getResult(type: string, timeline: string) {
  if (type === 'buyer') return {
    headline: 'We will review your requirement.',
    summary: 'We work with specialist partners who are active in the IPv4 market. If there is a relevant opportunity through our network, we will be in touch.',
    next: 'We will review what you have told us and come back to you if there is a relevant conversation to have.',
  }
  if (type === 'seller') return {
    headline: 'We will look at this with our partners.',
    summary: 'We work with specialist buyers and intermediaries in the IPv4 space. We will assess whether there is a relevant party in our network.',
    next: 'We will review your situation with our partners and come back to you directly.',
  }
  return {
    headline: 'We will follow up directly.',
    summary: 'We originate digital infrastructure opportunities through specialist partner networks. If your requirement fits, we will be in touch.',
    next: 'We will review what you have told us and follow up if there is a relevant connection to make.',
  }
}

export default function DigitalAuditPage() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

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
    const result = getResult(answers.type, answers.timeline)
    return (
      <div className="min-h-screen bg-[#F7F3EC] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          <Link href="/work#digital" className="eyebrow text-[#5C6B5F] hover:text-[#2E5E44] transition-colors mb-8 block">
            Back to digital infrastructure
          </Link>
          <p className="eyebrow text-[#2E5E44] mb-6">Your enquiry has been received</p>

          <div className="bg-[#FFFFFF] border border-[#2E5E44]/15 p-10 mb-8">
            <p className="font-serif text-display-sm text-[#1F3D2B] mb-3">{result.headline}</p>
            <p className="text-body-sm text-[#5C6B5F]">{result.summary}</p>
          </div>

          <div className="flex gap-4 p-6 bg-[#FFFFFF] border border-[#2E5E44]/12 mb-10">
            <span className="text-[#2E5E44] font-serif text-lg leading-none mt-0.5">—</span>
            <p className="text-body-sm text-[#5C6B5F]">{result.next}</p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#2E5E44]/15 p-8">
            <p className="font-serif text-display-sm text-[#1F3D2B] mb-3">Want to speak directly?</p>
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
    <div className="min-h-screen bg-[#F7F3EC] pt-32 pb-24">
      <div className="max-w-[680px] mx-auto px-6">
        <Link href="/work#digital" className="eyebrow text-[#5C6B5F] hover:text-[#2E5E44] transition-colors mb-8 block">
          Back to digital infrastructure
        </Link>
        <p className="eyebrow text-[#2E5E44] mb-3">Digital infrastructure</p>
        <h1 className="font-serif text-display-lg text-[#1F3D2B] mb-3">Tell us about your requirement.</h1>
        <p className="text-body-sm text-[#5C6B5F] mb-10">3 questions. We follow up personally on every submission.</p>

        <div className="w-full h-0.5 bg-[#FFFFFF] mb-10">
          <div className="h-full bg-[#EFF4EF]0 transition-all duration-500" style={{width:`${progress}%`}} />
        </div>
        <p className="text-label text-[#5C6B5F] mb-8">{step + 1} of {questions.length}</p>

        <div key={step} className="animate-fade-in" style={{animationDuration:'0.3s'}}>
          <h2 className="font-serif text-display-md text-[#1F3D2B] mb-8">{q.question}</h2>

          {q.options && (
            <div className="space-y-3">
              {q.options.map(opt => (
                <button key={opt.value} onClick={() => handleOption(opt.value)}
                  className={`w-full text-left px-6 py-4 border text-body-sm transition-all duration-150 ${
                    answers[q.id] === opt.value
                      ? 'border-[#2E5E44] bg-[#2E5E44]/10 text-[#1F3D2B]'
                      : 'border-[#2E5E44]/20 bg-[#FFFFFF] text-[#5C6B5F] hover:border-[#2E5E44]/50 hover:text-[#1F3D2B]'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {q.type === 'contact' && (
            <div className="space-y-5">
              <div>
                <label className="text-label text-[#5C6B5F] block mb-2">Your name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-[#2E5E44]/20 bg-[#FFFFFF] text-[#1F3D2B] px-5 py-4 text-body-sm focus:outline-none focus:border-[#2E5E44] transition-colors placeholder:text-[#7E8A7E]"
                  placeholder="First and last name" />
              </div>
              <div>
                <label className="text-label text-[#5C6B5F] block mb-2">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-[#2E5E44]/20 bg-[#FFFFFF] text-[#1F3D2B] px-5 py-4 text-body-sm focus:outline-none focus:border-[#2E5E44] transition-colors placeholder:text-[#7E8A7E]"
                  placeholder="your@email.com" />
              </div>
              <p className="text-label text-[#5C6B5F]">We review every submission personally.</p>
              <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim()}
                className="btn-primary disabled:opacity-40 w-full justify-center">
                {loading ? 'Submitting...' : 'Submit enquiry'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
