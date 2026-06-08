'use client'

import { useState } from 'react'
import Link from 'next/link'

const CALENDLY = 'https://calendly.com/ncpowell47/meeting'

const questions = [
  {
    id: 'pain',
    question: 'How often does your agency struggle to cover payroll while waiting on client invoices?',
    options: [
      { label: 'Rarely — we manage fine',                       value: 'rarely',    score: 1 },
      { label: 'Occasionally — it creates some stress',         value: 'sometimes', score: 2 },
      { label: 'Regularly — it is a real pressure',             value: 'regularly', score: 3 },
      { label: 'It is one of our biggest challenges right now', value: 'biggest',   score: 4 },
    ],
  },
  {
    id: 'revenue',
    question: "What is your agency's approximate annual revenue?",
    options: [
      { label: 'Under $500k',  value: 'under-500k', score: 1 },
      { label: '$500k to $2m', value: '500k-2m',    score: 2 },
      { label: '$2m to $10m',  value: '2m-10m',     score: 3 },
      { label: 'Over $10m',    value: 'over-10m',   score: 4 },
    ],
  },
  {
    id: 'terms',
    question: 'What payment terms do most of your clients operate on?',
    options: [
      { label: 'Net 15 or faster', value: 'net-15', score: 1 },
      { label: 'Net 30',           value: 'net-30', score: 2 },
      { label: 'Net 45 to 60',     value: 'net-45', score: 3 },
      { label: 'Net 60 or longer', value: 'net-60', score: 4 },
    ],
  },
  {
    id: 'payroll',
    question: 'How often do you run payroll for your placed contractors or temps?',
    options: [
      { label: 'Weekly',                        value: 'weekly',    score: 4 },
      { label: 'Bi-weekly',                     value: 'biweekly',  score: 3 },
      { label: 'Monthly',                       value: 'monthly',   score: 2 },
      { label: 'We place permanent staff only', value: 'perm-only', score: 1 },
    ],
  },
  {
    id: 'financing',
    question: 'Do you currently use invoice finance, factoring or a staffing-specific credit facility?',
    options: [
      { label: 'No — we fund everything from our own cash', value: 'none',     score: 4 },
      { label: 'We tried it but moved away',                value: 'tried',    score: 3 },
      { label: 'Yes — and it works well',                   value: 'yes-good', score: 1 },
      { label: 'Yes — but we think we can do better',       value: 'yes-poor', score: 3 },
    ],
  },
  {
    id: 'growth',
    question: 'Is your agency turning down contracts or limiting growth because of cash flow?',
    options: [
      { label: 'No — cash flow is not limiting us',            value: 'no',        score: 1 },
      { label: 'Occasionally we have had to slow down',        value: 'sometimes', score: 2 },
      { label: 'Yes — we have turned down work because of it', value: 'yes',       score: 3 },
      { label: 'This is actively holding back our growth',     value: 'blocking',  score: 4 },
    ],
  },
  {
    id: 'aspiration',
    question: 'In one sentence — what would change for your agency if cash flow was never an issue?',
    type: 'text' as const,
    placeholder: 'e.g. We could take on every large contract that comes our way',
  },
]

const INSIGHTS: Record<string, string> = {
  terms:     'Net 45 or longer means you are funding three to six weeks of operations from your own cash before seeing that revenue. Most agencies absorb this silently.',
  payroll:   'Weekly payroll against net 60 invoices creates a six to eight week cash gap on every placement. That gap is your agency funding your clients operations for free.',
  financing: 'Most agencies that outgrow self-funding move to a staffing-specific facility structured around payroll cycles, not invoice cycles. It is a different product from standard invoice finance.',
  growth:    'Agencies that resolve their cash flow constraint typically take on 30 to 40 percent more contract volume within 12 months. Most did not realise what they were leaving behind.',
}

function getProfile(answers: Record<string, string>, totalScore: number) {
  const weeksGap =
    answers.terms === 'net-60' ? '8 to 10 weeks' :
    answers.terms === 'net-45' ? '6 to 8 weeks'  :
    answers.terms === 'net-30' ? '4 to 5 weeks'  : '2 to 3 weeks'

  const facilityFit =
    answers.payroll === 'weekly' || answers.payroll === 'biweekly'
      ? 'Staffing-specific payroll funding — structured around your weekly or bi-weekly payroll cycle, not your invoice cycle.'
      : 'Selective invoice finance — draw against specific invoices as you raise them rather than your whole book.'

  const urgency = totalScore >= 20 ? 'High' : totalScore >= 14 ? 'Medium' : 'Lower'

  const growthLine =
    answers.growth === 'blocking' || answers.growth === 'yes'
      ? 'Your answers indicate you are actively leaving revenue on the table. That is the real cost — not just the stress of covering payroll.'
      : 'Your cash flow is manageable today but your payment terms suggest there is headroom you are not using.'

  return { weeksGap, facilityFit, urgency, growthLine }
}

function Rider({ progress }: { progress: number }) {
  const x = 40 + progress * 220
  return (
    <g transform={`translate(${x}, 0)`} style={{ transition: 'transform 0.6s ease' }}>
      <ellipse cx="0" cy="0" rx="28" ry="13" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2" />
      <path d="M 18 -8 Q 28 -22 32 -30 Q 30 -18 26 -10" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
      <ellipse cx="34" cy="-34" rx="9" ry="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" transform="rotate(20,34,-34)" />
      <ellipse cx="41" cy="-30" rx="5" ry="3.5" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="0.8" transform="rotate(20,41,-30)" />
      <circle cx="37" cy="-36" r="1.5" fill="#3b82f6" />
      <path d="M 28 -40 L 31 -46 L 35 -40" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="0.8" />
      <path d="M 28 -22 Q 24 -28 22 -24 Q 18 -32 16 -26 Q 12 -34 10 -28 Q 6 -36 4 -30" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M -26 -2 Q -36 4 -34 12 Q -40 6 -38 16 Q -44 10 -40 20" fill="none" stroke="#60a5fa" strokeWidth="2" />
      <line x1="14" y1="10" x2="18" y2="28" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
      <line x1="6"  y1="11" x2="8"  y2="30" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
      <line x1="-16" y1="10" x2="-18" y2="29" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
      <line x1="-22" y1="8"  x2="-24" y2="27" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="18"  cy="30" rx="3" ry="1.5" fill="#3b82f6" />
      <ellipse cx="8"   cy="31" rx="3" ry="1.5" fill="#3b82f6" />
      <ellipse cx="-18" cy="30" rx="3" ry="1.5" fill="#3b82f6" />
      <ellipse cx="-24" cy="28" rx="3" ry="1.5" fill="#3b82f6" />
      <rect x="-4" y="-30" width="12" height="20" rx="3" fill="#0f2040" stroke="#3b82f6" strokeWidth="1.2" />
      <circle cx="4" cy="-35" r="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
      <rect x="-4" y="-41" width="16" height="3" rx="1" fill="#3b82f6" />
      <rect x="-1" y="-50" width="10" height="10" rx="1" fill="#3b82f6" />
      <line x1="8" y1="-24" x2="18" y2="-18" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="0" cy="32" rx="22" ry="4" fill="#3b82f6" opacity="0.12" />
    </g>
  )
}

function GameScene({ step, total }: { step: number; total: number }) {
  const progress = step === 0 ? 0 : Math.min((step - 1) / (total - 1), 1)
  const show = (n: number) => step >= n

  return (
    <svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ maxHeight: '260px' }}>
      <defs>
        <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020810" />
          <stop offset="100%" stopColor="#050d1a" />
        </linearGradient>
      </defs>
      <rect width="600" height="260" fill="url(#skyg)" />
      {[[30,20],[80,10],[150,25],[220,8],[290,18],[370,12],[440,22],[520,6],[560,16],[100,38],[480,32]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%3===0?1.5:1} fill="#93c5fd" opacity={0.3+i%3*0.2} />
      ))}
      <path d="M 0 190 Q 100 160 200 180 Q 300 160 400 175 Q 500 155 600 170 L 600 260 L 0 260 Z" fill="#0a1628" opacity="0.5" />
      <rect x="0" y="210" width="600" height="50" fill="#0a1628" />
      <line x1="0" y1="210" x2="600" y2="210" stroke="#1e3a5f" strokeWidth="1" opacity="0.4" />
      {show(2) && (
        <path d="M 0 215 Q 200 208 400 210 Q 500 211 600 208" fill="none" stroke="#1e3a5f" strokeWidth="2" strokeDasharray="12 6" opacity="0.5" />
      )}
      {show(3) && (
        <g opacity={step>=4?1:0.45} style={{transition:'opacity 0.8s'}}>
          <rect x="460" y="120" width="110" height="95" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1.5" />
          <rect x="452" y="100" width="30" height="50" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1.5" />
          <rect x="540" y="105" width="30" height="45" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1.5" />
          <rect x="493" y="90" width="44" height="55" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1.5" />
          {[453,461,469,477].map((x,i)=><rect key={i} x={x} y={92} width="6" height="9" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1"/>)}
          {[541,549,557].map((x,i)=><rect key={i} x={x} y={97} width="6" height="9" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1"/>)}
          {[494,502,510,518,526].map((x,i)=><rect key={i} x={x} y={81} width="7" height="10" fill="#070d1c" stroke="#1e3a5f" strokeWidth="1"/>)}
          <line x1="515" y1="81" x2="515" y2="62" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M 515 62 L 528 68 L 515 74 Z" fill="#3b82f6" opacity="0.8" />
        </g>
      )}
      {show(4) && (
        <g>
          <rect x="472" y="148" width="14" height="18" fill="#3b82f6" opacity="0.6" rx="1" />
          <rect x="547" y="143" width="14" height="18" fill="#3b82f6" opacity="0.6" rx="1" />
          <rect x="503" y="133" width="14" height="20" fill="#60a5fa" opacity="0.75" rx="1" />
          <ellipse cx="515" cy="210" rx="35" ry="8" fill="#3b82f6" opacity="0.06" />
        </g>
      )}
      {show(5) && (
        <g>
          <rect x="500" y="162" width="32" height="50" fill={show(6)?'#050d1a':'#0a1628'} stroke="#3b82f6" strokeWidth="2" rx="2" />
          <path d="M 500 162 Q 516 147 532 162" fill="none" stroke="#3b82f6" strokeWidth="2" />
          {!show(6) && [504,510,516,522,528].map((x,i)=>(
            <line key={i} x1={x} y1="164" x2={x} y2="210" stroke="#1e3a5f" strokeWidth="1.5" />
          ))}
          {!show(6) && (
            <g>
              <rect x="512" y="182" width="8" height="6" rx="1" fill="#3b82f6" opacity="0.6" />
              <path d="M 514 182 Q 514 178 516 178 Q 518 178 518 182" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
            </g>
          )}
          {show(6) && <ellipse cx="516" cy="212" rx="25" ry="5" fill="#3b82f6" opacity="0.18" />}
        </g>
      )}
      <g transform="translate(0, 180)">
        <Rider progress={progress} />
      </g>
      {step > 0 && step <= total && (
        <text x="300" y="254" textAnchor="middle" fill="#334155" fontSize="10" fontFamily="sans-serif">
          {step} of {total} questions
        </text>
      )}
    </svg>
  )
}

export default function CapitalAssessmentPage() {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<Record<string, string>>({})
  const [textVal, setTextVal]     = useState('')
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const TOTAL = questions.length  // 7

  const totalScore = questions.reduce((acc, q) => {
    if (!q.options) return acc
    const opt = q.options.find(o => o.value === answers[q.id])
    return acc + (opt?.score || 0)
  }, 0)

  // Current question (only valid when step 1-7)
  const q = step >= 1 && step <= TOTAL ? questions[step - 1] : null

  function handleOption(value: string) {
    if (!q) return
    setAnswers(prev => ({ ...prev, [q.id]: value }))
    setTimeout(() => setStep(s => s + 1), 280)
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
          pain: answers.pain, revenue: answers.revenue,
          terms: answers.terms, payroll: answers.payroll,
          financing: answers.financing, growth: answers.growth,
          aspiration: answers.aspiration,
          score: totalScore, urgency: profile.urgency,
          facility: profile.facilityFit,
        }),
      })
    } catch { /* notification failed but show results anyway */ }
    setLoading(false)
    setSubmitted(true)  // always show results
  }

  const SceneBlock = ({ s }: { s: number }) => (
    <div className="w-full bg-[#020810] border-b border-blue-500/10">
      <div className="max-w-3xl mx-auto">
        <GameScene step={s} total={TOTAL} />
      </div>
    </div>
  )

  // ── RESULTS ───────────────────────────────────────────────
  if (submitted) {
    const profile = getProfile(answers, totalScore)
    const insightKeys = Object.keys(answers).filter(k => INSIGHTS[k])
    return (
      <div className="min-h-screen bg-[#050d1a]" style={{ paddingTop: '80px' }}>
        <SceneBlock s={7} />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <p className="eyebrow text-blue-400 mb-4">Your diagnostic results</p>
          <h2 className="font-serif text-display-lg text-[#f0f4ff] mb-10">Here is where your agency stands.</h2>

          <div className="border border-blue-500/15 bg-[#0a1628] p-8 mb-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="eyebrow text-blue-400">Unlocked — Your cash gap</p>
            </div>
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">
              You are carrying approximately {profile.weeksGap} of revenue as unpaid invoices at any given time.
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              That is your agency funding your clients operations interest-free. Every week that sits in transit cannot pay your next placement, your next hire, or your next contract.
            </p>
          </div>

          <div className="border border-blue-500/15 bg-[#0a1628] p-8 mb-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="eyebrow text-blue-400">Unlocked — What fits your situation</p>
            </div>
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-3">{profile.facilityFit}</p>
            <p className="text-body-sm text-[#94a3b8]">{profile.growthLine}</p>
          </div>

          {insightKeys.length > 0 && (
            <div className="border border-blue-500/10 bg-[#070d1c] p-8 mb-5">
              <p className="eyebrow text-blue-400 mb-5">What your answers reveal</p>
              <div className="space-y-4">
                {insightKeys.map(k => (
                  <div key={k} className="flex gap-3">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">—</span>
                    <p className="text-body-sm text-[#94a3b8]">{INSIGHTS[k]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative border border-blue-400/20 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-[#050d1a]/85 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center px-8 py-10">
                <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center mx-auto mb-4">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <rect x="1" y="8" width="14" height="11" rx="2" stroke="#60a5fa" strokeWidth="1.5" />
                    <path d="M4 8V5a4 4 0 018 0v3" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="font-serif text-display-sm text-[#f0f4ff] mb-2">Level 3 is locked</p>
                <p className="text-body-sm text-[#94a3b8] mb-6 max-w-[28ch] mx-auto">
                  The specific funding path for your situation and what you need to move quickly. This takes 20 minutes.
                </p>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
                  Book a 20 minute call
                </a>
              </div>
            </div>
            <div className="filter blur-sm select-none pointer-events-none p-8" aria-hidden="true">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                  <span className="text-[#475569] text-xs font-bold">3</span>
                </div>
                <p className="eyebrow text-[#475569]">Locked — Your funding path</p>
              </div>
              <p className="font-serif text-display-sm text-[#334155] mb-3">The specific route to resolving your cash flow constraint</p>
              <p className="text-body-sm text-[#1e3a5f]">Based on your answers, here is what your business needs and how quickly this can be in place.</p>
            </div>
          </div>

          <div className="border-l-2 border-blue-400 pl-6 py-2 mb-8">
            <p className="font-serif text-display-sm text-[#f0f4ff] mb-2">
              The agencies growing fastest in your market are not better at sales.
            </p>
            <p className="text-body-sm text-[#94a3b8]">
              They are better at saying yes. They take every contract because cash flow is never the reason to say no. That is what the call is about.
            </p>
          </div>

          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full justify-center py-4 block text-center text-base mb-4">
            Book your 20 minute call
          </a>
          <p className="text-label text-[#334155] text-center">Indicative only. Not financial advice.</p>
        </div>
      </div>
    )
  }

  // ── CONTACT SCREEN (step 8) ───────────────────────────────
  if (step === TOTAL + 1) {
    return (
      <div className="min-h-screen bg-[#050d1a]" style={{ paddingTop: '80px' }}>
        <SceneBlock s={7} />
        <div className="max-w-xl mx-auto px-6 py-12">
          <p className="eyebrow text-blue-400 mb-3">The gate is open</p>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-3">Your results are ready.</h2>
          <p className="text-body-sm text-[#94a3b8] mb-8">Enter your details to unlock your full diagnostic.</p>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-label text-[#94a3b8] block mb-2">Your name <span className="text-blue-400">*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder="First and last name" />
            </div>
            <div>
              <label className="text-label text-[#94a3b8] block mb-2">Email address <span className="text-blue-400">*</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-label text-[#94a3b8] block mb-2">Phone <span className="text-[#475569]">(optional)</span></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569]"
                placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim()}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-40">
            {loading ? 'One moment...' : 'See my results'}
          </button>
        </div>
      </div>
    )
  }

  // ── INTRO SCREEN (step 0) ─────────────────────────────────
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#050d1a]" style={{ paddingTop: '80px' }}>
        <SceneBlock s={0} />
        <div className="max-w-xl mx-auto px-6 py-12">
          <Link href="/work#capital" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors mb-8 block">
            Back to working capital
          </Link>
          <p className="eyebrow text-blue-400 mb-4">Working capital diagnostic</p>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] mb-4">Is your agency funded to grow?</h1>
          <p className="text-body-md text-[#94a3b8] mb-3 max-w-[44ch]">Seven questions built for US staffing and recruiting firms. Takes two minutes.</p>
          <p className="text-body-sm text-[#475569] mb-10 max-w-[44ch]">
            Answer each question and watch the rider move forward. At the end you will see exactly where your business stands and what the fastest growing agencies in your market are doing differently.
          </p>
          <button onClick={() => setStep(1)} className="btn-primary px-10 py-4 text-base">
            Start the diagnostic
          </button>
        </div>
      </div>
    )
  }

  // ── QUESTION SCREENS (step 1-7) ───────────────────────────
  if (!q) return null

  return (
    <div className="min-h-screen bg-[#050d1a]" style={{ paddingTop: '80px' }}>
      <SceneBlock s={step} />
      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < step ? 'bg-blue-400' : 'bg-[#1e3a5f]'
            }`} />
          ))}
        </div>

        <div key={step} className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
          <h2 className="font-serif text-display-md text-[#f0f4ff] mb-8 leading-snug">{q.question}</h2>

          {q.options && (
            <div className="space-y-3">
              {q.options.map(opt => (
                <button key={opt.value} onClick={() => handleOption(opt.value)}
                  className={`w-full text-left px-6 py-5 border text-body-sm transition-all duration-150 group ${
                    answers[q.id] === opt.value
                      ? 'border-blue-400 bg-blue-500/10 text-[#f0f4ff]'
                      : 'border-blue-500/15 bg-[#0a1628] text-[#94a3b8] hover:border-blue-400/50 hover:text-[#f0f4ff] hover:bg-[#0f2040]'
                  }`}>
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
              <textarea value={textVal} onChange={e => setTextVal(e.target.value)} rows={3}
                className="w-full border border-blue-500/15 bg-[#0a1628] text-[#f0f4ff] px-5 py-4 text-body-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-[#475569] resize-none"
                placeholder={q.placeholder} autoFocus />
              <button onClick={handleText} disabled={!textVal.trim()} className="btn-primary disabled:opacity-40">
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
