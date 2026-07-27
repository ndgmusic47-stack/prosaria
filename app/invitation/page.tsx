'use client'

import { useState } from 'react'

const CREAM   = '#F7F3EC'
const GREEN   = '#1F3D2B'
const GREEN2  = '#2E5E44'
const BRONZE  = '#A67C4E'
const BODY    = '#4A5B4E'
const CHARCOAL= '#2B2B26'

const fitQuestions = [
  { id: 'q1', text: 'Are you actively acquiring UK healthcare businesses?',
    options: ['Yes', 'No'] },
  { id: 'q2', text: 'Do you have capital in place, or committed funding access?',
    options: ['Yes', 'No'] },
  { id: 'q3', text: 'If a genuine fit emerged, could you move to a conversation within 30 days?',
    options: ['Yes', 'No'] },
  { id: 'q4', text: 'Are you seeking a protected buy side mandate, rather than access to a deal list?',
    options: ['Yes — a protected mandate', 'No — I just want deal flow'] },
]

const formFields = [
  { k: 'name',         label: 'Your name',            ph: 'First and last name',        req: true,  type: 'text' },
  { k: 'organisation', label: 'Organisation',          ph: 'Company, fund, or group',    req: true,  type: 'text' },
  { k: 'role',         label: 'Your role',             ph: 'e.g. Principal, Director',   req: true,  type: 'text' },
  { k: 'email',        label: 'Email',                 ph: 'you@company.com',            req: true,  type: 'email' },
  { k: 'phone',        label: 'Phone (optional)',      ph: '+44 or international',       req: false, type: 'tel' },
  { k: 'subsectors',   label: 'Target subsectors',     ph: 'e.g. care homes, home care, supported living', req: true, type: 'text' },
  { k: 'size',         label: 'Target size',           ph: 'EBITDA range or beds',       req: true,  type: 'text' },
  { k: 'geography',    label: 'Geography',             ph: 'e.g. North West England, UK wide', req: true, type: 'text' },
  { k: 'timeline',     label: 'Timeline',              ph: 'e.g. next 6 to 12 months',   req: true,  type: 'text' },
]

export default function InvitationPage() {
  const [stage, setStage]     = useState<'door'|'about'|'fit'|'blocked'|'form'|'done'>('door')
  const [qIdx, setQIdx]       = useState(0)
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [form, setForm]       = useState<Record<string,string>>({})
  const [notes, setNotes]     = useState('')
  const [loading, setLoading] = useState(false)

  function answerFit(value: string) {
    const q = fitQuestions[qIdx]
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    if (q.id === 'q4' && value.startsWith('No')) { setStage('blocked'); return }
    if (qIdx + 1 < fitQuestions.length) setQIdx(qIdx + 1)
    else setStage('form')
  }

  async function submit() {
    const required = formFields.filter(f => f.req).every(f => (form[f.k] || '').trim())
    if (!required) return
    setLoading(true)
    try {
      await fetch('/api/submit-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, ...form, notes }),
      })
    } catch {}
    setLoading(false)
    setStage('done')
  }

  return (
    <div className="min-h-screen" style={{ background: CREAM, paddingTop: '96px' }}>
      <div className="max-w-[640px] mx-auto px-6 pb-28">

        {/* THE DOOR */}
        {stage === 'door' && (
          <div className="text-center pt-16 animate-fade-in" style={{ animationDuration: '0.6s' }}>
            <div className="w-10 h-[1px] mx-auto mb-10" style={{ background: BRONZE }} />
            <p className="eyebrow mb-6" style={{ color: BRONZE }}>Prosaria · Private</p>
            <h1 className="font-serif text-display-xl leading-tight mb-6" style={{ color: GREEN }}>
              A private introduction to Prosaria.
            </h1>
            <p className="text-body-md mb-2" style={{ color: BODY }}>
              This page is not public.
            </p>
            <p className="text-body-md mb-12" style={{ color: BODY }}>
              You have been sent here directly.
            </p>
            <button onClick={() => setStage('about')} className="btn-primary px-12 py-4">
              Begin
            </button>
          </div>
        )}

        {/* ABOUT + HOW WE WORK */}
        {stage === 'about' && (
          <div className="pt-8 animate-fade-in" style={{ animationDuration: '0.5s' }}>
            <p className="eyebrow mb-6" style={{ color: BRONZE }}>What Prosaria is</p>
            <h2 className="font-serif text-display-md mb-6 leading-snug" style={{ color: GREEN }}>
              A private healthcare M&A origination office.
            </h2>
            <p className="text-body-md mb-10 leading-relaxed" style={{ color: BODY }}>
              We work with a small number of buyers on protected mandates. We build direct relationships with UK care business owners, long before their businesses are marketed, and we prepare serious conversations quietly.
            </p>

            <div className="space-y-4 mb-12">
              {[
                { t: 'Direct owner relationships', d: 'We speak with owners directly. Not lists, not portals, not auctions.' },
                { t: 'Protected mandates', d: 'Each mandate is exclusive within its lane. Your criteria are not shopped around.' },
                { t: 'Quiet, prepared conversations', d: 'When a fit emerges, both sides arrive prepared. Nothing is rushed or public.' },
              ].map((x, i) => (
                <div key={x.t} className="bg-white rounded-2xl border p-6 animate-fade-in"
                  style={{ borderColor: 'rgba(46,94,68,0.15)', animationDuration: '0.5s', animationDelay: `${0.1 + i * 0.12}s`, animationFillMode: 'backwards' }}>
                  <p className="font-serif text-[1.05rem] mb-1.5" style={{ color: GREEN }}>{x.t}</p>
                  <p className="text-body-sm" style={{ color: BODY }}>{x.d}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setStage('fit')} className="btn-primary px-10 py-4 w-full justify-center">
              Continue
            </button>
          </div>
        )}

        {/* FIT QUESTIONS */}
        {stage === 'fit' && (
          <div className="pt-8 animate-fade-in" style={{ animationDuration: '0.4s' }} key={qIdx}>
            <div className="flex items-center gap-2 mb-10">
              {fitQuestions.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 rounded-full transition-all duration-500"
                  style={{ background: i <= qIdx ? GREEN2 : '#E2DACB' }} />
              ))}
            </div>
            <p className="eyebrow mb-4" style={{ color: BRONZE }}>Fit · {qIdx + 1} of {fitQuestions.length}</p>
            <h2 className="font-serif text-display-md mb-10 leading-snug" style={{ color: GREEN }}>
              {fitQuestions[qIdx].text}
            </h2>
            <div className="space-y-3">
              {fitQuestions[qIdx].options.map(opt => (
                <button key={opt} onClick={() => answerFit(opt)}
                  className="w-full text-left px-6 py-5 rounded-xl border bg-white text-body-md transition-all duration-150"
                  style={{ borderColor: 'rgba(46,94,68,0.2)', color: CHARCOAL }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GREEN2; e.currentTarget.style.background = '#F1EBE0' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(46,94,68,0.2)'; e.currentTarget.style.background = '#FFFFFF' }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q4 BLOCK */}
        {stage === 'blocked' && (
          <div className="pt-16 text-center animate-fade-in" style={{ animationDuration: '0.5s' }}>
            <div className="w-10 h-[1px] mx-auto mb-10" style={{ background: BRONZE }} />
            <h2 className="font-serif text-display-md mb-6 leading-snug" style={{ color: GREEN }}>
              Thank you for your honesty.
            </h2>
            <p className="text-body-md mb-4 leading-relaxed max-w-[42ch] mx-auto" style={{ color: BODY }}>
              Prosaria does not operate as a deal listing service. We work only through protected buy side mandates, where one buyer holds one lane.
            </p>
            <p className="text-body-md leading-relaxed max-w-[42ch] mx-auto" style={{ color: BODY }}>
              If that changes for you, you are welcome to return.
            </p>
          </div>
        )}

        {/* APPLICATION FORM */}
        {stage === 'form' && (
          <div className="pt-8 animate-fade-in" style={{ animationDuration: '0.5s' }}>
            <p className="eyebrow mb-4" style={{ color: BRONZE }}>Mandate application</p>
            <h2 className="font-serif text-display-md mb-3 leading-snug" style={{ color: GREEN }}>
              Tell us about your mandate.
            </h2>
            <p className="text-body-sm mb-10" style={{ color: BODY }}>
              Nathan reviews every application personally. Nothing here is shared.
            </p>
            <div className="space-y-5 mb-6">
              {formFields.map(f => (
                <div key={f.k}>
                  <label className="text-label block mb-2 uppercase tracking-widest" style={{ color: BODY }}>
                    {f.label} {f.req && <span style={{ color: GREEN2 }}>*</span>}
                  </label>
                  <input type={f.type} value={form[f.k] || ''} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                    placeholder={f.ph}
                    className="w-full rounded-xl border px-5 py-4 text-body-sm outline-none transition-colors bg-white"
                    style={{ borderColor: 'rgba(46,94,68,0.2)', color: CHARCOAL }}
                    onFocus={e => (e.currentTarget.style.borderColor = GREEN2)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(46,94,68,0.2)')} />
                </div>
              ))}
              <div>
                <label className="text-label block mb-2 uppercase tracking-widest" style={{ color: BODY }}>
                  Anything else (optional)
                </label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  placeholder="Anything that helps us understand the mandate"
                  className="w-full rounded-xl border px-5 py-4 text-body-sm outline-none resize-none bg-white"
                  style={{ borderColor: 'rgba(46,94,68,0.2)', color: CHARCOAL }} />
              </div>
            </div>
            <button onClick={submit}
              disabled={loading || !formFields.filter(f => f.req).every(f => (form[f.k] || '').trim())}
              className="btn-primary w-full justify-center py-4 disabled:opacity-40">
              {loading ? 'Submitting…' : 'Submit application'}
            </button>
          </div>
        )}

        {/* THANK YOU */}
        {stage === 'done' && (
          <div className="pt-16 text-center animate-fade-in" style={{ animationDuration: '0.5s' }}>
            <div className="w-10 h-[1px] mx-auto mb-10" style={{ background: BRONZE }} />
            <h2 className="font-serif text-display-md mb-6 leading-snug" style={{ color: GREEN }}>
              Thank you. Nathan will review this personally.
            </h2>
            <p className="text-body-md leading-relaxed max-w-[42ch] mx-auto" style={{ color: BODY }}>
              If the mandate looks like a fit, the next step is a private review call.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
