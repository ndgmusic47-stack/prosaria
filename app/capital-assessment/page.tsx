'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CALENDLY = 'https://calendly.com/ncpowell47/meeting'

// ── Questions ────────────────────────────────────────────
const questions = [
  {
    id: 'pain',
    question: 'How often does your staffing agency struggle to cover payroll while waiting on client invoices?',
    insight: null,
    options: [
      { label: 'Rarely — we manage fine',                      value: 'rarely',    score: 1 },
      { label: 'Occasionally — it creates some stress',         value: 'sometimes', score: 2 },
      { label: 'Regularly — it is a real pressure',             value: 'regularly', score: 3 },
      { label: 'It is one of our biggest challenges right now', value: 'biggest',   score: 4 },
    ],
  },
  {
    id: 'revenue',
    question: 'What is your agency\'s approximate annual revenue?',
    insight: null,
    options: [
      { label: 'Under $500k',     value: 'under-500k', score: 1 },
      { label: '$500k to $2m',    value: '500k-2m',    score: 2 },
      { label: '$2m to $10m',     value: '2m-10m',     score: 3 },
      { label: 'Over $10m',       value: 'over-10m',   score: 4 },
    ],
  },
  {
    id: 'terms',
    question: 'What payment terms do most of your clients operate on?',
    insight: 'Net 45 or longer means you are typically funding three to six weeks of operations from your own cash before seeing any of that revenue. Most agencies absorb this silently.',
    options: [
      { label: 'Net 15 or faster', value: 'net-15',  score: 1 },
      { label: 'Net 30',           value: 'net-30',  score: 2 },
      { label: 'Net 45 to 60',     value: 'net-45',  score: 3 },
      { label: 'Net 60 or longer', value: 'net-60',  score: 4 },
    ],
  },
  {
    id: 'payroll',
    question: 'How frequently do you run payroll for your placed contractors or temps?',
    insight: 'Weekly payroll against net 60 invoices creates a six to eight week cash gap on every placement. That gap is the business funding your clients\' operations for free.',
    options: [
      { label: 'Weekly',                         value: 'weekly',    score: 4 },
      { label: 'Bi-weekly',                      value: 'biweekly',  score: 3 },
      { label: 'Monthly',                        value: 'monthly',   score: 2 },
      { label: 'We place permanent staff only',  value: 'perm-only', score: 1 },
    ],
  },
  {
    id: 'financing',
    question: 'Do you currently use any form of invoice finance, factoring or a staffing-specific credit facility?',
    insight: 'Most staffing agencies that outgrow self-funding move to a staffing-specific facility — structured around payroll cycles, not invoice cycles. It is a different product from standard invoice finance.',
    options: [
      { label: 'No — we fund everything from our own cash',     value: 'none',       score: 4 },
      { label: 'We tried it but moved away',                    value: 'tried',      score: 3 },
      { label: 'Yes — and it works well',                       value: 'yes-good',   score: 1 },
      { label: 'Yes — but we think we could do better',         value: 'yes-poor',   score: 3 },
    ],
  },
  {
    id: 'growth',
    question: 'Is your agency currently turning down contracts or limiting growth because of cash flow?',
    insight: 'Agencies that resolve their cash flow constraint typically report taking on 30 to 40 percent more contract volume within 12 months. Most did not realise what they were leaving behind. In your market, the agencies taking that work are not bigger or better resourced. They are funded differently.',
    options: [
      { label: 'No — cash flow is not limiting us',                  value: 'no',        score: 1 },
      { label: 'Occasionally we have had to slow down',              value: 'sometimes', score: 2 },
      { label: 'Yes — we have turned down work because of it',       value: 'yes',       score: 3 },
      { label: 'This is actively holding back our growth',           value: 'blocking',  score: 4 },
    ],
  },
  {
    id: 'aspiration',
    question: 'In one sentence — what would change for your agency if cash flow was no longer a constraint?',
    type: 'text',
    placeholder: 'e.g. We could take on the larger contracts we currently have to turn down',
    insight: null,
  },
]

// ── Scene stages ─────────────────────────────────────────
// Each question unlocks a new visual element in the scene
const sceneStages = [
  { label: 'The rider appears',           desc: 'Stage 1 of 7' },
  { label: 'A path opens ahead',          desc: 'Stage 2 of 7' },
  { label: 'A destination comes into view', desc: 'Stage 3 of 7' },
  { label: 'Lights on inside',            desc: 'Stage 4 of 7' },
  { label: 'The gate is visible',         desc: 'Stage 5 of 7' },
  { label: 'The gate opens',              desc: 'Stage 6 of 7' },
  { label: 'The rider reaches the door',  desc: 'Stage 7 of 7' },
]

// ── Score interpreter ────────────────────────────────────
function getProfile(answers: Record<string, string>, totalScore: number) {
  const terms   = answers.terms
  const revenue = answers.revenue
  const growth  = answers.growth
  const payroll = answers.payroll

  const weeksGap =
    terms === 'net-60' ? '8 to 10 weeks' :
    terms === 'net-45' ? '6 to 8 weeks' :
    terms === 'net-30' ? '4 to 5 weeks' : '2 to 3 weeks'

  const facilityFit =
    payroll === 'weekly' || payroll === 'biweekly'
      ? 'Staffing-specific payroll funding — structured around your weekly or bi-weekly payroll cycle, not your invoice cycle. This is the right product for your situation.'
      : 'Selective invoice finance — draw against specific invoices as you raise them rather than your whole book.'

  const urgency =
    totalScore >= 20 ? 'High' :
    totalScore >= 14 ? 'Medium' : 'Lower'

  const growthLine =
    growth === 'blocking' || growth === 'yes'
      ? 'Your answers indicate you are actively leaving revenue on the table. That is the real cost here, not the stress of covering payroll.'
      : 'Your cash flow is manageable today but your payment terms suggest there is headroom you are not using.'

  return { weeksGap, facilityFit, urgency, growthLine }
}

// ── SVG Scene ────────────────────────────────────────────
function Scene({ stage }: { stage: number }) {
  const show = (n: number) => stage >= n

  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      {/* Sky */}
      <rect width="400" height="200" fill="#050d1a" />

      {/* Stars — always visible */}
      {[[20,15],[60,8],[120,20],[180,5],[240,12],[320,18],[360,8],[80,30],[300,25]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#93c5fd" opacity="0.6" />
      ))}

      {/* Ground */}
      <rect x="0" y="160" width="400" height="40" fill="#0a1628" />

      {/* Path — stage 2 */}
      {show(2) && (
        <g>
          <path d="M 60 160 L 200 160 L 220 160 L 180 162 L 80 162 Z" fill="#0f2040" opacity="0.8" />
          <line x1="60" y1="161" x2="320" y2="161" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="8 4" opacity="0.5" />
        </g>
      )}

      {/* Castle silhouette — stage 3 */}
      {show(3) && (
        <g opacity={show(4) ? 1 : 0.4} style={{transition:'opacity 0.6s'}}>
          <rect x="290" y="100" width="80" height="65" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="288" y="90" width="20" height="30" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="350" y="90" width="20" height="30" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="315" y="85" width="30" height="35" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />
          {/* Battlements */}
          {[290,298,306,314].map((x,i) => <rect key={i} x={x} y={82} width="6" height="10" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />)}
          {[350,358,366].map((x,i) => <rect key={i} x={x} y={82} width="6" height="10" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />)}
          {[316,324,332].map((x,i) => <rect key={i} x={x} y={76} width="6" height="10" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />)}
        </g>
      )}

      {/* Castle lights — stage 4 */}
      {show(4) && (
        <g>
          <rect x="305" y="120" width="10" height="14" fill="#3b82f6" opacity="0.7" rx="1" />
          <rect x="345" y="120" width="10" height="14" fill="#3b82f6" opacity="0.7" rx="1" />
          <rect x="325" y="115" width="10" height="14" fill="#60a5fa" opacity="0.8" rx="1" />
          {/* Glow */}
          <ellipse cx="330" cy="165" rx="25" ry="5" fill="#3b82f6" opacity="0.08" />
        </g>
      )}

      {/* Gate — stage 5 */}
      {show(5) && (
        <g>
          <rect x="318" y="135" width="24" height="30" fill={show(6) ? '#050d1a' : '#0a1628'} stroke="#3b82f6" strokeWidth="1.5" opacity="0.9" />
          <path d="M 318 135 Q 330 125 342 135" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Gate bars — disappear at stage 6 */}
          {!show(6) && [322,326,330,334,338].map((x,i) => (
            <line key={i} x1={x} y1="136" x2={x} y2="164" stroke="#1e3a5f" strokeWidth="1" />
          ))}
          {show(6) && (
            <g>
              <line x1="330" y1="128" x2="330" y2="165" stroke="#60a5fa" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
              <ellipse cx="330" cy="165" rx="20" ry="4" fill="#3b82f6" opacity="0.15" />
            </g>
          )}
        </g>
      )}

      {/* Rider — stage 1, moves right with each stage */}
      {show(1) && (
        <g style={{transition:'transform 0.6s ease'}}
           transform={`translate(${
             stage === 1 ? 0 :
             stage === 2 ? 30 :
             stage === 3 ? 60 :
             stage === 4 ? 90 :
             stage === 5 ? 120 :
             stage === 6 ? 150 :
             stage === 7 ? 170 : 170
           }, 0)`}>
          {/* Horse body */}
          <ellipse cx="75" cy="148" rx="22" ry="10" fill="#1e3a5f" />
          {/* Horse head */}
          <ellipse cx="93" cy="138" rx="8" ry="6" fill="#1e3a5f" transform="rotate(-20,93,138)" />
          {/* Snout */}
          <ellipse cx="99" cy="134" rx="4" ry="3" fill="#1e3a5f" transform="rotate(-20,99,134)" />
          {/* Mane */}
          <path d="M 85 133 Q 82 128 80 130 Q 78 125 76 128 Q 74 123 72 127" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Front legs — rearing */}
          <line x1="88" y1="152" x2="92" y2="165" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
          <line x1="83" y1="152" x2="80" y2="162" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
          {/* Rear legs */}
          <line x1="62" y1="153" x2="60" y2="165" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="155" x2="66" y2="166" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
          {/* Tail */}
          <path d="M 54 148 Q 46 155 48 163 Q 44 158 42 165" fill="none" stroke="#3b82f6" strokeWidth="2" />
          {/* Rider body */}
          <rect x="73" y="130" width="10" height="16" rx="2" fill="#0f2040" stroke="#3b82f6" strokeWidth="1" />
          {/* Rider head */}
          <circle cx="78" cy="126" r="5" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
          {/* Hat */}
          <rect x="73" y="120" width="10" height="4" rx="1" fill="#3b82f6" />
          <rect x="71" y="119" width="14" height="2" rx="1" fill="#3b82f6" />
          {/* Blue glow under horse */}
          <ellipse cx="75" cy="166" rx="18" ry="3" fill="#3b82f6" opacity="0.15" />
        </g>
      )}

      {/* Stage label */}
      <text x="200" y="185" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="sans-serif">
        {show(1) ? sceneStages[Math.min(stage - 1, 6)].label : ''}
      </text>
    </svg>
  )
}

// ── Progress bar ─────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-label text-[#94a3b8]">Question {current} of {total}</span>
        <span className="text-label text-blue-400">{Math.round((current / total) * 100)}% complete</span>
      </div>
      <div className="w-full h-1 bg-[#0a1628] rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < current ? 'bg-blue-400' : 'bg-[#1e3a5f]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────
export default function CapitalAssessmentPage() {
  const [step, setStep]             = useState(0)      // 0 = intro
  const [answers, setAnswers]       = useState<Record<string, string>>({})
  const [textVal, setTextVal]       = useState('')
  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [phone, setPhone]           = useState('')
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [insight, setInsight]       = useState<string | null>(null)
  const [showInsight, setShowInsight] = useState(false)

  const questionIndex = step - 1
  const q             = questions[questionIndex]
  const stage         = step  // scene stage matches step
  const totalScore    = questions.reduce((acc, q) => {
    if (!q.options) return acc
    const opt = q.options.find(o => o.value === answers[q.id])
    return acc + (opt?.score || 0)
  }, 0)

  function handleOption(value: string) {
    const current = questions[questionIndex]
    setAnswers(prev => ({ ...prev, [current.id]: value }))

    if (current.insight) {
      setInsight(current.insight)
      setShowInsight(true)
      setTimeout(() => {
        setShowInsight(false)
        setTimeout(() => {
          setInsight(null)
          setStep(s => s + 1)
        }, 400)
      }, 3200)
    } else {
      setTimeout(() => setStep(s => s + 1), 250)
    }
  }

  function handleText() {
    if (!textVal.trim()) return
    setAnswers(prev => ({ ...prev, aspiration: textVal }))
    setStep(s => s + 1)
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    setLoading(true)

    const profile = getProfile(answers, totalScore)

    try {
      await fetch('/api/submit-capital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone,
          pain:       answers.pain,
          revenue:    answers.revenue,
          terms:      answers.terms,
          payroll:    answers.payroll,
          financing:  answers.financing,
          growth:     answers.growth,
          aspiration: answers.aspiration,
          score:      totalScore,
          urgency:    profile.urgency,
          facility:   profile.facilityFit,
        }),
      })
    } catch {}

    setSubmitted(true)
    setLoading(false)
  }

  // ── Intro screen ────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#050d1a] pt-28 pb-24">
        <div className="max-w-[720px] mx-auto px-6">
          <Link href="/work#capital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-10 block">
            Back to working capital
          </Link>

          <div className="mb-10">
            <Scene stage={0} />
          </div>

          <p className="eyebrow text-blue-400 mb-4">Working capital diagnostic</p>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-4">
            Is your agency funded to grow?
          </h1>
          <p className="text-body-md text-[#94a3b8] mb-3 max-w-[44ch]">
            Seven questions built for US staffing and recruiting firms. Takes two minutes.
          </p>
          <p className="text-body-sm text-[#475569] mb-10 max-w-[44ch]">
            Each answer reveals something about your situation. The rider moves forward with every step. At the end you will see exactly where your business stands — and what the fastest growing agencies in your market are doing differently.
          </p>

          <button
            onClick={() => setStep(1)}
            className="btn-primary text-base px-10 py-4"
          >
            Start the diagnostic
          </button>
        </div>
      </div>
    )
  }

  // ── Contact + submit screen (after all 7 questions) ─────
  if (step === questions.length + 1) {
    return (
      <div className="min-h-screen bg-[#050d1a] pt-28 pb-24">
        <div className="max-w-[720px] mx-auto px-6">

          <div className="mb-8">
            <Scene stage={7} />
          </div>

          <p className="eyebrow text-blue-400 mb-3">Almost there</p>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-3">
            Your results are ready.
          </h2>
          <p className="text-body-sm text-[#94a3b8] mb-8">
            Enter your details to see your full diagnostic and unlock the next step.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-label text-[#94a3b8] block mb-2">Your name <span className="text-blue-400">*</span></label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder="First and last name"
              />
            </div>
            <div>
              <label className="text-label text-[#94a3b8] block mb-2">Email address <span className="text-blue-400">*</span></label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-label text-[#94a3b8] block mb-2">Phone number <span className="text-[#475569]">(optional)</span></label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !name.trim() || !email.trim()}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-40"
          >
            {loading ? 'One moment...' : 'See my results'}
          </button>
        </div>
      </div>
    )
  }

  // ── Results screen ───────────────────────────────────────
  if (submitted) {
    const profile = getProfile(answers, totalScore)

    return (
      <div className="min-h-screen bg-[#050d1a] pt-28 pb-24">
        <div className="max-w-[720px] mx-auto px-6">

          <div className="mb-8">
            <Scene stage={7} />
          </div>

          <p className="eyebrow text-blue-400 mb-4">Your diagnostic results</p>
          <h2 className="font-serif text-display-lg text-[#f0f4ff] mb-8">
            Here is where your agency stands.
          </h2>

          {/* Unlocked Level 1 */}
          <div className="border border-blue-500/10 bg-[#0a1628] p-8 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="eyebrow text-blue-400">Unlocked — Your cash gap</p>
            </div>
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">
              You are carrying approximately {profile.weeksGap} of revenue as unpaid invoices at any given time.
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              That is your agency funding your clients' operations interest-free. Every week that money sits in transit is a week it cannot pay for your next placement, your next hire, or your next contract.
            </p>
          </div>

          {/* Unlocked Level 2 */}
          <div className="border border-blue-500/10 bg-[#0a1628] p-8 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="eyebrow text-blue-400">Unlocked — Your facility fit</p>
            </div>
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">
              {profile.facilityFit}
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              {profile.growthLine}
            </p>
          </div>

          {/* Locked Level 3 */}
          <div className="relative border border-blue-500/20 p-8 mb-8 overflow-hidden">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-[#050d1a]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="text-center px-6">
                <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center mx-auto mb-4">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <rect x="1" y="8" width="14" height="11" rx="2" stroke="#60a5fa" strokeWidth="1.5" />
                    <path d="M4 8V5a4 4 0 018 0v3" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="font-serif text-display-sm text-[#f0f4ff] mb-2">Level 3 is locked</p>
                <p className="text-body-sm text-[#94a3b8] mb-6 max-w-[28ch] mx-auto">
                  The specific funding partners that work with agencies at your stage, and exactly what they need to qualify you. This takes 20 minutes.
                </p>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  Book a 20 minute call
                </a>
              </div>
            </div>

            {/* Blurred content behind */}
            <div className="filter blur-sm select-none pointer-events-none" aria-hidden="true">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#475569] text-xs font-bold">3</span>
                </div>
                <p className="eyebrow text-[#475569]">Locked — Your funding path</p>
              </div>
              <p className="font-serif text-display-sm text-[#475569] mb-3">
                Three lenders actively working with agencies at your stage
              </p>
              <p className="text-body-sm text-[#334155]">
                Based on your revenue, sector and payment terms, here are the specific funding partners who are a genuine fit and what they each need to see from you to move quickly.
              </p>
            </div>
          </div>

          {/* The real problem reveal */}
          <div className="border-l-2 border-blue-400 pl-6 py-2 mb-8">
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-2">
              The agencies growing fastest in your market are not better at sales.
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              They are better at saying yes. They take every contract that comes because cash flow is never the reason to say no. That is what the 20 minute call is about.
            </p>
          </div>

          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center py-4 text-base block text-center"
          >
            Book your 20 minute call
          </a>

          <p className="text-label text-[#334155] text-center mt-4">
            No obligation. Indicative only. Not financial advice.
          </p>
        </div>
      </div>
    )
  }

  // ── Question screen ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050d1a] pt-28 pb-24">
      <div className="max-w-[720px] mx-auto px-6">

        {/* Scene */}
        <div className="mb-8">
          <Scene stage={stage} />
        </div>

        {/* Progress */}
        <ProgressBar current={step} total={questions.length} />

        {/* Insight flash */}
        {insight && (
          <div
            className={`mb-6 p-5 border border-blue-400/30 bg-blue-500/8 transition-all duration-400 ${
              showInsight ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <p className="text-label text-blue-400 mb-1 uppercase tracking-widest">Insight</p>
            <p className="text-body-sm text-[#e2e8f0]">{insight}</p>
          </div>
        )}

        {/* Question */}
        {!showInsight && (
          <div key={step} className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
            <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8">{q.question}</h2>

            {q.options && (
              <div className="space-y-3">
                {q.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleOption(opt.value)}
                    className={`w-full text-left px-6 py-5 border text-body-sm transition-all duration-150 group ${
                      answers[q.id] === opt.value
                        ? 'border-blue-400 bg-blue-500/10 text-[#f0f4ff]'
                        : 'border-blue-500/15 bg-[#0a1628] text-[#94a3b8] hover:border-blue-400/50 hover:text-[#f0f4ff] hover:bg-[#0f2040]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                        answers[q.id] === opt.value ? 'bg-blue-400' : 'bg-[#1e3a5f] group-hover:bg-blue-500'
                      }`} />
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {q.type === 'text' && (
              <div className="space-y-4">
                <textarea
                  value={textVal}
                  onChange={e => setTextVal(e.target.value)}
                  rows={3}
                  className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569] resize-none"
                  placeholder={q.placeholder}
                  autoFocus
                />
                <button
                  onClick={handleText}
                  disabled={!textVal.trim()}
                  className="btn-primary disabled:opacity-40"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
