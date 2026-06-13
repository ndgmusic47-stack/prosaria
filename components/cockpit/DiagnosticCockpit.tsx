'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────
   SHARED CONTRACT
   ───────────────────────────────────────────── */
export type CockpitOption = { label: string; value: string }

export type CockpitStage = {
  id: string
  signal: string
  prompt: string
  type?: 'options' | 'text'
  placeholder?: string
  options?: CockpitOption[]
  chip: string
  insight: string
}

// level 0..1 drives gauge/bar position; tone drives colour
export type PanelState = { value: string; level: number; tone: 'idle' | 'good' | 'warn' | 'alert'; kind: 'gauge' | 'bar' }

export type ResultRow = { label: string; body: string; tone?: 'good' | 'warn' | 'alert' | 'plain' }

export type CockpitConfig = {
  name: string
  kicker: string
  intro: string
  introSub: string
  backHref: string
  backLabel: string
  panels: { key: string; label: string }[]
  stages: CockpitStage[]
  computePanels: (answers: Record<string, string>) => Record<string, PanelState>
  buildResult: (answers: Record<string, string>) => { headline: string; reference: string; rows: ResultRow[] }
  buildPayload: (answers: Record<string, string>, contact: Contact) => Record<string, unknown>
  apiPath: string
  cta: { primary: string; secondary: string; trust: string }
}

type Contact = { name: string; email: string; phone: string }
const CALENDLY = 'https://calendly.com/ncpowell47/meeting'

const TONE: Record<PanelState['tone'], { c: string; soft: string; text: string }> = {
  idle:  { c: '#C3D4E3', soft: '#F4F8FB', text: '#94A3B8' },
  good:  { c: '#4BAE7F', soft: '#EAF6F0', text: '#2D7355' },
  warn:  { c: '#F5B84B', soft: '#FDF6E9', text: '#9A6B12' },
  alert: { c: '#E2683C', soft: '#FBEEE8', text: '#A8431F' },
}

/* ─────────────────────────────────────────────
   ANIMATED PRIMITIVES
   ───────────────────────────────────────────── */

// Semicircular dial with a needle that SWEEPS between values
function Gauge({ label, state, pulse }: { label: string; state: PanelState; pulse: boolean }) {
  const t = TONE[state.tone]
  // needle angle: -90deg (empty) to +90deg (full)
  const angle = -90 + state.level * 180
  return (
    <div
      className="rounded-xl border p-4 transition-all duration-500"
      style={{ borderColor: '#D6E4EF', background: '#FFFFFF', boxShadow: pulse ? `0 0 0 3px ${t.c}55, 0 8px 24px ${t.c}22` : 'none', transform: pulse ? 'translateY(-3px)' : 'none' }}
    >
      <p className="text-[0.66rem] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>{label}</p>
      <div className="relative mx-auto" style={{ width: '108px', height: '60px' }}>
        <svg viewBox="0 0 120 66" className="w-full h-full">
          {/* track */}
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#EAF0F6" strokeWidth="9" strokeLinecap="round" />
          {/* coloured arc up to level */}
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none" stroke={t.c} strokeWidth="9" strokeLinecap="round"
            strokeDasharray="157" strokeDashoffset={157 - state.level * 157}
            style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(.34,1.2,.5,1), stroke 0.6s' }}
          />
          {/* needle */}
          <g style={{ transition: 'transform 0.9s cubic-bezier(.34,1.4,.5,1)', transform: `rotate(${angle}deg)`, transformOrigin: '60px 60px' }}>
            <line x1="60" y1="60" x2="60" y2="20" stroke={t.text} strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <circle cx="60" cy="60" r="4" fill={t.text} />
        </svg>
      </div>
      <p className="text-center text-[0.9rem] font-semibold mt-1 transition-colors duration-500" style={{ color: t.text }}>{state.value}</p>
    </div>
  )
}

// Horizontal bar that FILLS smoothly
function FillMeter({ label, state, pulse }: { label: string; state: PanelState; pulse: boolean }) {
  const t = TONE[state.tone]
  return (
    <div
      className="rounded-xl border p-4 transition-all duration-500 flex flex-col justify-between"
      style={{ borderColor: '#D6E4EF', background: '#FFFFFF', boxShadow: pulse ? `0 0 0 3px ${t.c}55, 0 8px 24px ${t.c}22` : 'none', transform: pulse ? 'translateY(-3px)' : 'none' }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>{label}</p>
        <span className="w-2 h-2 rounded-full transition-colors duration-500" style={{ background: t.c }} />
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: '#EAF0F6' }}>
        <div className="h-full rounded-full" style={{ width: `${Math.max(state.level * 100, 4)}%`, background: t.c, transition: 'width 0.9s cubic-bezier(.34,1.2,.5,1), background 0.6s' }} />
      </div>
      <p className="text-[0.9rem] font-semibold mt-3 transition-colors duration-500" style={{ color: state.tone === 'idle' ? '#94A3B8' : t.text }}>{state.value}</p>
    </div>
  )
}

function SignalLights({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const s = i < current ? 'on' : i === current ? 'active' : 'off'
        return <div key={i} className="rounded-full transition-all duration-500"
          style={{
            width: s === 'active' ? '11px' : '9px', height: s === 'active' ? '11px' : '9px',
            background: s === 'on' ? '#4BAE7F' : s === 'active' ? '#2F80ED' : '#D6E4EF',
            boxShadow: s === 'active' ? '0 0 0 4px rgba(47,128,237,0.15)' : 'none',
          }} />
      })}
    </div>
  )
}

function SnapshotStrip({ stages, current }: { stages: CockpitStage[]; current: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((s, i) => {
        const on = i < current
        return <span key={s.id}
          className="text-[0.7rem] font-medium px-3 py-1.5 rounded-full border"
          style={{
            borderColor: on ? '#4BAE7F' : '#D6E4EF', background: on ? '#EAF6F0' : '#FFFFFF', color: on ? '#2D7355' : '#94A3B8',
            transform: on ? 'translateY(0)' : 'translateY(0)', opacity: 1,
            transition: 'all 0.5s', animation: on ? 'chipIn 0.5s ease' : 'none',
          }}>
          {on ? '✓ ' : ''}{s.chip}
        </span>
      })}
    </div>
  )
}

// "Signal detected" toast that appears and fades
function SignalToast({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full"
      style={{ background: '#17324D', boxShadow: '0 8px 24px rgba(23,50,77,0.25)', animation: 'toastIn 0.4s ease' }}>
      <span className="w-2 h-2 rounded-full" style={{ background: '#4BAE7F' }} />
      <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-white">Signal detected</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ENGINE
   ───────────────────────────────────────────── */
export default function DiagnosticCockpit({ config }: { config: CockpitConfig }) {
  const [phase, setPhase]     = useState<'intro' | 'play' | 'contact' | 'result'>('intro')
  const [idx, setIdx]         = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [textVal, setTextVal] = useState('')
  const [showInsight, setShow]= useState(false)
  const [pulseKey, setPulse]  = useState<string | null>(null)
  const [toast, setToast]     = useState(false)
  const [contact, setContact] = useState<Contact>({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)

  const TOTAL  = config.stages.length
  const stage  = config.stages[idx]
  const panels = config.computePanels(answers)
  const unlocked = idx + (showInsight ? 1 : 0)

  function answer(value: string) {
    setAnswers(prev => ({ ...prev, [stage.id]: value }))
    setPulse(config.panels[idx % config.panels.length]?.key ?? null)
    setToast(true)
    setShow(true)
    setTimeout(() => setToast(false), 1400)
    setTimeout(() => setPulse(null), 900)
  }

  function next() {
    setShow(false)
    if (idx + 1 < TOTAL) { setIdx(idx + 1); setTextVal('') }
    else setPhase('contact')
  }

  async function submit() {
    if (!contact.name.trim() || !contact.email.trim()) return
    setLoading(true)
    try {
      await fetch(config.apiPath, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config.buildPayload(answers, contact)) })
    } catch {}
    setLoading(false); setPhase('result')
  }

  /* INTRO */
  if (phase === 'intro') {
    return (
      <Shell config={config}>
        <div className="text-center max-w-xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: '#E7F2FA' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#2F80ED', animation: 'softPulse 1.8s infinite' }} />
            <span className="text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: '#2F80ED' }}>Simulator ready</span>
          </div>
          <h1 className="font-serif text-[2rem] sm:text-[2.6rem] leading-tight mb-4" style={{ color: '#17324D' }}>{config.name}</h1>
          <p className="text-[1.05rem] mb-8 leading-relaxed" style={{ color: '#64748B' }}>{config.intro}</p>
          <button onClick={() => setPhase('play')} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
            style={{ background: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.25)' }}>Step inside →</button>
          <p className="text-[0.8rem] mt-5" style={{ color: '#94A3B8' }}>{config.introSub}</p>
        </div>
      </Shell>
    )
  }

  /* CONTACT */
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
            {[{ k: 'name', label: 'Your name', ph: 'First and last name', req: true, type: 'text' },
              { k: 'email', label: 'Email address', ph: 'you@company.com', req: true, type: 'email' },
              { k: 'phone', label: 'Phone', ph: 'Optional', req: false, type: 'tel' }].map(f => (
              <div key={f.k}>
                <label className="text-[0.75rem] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: '#64748B' }}>{f.label} {f.req && <span style={{ color: '#2F80ED' }}>*</span>}</label>
                <input type={f.type} value={contact[f.k as keyof Contact]} onChange={e => setContact({ ...contact, [f.k]: e.target.value })} placeholder={f.ph}
                  className="w-full rounded-xl border px-4 py-3.5 text-[0.95rem] outline-none transition-colors" style={{ borderColor: '#D6E4EF', color: '#17324D' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#2F80ED')} onBlur={e => (e.currentTarget.style.borderColor = '#D6E4EF')} />
              </div>
            ))}
            <button onClick={submit} disabled={loading || !contact.name.trim() || !contact.email.trim()}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40" style={{ background: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.22)' }}>
              {loading ? 'Opening your file…' : 'Open my diagnostic file'}
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  /* RESULT — file assembles row by row */
  if (phase === 'result') {
    const file = config.buildResult(answers)
    return (
      <Shell config={config}>
        <FinalFile file={file} config={config} />
      </Shell>
    )
  }

  /* PLAY */
  return (
    <Shell config={config}>
      <div className="relative">
        <SignalToast show={toast} />
        <div className="mb-6 flex items-center justify-between">
          <SignalLights total={TOTAL} current={unlocked} />
          <p className="text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Signal {idx + 1} of {TOTAL}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Cockpit */}
          <div className="lg:col-span-3 order-1">
            <div className="rounded-2xl border p-5" style={{ borderColor: '#D6E4EF', background: '#F4F8FB', position: 'relative', overflow: 'hidden' }}>
              {/* ambient drift */}
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(47,128,237,0.05), transparent 60%)', animation: 'drift 9s ease-in-out infinite' }} />
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider mb-4 relative" style={{ color: '#64748B' }}>Live cockpit</p>
              <div className="grid grid-cols-2 gap-3 relative">
                {config.panels.map(p =>
                  panels[p.key].kind === 'gauge'
                    ? <Gauge key={p.key} label={p.label} state={panels[p.key]} pulse={pulseKey === p.key} />
                    : <FillMeter key={p.key} label={p.label} state={panels[p.key]} pulse={pulseKey === p.key} />
                )}
              </div>
            </div>
          </div>

          {/* Decision / insight */}
          <div className="lg:col-span-2 order-2">
            <div className="rounded-2xl border p-5 h-full flex flex-col" style={{ borderColor: '#D6E4EF', background: '#FFFFFF' }}>
              {!showInsight ? (
                <>
                  <div className="inline-flex items-center gap-2 mb-4 self-start px-3 py-1.5 rounded-full" style={{ background: '#E7F2FA' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2F80ED', animation: 'softPulse 1.8s infinite' }} />
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: '#2F80ED' }}>{stage.signal}</span>
                  </div>
                  <h2 className="font-serif text-[1.25rem] leading-snug mb-5" style={{ color: '#17324D' }}>{stage.prompt}</h2>
                  {stage.type === 'text' ? (
                    <div className="mt-auto space-y-3">
                      <textarea value={textVal} onChange={e => setTextVal(e.target.value)} rows={3} placeholder={stage.placeholder}
                        className="w-full rounded-xl border px-4 py-3 text-[0.92rem] outline-none resize-none" style={{ borderColor: '#D6E4EF', color: '#17324D' }} autoFocus />
                      <button onClick={() => textVal.trim() && answer(textVal.trim())} disabled={!textVal.trim()}
                        className="w-full py-3 rounded-xl font-semibold text-white transition disabled:opacity-40" style={{ background: '#2F80ED' }}>Log this signal</button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {stage.options!.map(opt => (
                        <button key={opt.value} onClick={() => answer(opt.value)}
                          className="w-full text-left px-4 py-3.5 rounded-xl border text-[0.9rem] transition-all duration-150 active:scale-[0.98]"
                          style={{ borderColor: '#D6E4EF', background: '#FFFFFF', color: '#17324D' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#2F80ED'; e.currentTarget.style.background = '#F4F8FB' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#D6E4EF'; e.currentTarget.style.background = '#FFFFFF' }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col h-full" style={{ animation: 'fadeUp 0.4s ease' }}>
                  <div className="inline-flex items-center gap-2 mb-4 self-start px-3 py-1.5 rounded-full" style={{ background: '#EAF6F0' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4BAE7F' }} />
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: '#2D7355' }}>Reading updated</span>
                  </div>
                  <p className="text-[1rem] leading-relaxed mb-6" style={{ color: '#17324D' }}>{stage.insight}</p>
                  <button onClick={next} className="mt-auto w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
                    style={{ background: '#2F80ED', boxShadow: '0 6px 18px rgba(47,128,237,0.22)' }}>
                    {idx + 1 < TOTAL ? 'Next signal →' : 'Generate my file →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: '#D6E4EF', background: '#FFFFFF' }}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-wider mb-3" style={{ color: '#94A3B8' }}>Snapshot building</p>
          <SnapshotStrip stages={config.stages} current={unlocked} />
        </div>
      </div>
    </Shell>
  )
}

/* Final file that assembles row by row */
function FinalFile({ file, config }: { file: { headline: string; reference: string; rows: ResultRow[] }; config: CockpitConfig }) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (shown < file.rows.length) {
      const t = setTimeout(() => setShown(s => s + 1), 320)
      return () => clearTimeout(t)
    }
  }, [shown, file.rows.length])

  return (
    <div className="max-w-2xl mx-auto">
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
      <div className="rounded-b-2xl border border-t-0 p-6 sm:p-8 space-y-6" style={{ borderColor: '#D6E4EF', background: '#FFFFFF' }}>
        {file.rows.map((row, i) => {
          if (i >= shown) return null
          const t = row.tone && row.tone !== 'plain' ? TONE[row.tone] : null
          return (
            <div key={i} className="flex gap-4" style={{ animation: 'fadeUp 0.4s ease' }}>
              <span className="font-mono text-[0.8rem] pt-0.5 flex-shrink-0" style={{ color: '#94A3B8' }}>{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>{row.label}</p>
                  {t && <span className="w-2 h-2 rounded-full" style={{ background: t.c }} />}
                </div>
                <p className="text-[1rem] leading-relaxed" style={{ color: t ? t.text : '#17324D', fontWeight: t ? 600 : 400 }}>{row.body}</p>
              </div>
            </div>
          )
        })}
        {shown >= file.rows.length && (
          <div className="pt-6 mt-2 border-t" style={{ borderColor: '#E7F2FA', animation: 'fadeUp 0.4s ease' }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
              style={{ background: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.22)' }}>{config.cta.primary} →</a>
            <p className="text-center text-[0.85rem] mt-3" style={{ color: '#64748B' }}>{config.cta.secondary}</p>
            <p className="text-center text-[0.72rem] mt-2" style={{ color: '#94A3B8' }}>{config.cta.trust}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Shell({ config, children }: { config: CockpitConfig; children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#F4F8FB', paddingTop: '80px' }}>
      <style>{`
        @keyframes softPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-8px)} to{opacity:1;transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chipIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,8px)} }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href={config.backHref} className="text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: '#64748B' }}>← {config.backLabel}</Link>
          <p className="text-[0.7rem] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{config.kicker}</p>
        </div>
        <div className="rounded-3xl border p-5 sm:p-8" style={{ borderColor: '#D6E4EF', background: '#FFFFFF', boxShadow: '0 20px 60px rgba(23,50,77,0.06)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
