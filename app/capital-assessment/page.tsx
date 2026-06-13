'use client'

import DiagnosticCockpit, { CockpitConfig, PanelState } from '@/components/cockpit/DiagnosticCockpit'

const ref = () => 'CFC-2026-' + Math.floor(1000 + Math.random() * 8999)

const staffingConfig: CockpitConfig = {
  name: 'The Cash Flow Cockpit',
  kicker: 'Prosaria · Staffing',
  intro: 'Step into a two minute cash flow simulator and see whether your agency is being limited by sales, cash timing, or funding structure.',
  introSub: 'Built for US healthcare staffing and recruitment owners.',
  backHref: '/work#staffing',
  backLabel: 'Healthcare staffing',
  apiPath: '/api/submit-capital',

  panels: [
    { key: 'payroll', label: 'Payroll Pressure' },
    { key: 'invoice', label: 'Invoice Delay' },
    { key: 'growth',  label: 'Growth Capacity' },
    { key: 'funding', label: 'Funding Fit' },
  ],

  stages: [
    {
      id: 'pain', signal: 'Payroll Signal', chip: 'Payroll Signal',
      prompt: 'How often does covering payroll feel tight while you wait on client invoices?',
      insight: 'This points to a timing problem, not necessarily a sales problem. The two get confused often.',
      options: [
        { label: 'Rarely, we manage fine',            value: 'rarely',    score: 1 },
        { label: 'Sometimes, it creates stress',      value: 'sometimes', score: 2 },
        { label: 'Regularly, it is real pressure',    value: 'regularly', score: 3 },
        { label: 'It is one of our biggest problems', value: 'biggest',   score: 4 },
      ],
    },
    {
      id: 'revenue', signal: 'Agency Scale', chip: 'Agency Scale',
      prompt: 'Roughly what is your agency turning over each year?',
      insight: 'Scale changes the options. Past a certain size, payroll funding built for staffing usually beats a standard facility.',
      options: [
        { label: 'Under $500k',  value: 'under-500k', score: 1 },
        { label: '$500k to $2m', value: '500k-2m',    score: 2 },
        { label: '$2m to $10m',  value: '2m-10m',     score: 3 },
        { label: 'Over $10m',    value: 'over-10m',   score: 4 },
      ],
    },
    {
      id: 'terms', signal: 'Invoice Clock', chip: 'Invoice Delay',
      prompt: 'What payment terms do most of your clients run on?',
      insight: 'Long client terms can make growth feel riskier than it really is. The work is good. The wait is the problem.',
      options: [
        { label: 'Net 15 or faster', value: 'net-15', score: 1 },
        { label: 'Net 30',           value: 'net-30', score: 2 },
        { label: 'Net 45 to 60',     value: 'net-45', score: 3 },
        { label: 'Net 60 or longer', value: 'net-60', score: 4 },
      ],
    },
    {
      id: 'payroll', signal: 'Payroll Cycle', chip: 'Payroll Cycle',
      prompt: 'How often do you run payroll for placed staff?',
      insight: 'Weekly payroll against slow invoices creates pressure before profit becomes visible. That is the squeeze.',
      options: [
        { label: 'Weekly',                  value: 'weekly',    score: 4 },
        { label: 'Every two weeks',         value: 'biweekly',  score: 3 },
        { label: 'Monthly',                 value: 'monthly',   score: 2 },
        { label: 'Permanent placement only',value: 'perm-only', score: 1 },
      ],
    },
    {
      id: 'financing', signal: 'Funding Setup', chip: 'Funding Fit',
      prompt: 'Do you use any funding against your invoices today?',
      insight: 'A funding facility should match payroll rhythm, not just invoice value. Many are set up the wrong way round.',
      options: [
        { label: 'No, we fund from our own cash',  value: 'none',     score: 4 },
        { label: 'We tried it and stopped',        value: 'tried',    score: 3 },
        { label: 'Yes, and it works well',         value: 'yes-good', score: 1 },
        { label: 'Yes, but it could be better',    value: 'yes-poor', score: 3 },
      ],
    },
    {
      id: 'growth', signal: 'Growth Constraint', chip: 'Growth Constraint',
      prompt: 'Have you slowed down or turned down work because of cash flow?',
      insight: 'If cash flow limits contracts, the hidden cost is missed capacity. That is the number worth knowing.',
      options: [
        { label: 'No, cash is not limiting us',       value: 'no',        score: 1 },
        { label: 'Occasionally we slow down',         value: 'sometimes', score: 2 },
        { label: 'Yes, we have turned down work',     value: 'yes',       score: 3 },
        { label: 'It is actively holding us back',    value: 'blocking',  score: 4 },
      ],
    },
    {
      id: 'aspiration', signal: 'Owner Goal', chip: 'Owner Goal', type: 'text',
      prompt: 'In one line, what would change if cash flow was never the limit?',
      placeholder: 'e.g. We could say yes to every contract we are offered',
      insight: 'Noted and printed into your file. This is the part most owners never get to act on.',
    },
  ],

  computePanels: (a): Record<string, PanelState> => {
    const payrollTone =
      (a.payroll === 'weekly' && (a.terms === 'net-45' || a.terms === 'net-60')) ? 'alert' :
      (a.pain === 'biggest' || a.pain === 'regularly') ? 'warn' :
      a.pain ? 'good' : 'idle'
    const payrollVal =
      !a.pain && !a.payroll ? 'Awaiting signal' :
      payrollTone === 'alert' ? 'High' : payrollTone === 'warn' ? 'Elevated' : 'Manageable'

    const invoiceTone = a.terms === 'net-60' ? 'alert' : a.terms === 'net-45' ? 'warn' : a.terms ? 'good' : 'idle'
    const invoiceVal =
      !a.terms ? 'Awaiting signal' :
      a.terms === 'net-60' ? '8 to 10 week gap' :
      a.terms === 'net-45' ? '6 to 8 week gap' :
      a.terms === 'net-30' ? '4 to 5 week gap' : '2 to 3 week gap'

    const growthTone = (a.growth === 'blocking' || a.growth === 'yes') ? 'alert' : a.growth === 'sometimes' ? 'warn' : a.growth ? 'good' : 'idle'
    const growthVal =
      !a.growth ? 'Awaiting signal' :
      (a.growth === 'blocking' || a.growth === 'yes') ? 'Capped by cash' :
      a.growth === 'sometimes' ? 'Occasionally limited' : 'Running free'

    const fundingTone = a.financing === 'none' ? 'warn' : a.financing === 'yes-poor' || a.financing === 'tried' ? 'warn' : a.financing ? 'good' : 'idle'
    const fundingVal =
      !a.financing ? 'Not set' :
      a.financing === 'none' ? 'Self funded' :
      a.financing === 'yes-good' ? 'Facility in place' :
      a.financing === 'tried' ? 'Previously tried' : 'Underperforming'

    return {
      payroll: { value: payrollVal, tone: payrollTone },
      invoice: { value: invoiceVal, tone: invoiceTone },
      growth:  { value: growthVal,  tone: growthTone },
      funding: { value: fundingVal, tone: fundingTone },
    }
  },

  buildResult: (a) => {
    const slow   = a.terms === 'net-45' || a.terms === 'net-60'
    const fast   = a.payroll === 'weekly' || a.payroll === 'biweekly'
    const capped = a.growth === 'blocking' || a.growth === 'yes'
    const selfFunded = a.financing === 'none'
    const lowPressure = a.pain === 'rarely' && !capped

    let constraint = 'Payroll Timing'
    let suggest = 'Your answers point to a gap between when you pay staff and when clients pay you.'
    let hidden = 'Cash that should fund your next placement is tied up in invoices already earned.'
    let fit = 'Staffing-specific payroll funding'
    let move = 'Look at funding structured around your payroll cycle rather than your whole invoice book.'

    if (lowPressure) {
      constraint = 'Low Immediate Pressure'
      suggest = 'Cash flow is steady for now. Your terms and payroll cycle are not creating real strain today.'
      hidden = 'The main risk is future growth outpacing your cash, rather than anything pressing right now.'
      fit = 'Lower urgency / monitor position'
      move = 'Keep an eye on the gap as you grow. Worth a light touch conversation before you scale, not after.'
    } else if (capped) {
      constraint = 'Growth Capacity'
      suggest = 'You are turning down or slowing work that you could deliver. The limit is cash, not demand.'
      hidden = 'The hidden cost is the contracts you never take. That is missed capacity, not lost sales.'
      fit = fast ? 'Staffing-specific payroll funding' : 'Selective invoice finance'
      move = 'Size the funding to the contracts you are currently declining, then stop declining them.'
    } else if (slow && fast) {
      constraint = 'Payroll Timing'
      suggest = 'You pay staff weekly while clients pay slowly. That mismatch is the core pressure.'
      hidden = 'Profit is real but invisible for weeks, so the business feels tighter than it is.'
      fit = 'Staffing-specific payroll funding'
      move = 'Match a facility to your payroll rhythm so wages are covered the moment work is done.'
    } else if (slow) {
      constraint = 'Invoice Delay'
      suggest = 'Client terms are long, which stretches the time between doing the work and getting paid.'
      hidden = 'Working capital sits idle in unpaid invoices instead of funding your next move.'
      fit = 'Selective invoice finance'
      move = 'Draw against your slowest paying invoices rather than your whole book.'
    } else if (a.financing === 'yes-poor' || a.financing === 'tried') {
      constraint = 'Funding Mismatch'
      suggest = 'You have used funding but it has not fit how your agency actually runs.'
      hidden = 'The wrong structure can cost more and deliver less than one built for staffing.'
      fit = 'Existing facility review'
      move = 'Review your current setup against staffing-specific options before renewing.'
    } else if (selfFunded) {
      constraint = 'Funding Mismatch'
      suggest = 'You fund everything yourself. That works until growth asks for more cash than you hold.'
      hidden = 'Self funding quietly caps how fast you can take on new contracts.'
      fit = 'Staffing-specific payroll funding'
      move = 'Put a facility in place before you need it, so growth is never a cash decision.'
    }

    return {
      headline: 'Cash Flow Diagnostic File',
      reference: ref(),
      rows: [
        { label: 'Main constraint', body: constraint, tone: lowPressure ? 'good' : 'warn' },
        { label: 'What your answers suggest', body: suggest },
        { label: 'Hidden cost', body: hidden },
        { label: 'Likely funding fit', body: fit, tone: 'plain' },
        { label: 'Practical next move', body: move },
        { label: 'Your stated goal', body: a.aspiration ? `"${a.aspiration}"` : 'Not provided' },
      ],
    }
  },

  buildPayload: (a, c) => {
    return {
      name: c.name, email: c.email, phone: c.phone,
      pain: a.pain, revenue: a.revenue, terms: a.terms, payroll: a.payroll,
      financing: a.financing, growth: a.growth, aspiration: a.aspiration,
      score: '-', urgency: (a.growth === 'blocking' || a.pain === 'biggest') ? 'High' : 'Medium',
      facility: a.payroll === 'weekly' || a.payroll === 'biweekly' ? 'Staffing-specific payroll funding' : 'Selective invoice finance',
    }
  },

  cta: {
    primary: 'Talk through your cash flow snapshot',
    secondary: '20 minutes. Based on your answers. No obligation.',
    trust: 'Indicative only. Not financial advice.',
  },
}

export default function CapitalAssessmentPage() {
  return <DiagnosticCockpit config={staffingConfig} />
}
