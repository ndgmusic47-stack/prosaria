'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────
   TYPES — the shared contract both configs use
   ───────────────────────────────────────────── */
export type CockpitOption = { label: string; value: string; score?: number }

export type CockpitStage = {
  id: string
  signal: string                 // e.g. "Payroll Signal"
  prompt: string                 // the question text
  type?: 'options' | 'text'
  placeholder?: string
  options?: CockpitOption[]
  chip: string                   // snapshot chip label
  insight: string                // micro-insight shown after answering
}

export type PanelState = { value: string; tone: 'idle' | 'good' | 'warn' | 'alert' }

export type ResultRow = { label: string; body: string; tone?: 'good' | 'warn' | 'alert' | 'plain' }

export type CockpitConfig = {
  name: string                   // "The Cash Flow Cockpit"
  kicker: string                 // small label above name
  intro: string
  introSub: string
  backHref: string
  backLabel: string
  panels: { key: string; label: string }[]
  stages: CockpitStage[]
  computePanels: (answers: Record<string, string>) => Record<string, PanelState>
  buildResult: (answers: Record<string, string>) => {
    headline: string
    reference: string
    rows: ResultRow[]
  }
  buildPayload: (answers: Record<string, string>, contact: Contact) => Record<string, unknown>
  apiPath: string
  cta: { primary: string; secondary: string; trust: string }
}

type Contact = { name: string; email: string; phone: string }

const CALENDLY = 'https://calendly.com/ncpowell47/meeting'

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────── */

function SignalLights({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const state = i < current ? 'unlocked' : i === current ? 'active' : 'locked'
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                state === 'unlocked' ? 'bg-[#4BAE7F]' :
                state === 'active'   ? 'bg-[#2F80ED] ring-4 ring-[#2F80ED]/15 scale-110' :
                                       'bg-[#D6E4EF]'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}

const toneColour: Record<PanelState['tone'], { dot: string; text: string; bg: string }> = {
  idle:  { dot: '#D6E4EF', text: '#64748B', bg: '#F4F8FB' },
  good:  { dot: '#4BAE7F', text: '#2D7355', bg: '#EAF6F0' },
  warn:  { dot: '#F5B84B', text: '#9A6B12', bg: '#FDF6E9' },
  alert: { dot: '#E2683C', text: '#A8431F', bg: '#FBEEE8' },
}

function CockpitPanel({ label, state, pulse }: { label: string; state: PanelState; pulse: boolean }) {
  const c = toneColour[state.tone]
  return (
    <div
      className="rounded-xl border p-4 transition-all duration-500"
      style={{
        borderColor: '#D6E4EF',
        background: c.bg,
        boxShadow: pulse ? `0 0 0 3px ${c.dot}55` : 'none',
        transform: pulse ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full transition-colors duration-500" style={{ background: c.dot }} />
        <p className="text-[0.7rem] font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>{label}</p>
      </div>
      <p className="text-[0.95rem] font-semibold transition-colors duration-500" style={{ color: state.tone === 'idle' ? '#94A3B8' : c.text }}>
        {state.value}
      </p>
    </div>
  )
}

function SnapshotStrip({ stages, current }: { stages: CockpitStage[]; current: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((s, i) => {
        const unlocked = i < current
        return (
          <span
            key={s.id}
            className="text-[0.7rem] font-medium px-3 py-1.5 rounded-full border transition-all duration-500"
            style={{
              borderColor: unlocked ? '#4BAE7F' : '#D6E4EF',
              background: unlocked ? '#EAF6F0' : '#FFFFFF',
              color: unlocked ? '#2D7355' : '#94A3B8',
            }}
          >
            {unlocked ? '✓ ' : ''}{s.chip}
          </span>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN ENGINE
   ───────────────────────────────────────────── */
export default function DiagnosticCockpit({ config }: { config: CockpitConfig }) {
  const [phase, setPhase]       = useState<'intro' | 'play' | 'contact' | 'result'>('intro')
  const [idx, setIdx]           = useState(0)
  const [answers, setAnswers]   = useState<Record<string, string>>({})
  const [textVal, setTextVal]   = useState('')
  const [showInsight, setShow]  = useState(false)
  const [pulseKey, setPulseKey] = useState<string | null>(null)
  const [contact, setContact]   = useState<Contact>({ name: '', email: '', phone: '' })
  const [loading, setLoading]   = useState(false)

  const TOTAL  = config.stages.length
  const stage  = config.stages[idx]
  const panels = config.computePanels(answers)

  function answerStage(value: string) {
    const next = { ...answers, [stage.id]: value }
    setAnswers(next)
    setPulseKey(config.panels[idx % config.panels.length]?.key ?? null)
    setShow(true)
    setTimeout(() => setPulseKey(null), 700)
  }

  function nextSignal() {
    setShow(false)
    if (idx + 1 < TOTAL) {
      setIdx(idx + 1)
      setTextVal('')
    } else {
      setPhase('contact')
    }
  }

  async function submit() {
    if (!contact.name.trim() || !contact.email.trim()) return
    setLoading(true)
    try {
      await fetch(config.apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.buildPayload(answers, contact)),
      })
    } catch { /* show result regardless */ }
    setLoading(false)
    setPhase('result')
  }

  /* ── INTRO ── */
  if (phase === 'intro') {
    return (
      <Shell config={config}>
        <div className="text-center max-w-xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: '#E7F2FA' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2F80ED' }} />
            <span className="text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: '#2F80ED' }}>Simulator ready</span>
          </div>
          <h1 className="font-serif text-[2rem] sm:text-[2.6rem] leading-tight mb-4" style={{ color: '#17324D' }}>
            {config.name}
          </h1>
          <p className="text-[1.05rem] mb-8 leading-relaxed" style={{ color: '#64748B' }}>
            {config.intro}
          </p>
          <button
            onClick={() => setPhase('play')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
            style={{ background: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.25)' }}
          >
            Step inside →
          </button>
          <p className="text-[0.8rem] mt-5" style={{ color: '#94A3B8' }}>{config.introSub}</p>
        </div>
      </Shell>
    )
  }

  /* ── CONTACT ── */
  if (phase === 'contact') {
    return (
      <Shell config={config}>
        <div className="max-w-md mx-auto py-2">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full" style={{ background: '#EAF6F0' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#4BAE7F' }} />
            <span className="text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: '#2D7355' }}>All signals captured</span>
          </div>
          <h2 className="font-serif text-[1.7rem] mb-2" style={{ color: '#17324D' }}>Your diagnostic file is ready.</h2>
          <p className="text-[0.95rem] mb-7" style={{ color: '#64748B' }}>Add your details to open it. We review every file personally.</p>

          <div className="space-y-4">
            {[
              { k: 'name',  label: 'Your name',     ph: 'First and last name', req: true,  type: 'text' },
              { k: 'email', label: 'Email address', ph: 'you@company.com',     req: true,  type: 'email' },
              { k: 'phone', label: 'Phone',         ph: 'Optional',            req: false, type: 'tel' },
            ].map(f => (
              <div key={f.k}>
                <label className="text-[0.75rem] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: '#64748B' }}>
                  {f.label} {f.req && <span style={{ color: '#2F80ED' }}>*</span>}
                </label>
                <input
                  type={f.type}
                  value={contact[f.k as keyof Contact]}
                  onChange={e => setContact({ ...contact, [f.k]: e.target.value })}
                  placeholder={f.ph}
                  className="w-full rounded-xl border px-4 py-3.5 text-[0.95rem] outline-none transition-colors"
                  style={{ borderColor: '#D6E4EF', background: '#FFFFFF', color: '#17324D' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#2F80ED')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#D6E4EF')}
                />
              </div>
            ))}
            <button
              onClick={submit}
              disabled={loading || !contact.name.trim() || !contact.email.trim()}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40"
              style={{ background: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.22)' }}
            >
              {loading ? 'Opening your file…' : 'Open my diagnostic file'}
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  /* ── RESULT ── */
  if (phase === 'result') {
    const file = config.buildResult(answers)
    return (
      <Shell config={config}>
        <div className="max-w-2xl mx-auto">
          {/* File header */}
          <div className="rounded-t-2xl px-6 py-5 flex items-center justify-between" style={{ background: '#17324D' }}>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider mb-1" style={{ color: '#93c5fd' }}>{config.name}</p>
              <p className="font-serif text-[1.3rem] text-white leading-tight">{file.headline}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[0.65rem] uppercase tracking-wider" style={{ color: '#8FA8C0' }}>Reference</p>
              <p className="text-[0.8rem] font-mono" style={{ color: '#E7F2FA' }}>{file.reference}</p>
            </div>
          </div>

          {/* File body */}
          <div className="rounded-b-2xl border border-t-0 p-6 sm:p-8 space-y-6" style={{ borderColor: '#D6E4EF', background: '#FFFFFF' }}>
            {file.rows.map((row, i) => {
              const t = row.tone && row.tone !== 'plain' ? toneColour[row.tone] : null
              return (
                <div key={i} className="flex gap-4">
                  <span className="font-mono text-[0.8rem] pt-0.5 flex-shrink-0" style={{ color: '#94A3B8' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>{row.label}</p>
                      {t && <span className="w-2 h-2 rounded-full" style={{ background: t.dot }} />}
                    </div>
                    <p className="text-[1rem] leading-relaxed" style={{ color: t ? t.text : '#17324D', fontWeight: t ? 600 : 400 }}>
                      {row.body}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* CTA */}
            <div className="pt-6 mt-2 border-t" style={{ borderColor: '#E7F2FA' }}>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
                style={{ background: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.22)' }}
              >
                {config.cta.primary} →
              </a>
              <p className="text-center text-[0.85rem] mt-3" style={{ color: '#64748B' }}>{config.cta.secondary}</p>
              <p className="text-center text-[0.72rem] mt-2" style={{ color: '#94A3B8' }}>{config.cta.trust}</p>
            </div>
          </div>
        </div>
      </Shell>
    )
  }

  /* ── PLAY ── */
  return (
    <Shell config={config}>
      <div className="mb-6 flex items-center justify-between">
        <SignalLights total={TOTAL} current={idx + (showInsight ? 1 : 0)} />
        <p className="text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>
          Signal {idx + 1} of {TOTAL}
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Cockpit panels */}
        <div className="lg:col-span-3 order-1">
          <div className="rounded-2xl border p-5" style={{ borderColor: '#D6E4EF', background: '#F4F8FB' }}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider mb-4" style={{ color: '#64748B' }}>Live cockpit</p>
            <div className="grid grid-cols-2 gap-3">
              {config.panels.map(p => (
                <CockpitPanel key={p.key} label={p.label} state={panels[p.key]} pulse={pulseKey === p.key} />
              ))}
            </div>
          </div>
        </div>

        {/* Decision / insight card */}
        <div className="lg:col-span-2 order-2">
          <div className="rounded-2xl border p-5 h-full flex flex-col" style={{ borderColor: '#D6E4EF', background: '#FFFFFF' }}>
            {!showInsight ? (
              <>
                <div className="inline-flex items-center gap-2 mb-4 self-start px-3 py-1.5 rounded-full" style={{ background: '#E7F2FA' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2F80ED' }} />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: '#2F80ED' }}>{stage.signal}</span>
                </div>
                <h2 className="font-serif text-[1.25rem] leading-snug mb-5" style={{ color: '#17324D' }}>{stage.prompt}</h2>

                {stage.type === 'text' ? (
                  <div className="mt-auto space-y-3">
                    <textarea
                      value={textVal}
                      onChange={e => setTextVal(e.target.value)}
                      rows={3}
                      placeholder={stage.placeholder}
                      className="w-full rounded-xl border px-4 py-3 text-[0.92rem] outline-none resize-none"
                      style={{ borderColor: '#D6E4EF', color: '#17324D' }}
                      autoFocus
                    />
                    <button
                      onClick={() => textVal.trim() && answerStage(textVal.trim())}
                      disabled={!textVal.trim()}
                      className="w-full py-3 rounded-xl font-semibold text-white transition disabled:opacity-40"
                      style={{ background: '#2F80ED' }}
                    >
                      Log this signal
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {stage.options!.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => answerStage(opt.value)}
                        className="w-full text-left px-4 py-3.5 rounded-xl border text-[0.9rem] transition-all duration-150 group"
                        style={{ borderColor: '#D6E4EF', background: '#FFFFFF', color: '#17324D' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#2F80ED'; e.currentTarget.style.background = '#F4F8FB' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#D6E4EF'; e.currentTarget.style.background = '#FFFFFF' }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col h-full">
                <div className="inline-flex items-center gap-2 mb-4 self-start px-3 py-1.5 rounded-full" style={{ background: '#EAF6F0' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4BAE7F' }} />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: '#2D7355' }}>Signal detected</span>
                </div>
                <p className="text-[1rem] leading-relaxed mb-6" style={{ color: '#17324D' }}>{stage.insight}</p>
                <button
                  onClick={nextSignal}
                  className="mt-auto w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
                  style={{ background: '#2F80ED', boxShadow: '0 6px 18px rgba(47,128,237,0.22)' }}
                >
                  {idx + 1 < TOTAL ? 'Next signal →' : 'Generate my file →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Snapshot strip */}
      <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: '#D6E4EF', background: '#FFFFFF' }}>
        <p className="text-[0.68rem] font-semibold uppercase tracking-wider mb-3" style={{ color: '#94A3B8' }}>Snapshot building</p>
        <SnapshotStrip stages={config.stages} current={idx + (showInsight ? 1 : 0)} />
      </div>
    </Shell>
  )
}

/* ─────────────────────────────────────────────
   SHELL — page frame shared by every phase
   ───────────────────────────────────────────── */
function Shell({ config, children }: { config: CockpitConfig; children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#F4F8FB', paddingTop: '80px' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href={config.backHref} className="text-[0.75rem] font-semibold uppercase tracking-wider transition-colors" style={{ color: '#64748B' }}>
            ← {config.backLabel}
          </Link>
          <p className="text-[0.7rem] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{config.kicker}</p>
        </div>
        <div className="rounded-3xl border p-5 sm:p-8" style={{ borderColor: '#D6E4EF', background: '#FFFFFF', boxShadow: '0 20px 60px rgba(23,50,77,0.06)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
