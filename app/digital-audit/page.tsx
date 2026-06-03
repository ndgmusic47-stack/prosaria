'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'ipv4',
    question: 'Does your business own or have access to any IPv4 address blocks?',
    options: [
      { label:'Yes, we own blocks',                  value:'own',      score:3 },
      { label:'Possibly, through past acquisitions', value:'possibly', score:2 },
      { label:'Not sure',                            value:'unsure',   score:1 },
      { label:'No',                                  value:'no',       score:0 },
    ],
  },
  {
    id: 'age',
    question: 'How long has your business been operating?',
    options: [
      { label:'Under 5 years',  value:'under-5',  score:0 },
      { label:'5 to 15 years',  value:'5-15',     score:1 },
      { label:'Over 15 years',  value:'over-15',  score:2 },
      { label:'Not sure',       value:'unsure',   score:1 },
    ],
  },
  {
    id: 'review',
    question: 'Have you ever reviewed what IP address space your business holds?',
    options: [
      { label:'Yes, recently',            value:'yes-recent', score:0 },
      { label:'Yes, but a long time ago', value:'yes-old',    score:2 },
      { label:'Never',                    value:'never',      score:3 },
      { label:'Not sure',                 value:'unsure',     score:2 },
    ],
  },
  {
    id: 'acquisition',
    question: 'Has your business grown through acquiring other companies?',
    options: [
      { label:'Yes, multiple acquisitions', value:'multiple', score:3 },
      { label:'Yes, one acquisition',       value:'one',      score:2 },
      { label:'No',                         value:'no',       score:0 },
    ],
  },
  {
    id: 'contact',
    question: 'Where should we send your assessment?',
    type: 'contact',
  },
]

function getScoreBand(score: number) {
  if (score >= 8) return {
    label: 'High likelihood',
    colour: 'text-blue-300',
    summary: 'Based on your answers there is a strong chance you are holding IPv4 address space with real market value.',
    points: [
      'Businesses with your profile regularly find address blocks worth five or six figures that were sitting at zero on the balance sheet.',
      'The process of checking what you hold through the RIPE or ARIN registry takes minutes.',
      'If there is something there, we can connect you with the right buyer or broker to realise the value.',
    ],
  }
  if (score >= 4) return {
    label: 'Worth checking',
    colour: 'text-blue-400',
    summary: 'There are signals here that make it worth taking a proper look at what your business holds.',
    points: [
      'Even businesses that are not sure often find holdings through legacy allocations or acquisitions.',
      'A quick review costs nothing and takes minutes.',
      'We can run the check and give you a straight answer on whether there is anything worth pursuing.',
    ],
  }
  return {
    label: 'Lower likelihood',
    colour: 'text-blue-200',
    summary: 'Based on your answers, significant IPv4 holdings are less likely, but it is still worth a quick check to be certain.',
    points: [
      'It takes minutes to check your RIPE or ARIN records and rule it out completely.',
      'If there is nothing there, you will know for certain.',
      'Get in touch if you want us to take a look.',
    ],
  }
}

function buildEmailBody(name: string, email: string, answers: Record<string,string>, score: number, band: string) {
  return `IPv4 Opportunity Check%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0AEmail: ${email}%0D%0AScore: ${score}/8 - ${band}%0D%0A%0D%0AIPv4 holdings: ${answers.ipv4 || ''}%0D%0ABusiness age: ${answers.age || ''}%0D%0ALast review: ${answers.review || ''}%0D%0AAcquisitions: ${answers.acquisition || ''}`
}

export default function DigitalAuditPage() {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<Record<string,string>>({})
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

  function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    setSubmitted(true)
    const score = calcScore()
    const band  = getScoreBand(score).label
    const body  = buildEmailBody(name, email, answers, score, band)
    window.location.href = `mailto:hello@prosaria.co.uk?subject=IPv4 check: ${encodeURIComponent(name)} - ${band}&body=${body}`
  }

  if (submitted) {
    const score = calcScore()
    const band  = getScoreBand(score)
    return (
      <div className="min-h-screen bg-[#050d1a] pt-32 pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          <Link href="/work#digital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
            Back to digital infrastructure
          </Link>
          <p className="eyebrow text-blue-400 mb-6">Your IPv4 assessment</p>

          <div className="bg-[#0a1628] border border-blue-500/10 p-10 mb-8">
            <div className="flex items-end gap-4 mb-4">
              <span className={`font-serif text-[4rem] leading-none ${band.colour}`}>{score}</span>
              <span className="font-serif text-[2rem] text-[#94a3b8] leading-none mb-2">/ 8</span>
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
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">Want us to take a proper look?</p>
            <p className="text-body-sm text-[#94a3b8] mb-6">Get in touch and we will check your holdings directly.</p>
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
        <Link href="/work#digital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
          Back to digital infrastructure
        </Link>
        <p className="eyebrow text-blue-400 mb-3">IPv4 opportunity check</p>
        <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-3">Is your business sitting on IPv4 address space?</h1>
        <p className="text-body-sm text-[#94a3b8] mb-10">4 questions. Instant score. No obligation.</p>

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
