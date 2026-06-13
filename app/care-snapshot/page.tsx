'use client'

import DiagnosticCockpit, { CockpitConfig, PanelState } from '@/components/cockpit/DiagnosticCockpit'

const ref = () => 'EXR-2026-' + Math.floor(1000 + Math.random() * 8999)

const SCORES: Record<string, Record<string, number>> = {
  revenue:   { 'under-500k': 0, '500k-1m': 1, '1m-3m': 2, 'over-3m': 2 },
  occupancy: { 'under-70': 0, '70-80': 1, '80-90': 2, 'over-90': 2 },
  manager:   { yes: 2, transition: 1, no: 0 },
  cqc:       { outstanding: 3, good: 2, requires: 1, inadequate: 0, 'not-rated': 1 },
  timeframe: { 'under-12m': 0, '1-2y': 1, '2-5y': 2, exploring: 2 },
}

function careScore(a: Record<string, string>) {
  return Object.entries(SCORES).reduce((s, [k, map]) => s + (map[a[k]] ?? 0), 0)
}

const careConfig: CockpitConfig = {
  name: 'The Exit Readiness Cockpit',
  kicker: 'Prosaria · Care M&A',
  intro: 'Step into a two minute exit readiness simulator and see how a buyer may read your care business today.',
  introSub: 'For care home, home care and supported living owners.',
  backHref: '/work#care',
  backLabel: 'Healthcare M&A',
  apiPath: '/api/submit-care',

  panels: [
    { key: 'confidence', label: 'Buyer Confidence' },
    { key: 'stability',  label: 'Operational Stability' },
    { key: 'dependency', label: 'Owner Dependency' },
    { key: 'timing',     label: 'Timing Runway' },
  ],

  stages: [
    {
      id: 'revenue', signal: 'Revenue Signal', chip: 'Revenue Signal',
      prompt: 'Roughly what does your care business turn over each year?',
      insight: 'Revenue sets the buyer universe. Different sizes attract very different buyers.',
      options: [
        { label: 'Under £500k',  value: 'under-500k' },
        { label: '£500k to £1m', value: '500k-1m' },
        { label: '£1m to £3m',   value: '1m-3m' },
        { label: 'Over £3m',     value: 'over-3m' },
      ],
    },
    {
      id: 'size', signal: 'Scale Marker', chip: 'Scale Marker', type: 'text',
      prompt: 'How many beds or service users does the business have?',
      placeholder: 'e.g. 40 beds, or 120 service users',
      insight: 'Scale gives buyers a quick read on the size of the operation and the team behind it.',
    },
    {
      id: 'occupancy', signal: 'Occupancy Signal', chip: 'Occupancy',
      prompt: 'What is your current occupancy or capacity level?',
      insight: 'Occupancy gives buyers a fast signal of demand and operational health.',
      options: [
        { label: 'Under 70%', value: 'under-70' },
        { label: '70 to 80%', value: '70-80' },
        { label: '80 to 90%', value: '80-90' },
        { label: 'Over 90%',  value: 'over-90' },
      ],
    },
    {
      id: 'manager', signal: 'Management Stability', chip: 'Management',
      prompt: 'Do you have a registered manager in post?',
      insight: 'A strong registered manager lowers perceived handover risk. Buyers notice this early.',
      options: [
        { label: 'Yes, in post and stable', value: 'yes' },
        { label: 'In transition',           value: 'transition' },
        { label: 'No',                      value: 'no' },
      ],
    },
    {
      id: 'cqc', signal: 'CQC Confidence', chip: 'CQC',
      prompt: 'What is your most recent CQC rating?',
      insight: 'CQC does not just affect compliance. It shapes buyer confidence before any numbers are discussed.',
      options: [
        { label: 'Outstanding',          value: 'outstanding' },
        { label: 'Good',                 value: 'good' },
        { label: 'Requires improvement', value: 'requires' },
        { label: 'Inadequate',           value: 'inadequate' },
        { label: 'Not yet rated',        value: 'not-rated' },
      ],
    },
    {
      id: 'timeframe', signal: 'Timing Runway', chip: 'Timing',
      prompt: 'What is your rough timeframe for an exit or step back?',
      insight: 'The best exit conversations usually start before the owner needs one. Runway gives you choices.',
      options: [
        { label: 'Under 12 months', value: 'under-12m' },
        { label: '1 to 2 years',    value: '1-2y' },
        { label: '2 to 5 years',    value: '2-5y' },
        { label: 'Just exploring',  value: 'exploring' },
      ],
    },
  ],

  computePanels: (a): Record<string, PanelState> => {
    // BUYER CONFIDENCE (gauge) — driven by CQC
    const confLevel = a.cqc === 'outstanding' ? 0.95 : a.cqc === 'good' ? 0.75 : a.cqc === 'requires' ? 0.4 : a.cqc === 'not-rated' ? 0.45 : a.cqc === 'inadequate' ? 0.12 : 0
    const cqcTone = (a.cqc === 'outstanding' || a.cqc === 'good') ? 'good' : (a.cqc === 'requires' || a.cqc === 'not-rated') ? 'warn' : a.cqc ? 'alert' : 'idle'
    const confVal = !a.cqc ? 'Standby' : a.cqc === 'outstanding' ? 'Strong' : a.cqc === 'good' ? 'Solid' : (a.cqc === 'requires' || a.cqc === 'not-rated') ? 'Some caution' : 'Low'

    // OPERATIONAL STABILITY (bar) — occupancy
    const occLevel = a.occupancy === 'over-90' ? 0.95 : a.occupancy === '80-90' ? 0.75 : a.occupancy === '70-80' ? 0.5 : a.occupancy === 'under-70' ? 0.25 : 0
    const occTone = (a.occupancy === 'over-90' || a.occupancy === '80-90') ? 'good' : a.occupancy === '70-80' ? 'warn' : a.occupancy ? 'alert' : 'idle'
    const stabVal = !a.occupancy ? 'Standby' : a.occupancy === 'over-90' ? 'High demand' : a.occupancy === '80-90' ? 'Healthy' : a.occupancy === '70-80' ? 'Moderate' : 'Soft'

    // OWNER DEPENDENCY (gauge) — higher level = lower dependency (good)
    const depLevel = a.manager === 'yes' ? 0.92 : a.manager === 'transition' ? 0.5 : a.manager === 'no' ? 0.15 : 0
    const depTone = a.manager === 'yes' ? 'good' : a.manager === 'transition' ? 'warn' : a.manager === 'no' ? 'alert' : 'idle'
    const depVal = !a.manager ? 'Standby' : a.manager === 'yes' ? 'Low, manager in post' : a.manager === 'transition' ? 'Some risk' : 'High, owner led'

    // TIMING RUNWAY (bar)
    const timeLevel = a.timeframe === '2-5y' ? 0.92 : a.timeframe === 'exploring' ? 0.85 : a.timeframe === '1-2y' ? 0.55 : a.timeframe === 'under-12m' ? 0.2 : 0
    const timeTone = (a.timeframe === '2-5y' || a.timeframe === 'exploring') ? 'good' : a.timeframe === '1-2y' ? 'warn' : a.timeframe ? 'alert' : 'idle'
    const timeVal = !a.timeframe ? 'Standby' : a.timeframe === 'under-12m' ? 'Tight' : a.timeframe === '1-2y' ? 'Workable' : 'Comfortable'

    return {
      confidence: { value: confVal, level: confLevel, tone: cqcTone,  kind: 'gauge' },
      stability:  { value: stabVal, level: occLevel,  tone: occTone,  kind: 'bar' },
      dependency: { value: depVal,  level: depLevel,  tone: depTone,  kind: 'gauge' },
      timing:     { value: timeVal, level: timeLevel, tone: timeTone, kind: 'bar' },
    }
  },

  buildResult: (a) => {
    const score = careScore(a)
    const position = score <= 4 ? 'Early Stage' : score <= 8 ? 'Building Readiness' : 'Strong Position'

    // strongest / weakest answer
    const scored = Object.entries(SCORES).map(([k, map]) => ({ k, v: map[a[k]] ?? 0 }))
    const strong = [...scored].sort((x, y) => y.v - x.v)[0]
    const weak   = [...scored].sort((x, y) => x.v - y.v)[0]
    const label: Record<string, string> = {
      revenue: 'the scale of the business', occupancy: 'your occupancy level',
      manager: 'your management stability', cqc: 'your CQC standing', timeframe: 'your exit timing',
    }
    const strengthBody = `Your strongest signal is ${label[strong.k]}. Buyers tend to start there and it works in your favour.`
    const riskBody =
      weak.k === 'manager' && a.manager !== 'yes' ? 'Owner dependency. If the business leans on you personally, buyers price in handover risk.' :
      weak.k === 'cqc' && (a.cqc === 'requires' || a.cqc === 'inadequate') ? 'CQC standing. A rating below Good invites caution before any numbers are discussed.' :
      weak.k === 'occupancy' ? 'Occupancy. Softer occupancy makes buyers question future earnings.' :
      `There is room to strengthen ${label[weak.k]} before a sale process.`

    const buyerQ =
      a.manager !== 'yes' ? 'Can this business keep running smoothly after the owner steps back?' :
      (a.cqc === 'requires' || a.cqc === 'inadequate') ? 'Would CQC create confidence or caution?' :
      (a.occupancy === 'under-70' || a.occupancy === '70-80') ? 'Is occupancy strong enough to support confidence in future earnings?' :
      'Is the management structure stable enough for a clean handover?'

    const noticeBody =
      position === 'Strong Position' ? 'A stable, well run business that could transfer with limited disruption.' :
      position === 'Building Readiness' ? 'A solid business with one or two areas a buyer would want comfort on first.' :
      'Real potential, with a few things a buyer would want addressed before moving.'

    const move =
      position === 'Strong Position' ? 'You are in a good spot to open a quiet conversation whenever you choose.' :
      'Strengthen the weakest signal above over the next few months, then revisit. Starting early keeps your options open.'

    return {
      headline: 'Exit Readiness Diagnostic File',
      reference: ref(),
      rows: [
        { label: 'Readiness position', body: position, tone: position === 'Strong Position' ? 'good' : position === 'Building Readiness' ? 'warn' : 'alert' },
        { label: 'What buyers would notice first', body: noticeBody },
        { label: 'Main strength', body: strengthBody, tone: 'good' },
        { label: 'Main risk', body: riskBody, tone: 'warn' },
        { label: 'Likely buyer question', body: `"${buyerQ}"` },
        { label: 'Practical next move', body: move },
      ],
    }
  },

  buildPayload: (a, c) => {
    const score = careScore(a)
    const band = score <= 4 ? 'Early stage' : score <= 8 ? 'Building readiness' : 'Exit ready'
    return {
      name: c.name, email: c.email,
      score, band,
      revenue: a.revenue, size: a.size, occupancy: a.occupancy,
      manager: a.manager, cqc: a.cqc, timeframe: a.timeframe,
    }
  },

  cta: {
    primary: 'Talk through your exit readiness snapshot',
    secondary: '20 minutes. Quiet, direct, and based on your answers.',
    trust: 'Indicative only. Not a valuation.',
  },
}

export default function CareSnapshotPage() {
  return <DiagnosticCockpit config={careConfig} />
}
