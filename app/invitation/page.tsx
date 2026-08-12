'use client'

import { useState } from 'react'

const GREEN='#0F2E1D', GREEN2='#123524', BRONZE='#E8650D', BODY='#3C4A40', CHAR='#2B2B26'
const card = { borderColor:'rgba(18,53,36,0.15)' }
const inputStyle = { borderColor:'rgba(18,53,36,0.2)', color:CHAR }

const includes = [
  { t:'Mandate lock', d:'We agree your search focus and protect it. We do not run the same active search for another buyer while your lane is live.' },
  { t:'100 company target map', d:'We build a researched list of 100 UK care businesses that may fit your criteria.' },
  { t:'7 Day Mandate Match', d:'In the first 7 days, we match your mandate against the market. We map targets, begin careful owner outreach, and show you the first real signal fast.' },
  { t:'Seller readiness scoring', d:'We assess each company for fit, timing, and how ready it may be for a buyer conversation.' },
  { t:'Reputation safe outreach', d:'We contact owners carefully. The message protects your reputation and does not pressure the owner.' },
  { t:'Weekly evidence pack', d:'Each week, you receive a clear summary of targets added, owners contacted, replies, next steps, and what we are learning.' },
  { t:'Monthly market readout', d:'Each month, you receive a simple view of what the market is showing: owner timing, common objections, live interest, and opportunity signals.' },
  { t:'Board progress pack', d:'You receive a clean update that can be shared with partners, investors, or board members.' },
  { t:'Acquisition cockpit', d:'You receive a live dashboard showing the target map, outreach status, touchpoints, and next actions.' },
  { t:'Owner relationship asset', d:'The owner pipeline becomes a real asset. Even if an owner is not ready today, the relationship may matter later.' },
]

const fitQs = [
  { id:'q1', text:'Are you actively looking to acquire UK care businesses in the next 6 to 12 months?' },
  { id:'q2', text:'Do you have funding in place, or a clear route to funding?' },
  { id:'q3', text:'Do you have clear acquisition criteria?' },
  { id:'q4', text:'If the 7 Day Mandate Match shows a genuine fit, are you comfortable moving into a retained 90 day mandate at £2,999 per month, paid monthly in advance?' },
]

const buyerTypes = ['Operator','Fund','Search fund','Investor group','Family office','Other']

const appFields = [
  { k:'fullName',  label:'Full name',                 ph:'First and last name', req:true,  type:'text' },
  { k:'company',   label:'Company',                   ph:'Company or fund name', req:true, type:'text' },
  { k:'email',     label:'Email',                     ph:'you@company.com',     req:true,  type:'email' },
  { k:'phone',     label:'Phone (optional)',          ph:'+44 or international', req:false, type:'tel' },
  { k:'criteria',  label:'Acquisition criteria',      ph:'e.g. care homes, 40+ beds, Good CQC', req:true, type:'text' },
  { k:'geography', label:'Target geography',          ph:'e.g. North West England, UK wide', req:true, type:'text' },
  { k:'size',      label:'Target business size',      ph:'EBITDA range or beds', req:true, type:'text' },
  { k:'funding',   label:'Funding position',          ph:'e.g. capital in place, bank backed', req:true, type:'text' },
  { k:'timeline',  label:'Timeline to acquire',       ph:'e.g. next 6 to 12 months', req:true, type:'text' },
  { k:'experience',label:'Existing care sector experience', ph:'Briefly, if any', req:false, type:'text' },
  { k:'exclusions',label:'Any excluded regions, company types, or conflicts', ph:'Optional', req:false, type:'text' },
  { k:'whyNow',    label:'Why this search matters now', ph:'One or two lines', req:true, type:'text' },
]

export default function InvitationPage() {
  const [stage, setStage] = useState<'access'|'offer'|'fit'|'blocked'|'form'|'done'>('access')
  const [firstName, setFirstName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [accessEmail, setAccessEmail] = useState('')
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [form, setForm] = useState<Record<string,string>>({})
  const [buyerType, setBuyerType] = useState('')
  const [message, setMessage] = useState('')
  const [ack, setAck] = useState(false)
  const [loading, setLoading] = useState(false)

  function answerFit(v:string){
    const q = fitQs[qIdx]
    setAnswers(p=>({...p,[q.id]:v}))
    if(q.id==='q4' && v==='No'){ setStage('blocked'); return }
    if(qIdx+1<fitQs.length) setQIdx(qIdx+1)
    else setStage('form')
  }

  async function submit(){
    const ok = appFields.filter(f=>f.req).every(f=>(form[f.k]||'').trim()) && buyerType && ack
    if(!ok) return
    setLoading(true)
    try{
      await fetch('/api/submit-invitation',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({firstName,companyName,accessEmail,...answers,...form,buyerType,message,ack})})
    }catch{}
    setLoading(false); setStage('done')
  }

  const Rule = () => <div className="w-10 h-[1px] mx-auto mb-10" style={{background:BRONZE}} />

  return (
    <div className="min-h-screen marble-bg" style={{paddingTop:'96px'}}>
      <div className="max-w-[680px] mx-auto px-6 pb-28">

        {/* 1. PRIVATE ACCESS SCREEN */}
        {stage==='access' && (
          <div className="pt-12 text-center animate-fade-in" style={{animationDuration:'0.6s'}}>
            <Rule />
            <p className="eyebrow mb-6" style={{color:BRONZE}}>Prosaria · Private</p>
            <h1 className="font-serif text-display-xl leading-tight mb-6" style={{color:GREEN}}>
              Private Buyer Lane Invitation
            </h1>
            <p className="text-body-md mb-10 max-w-[44ch] mx-auto" style={{color:BODY}}>
              This invitation is for selected buyers, funds, and operators looking to acquire UK care businesses.
            </p>
            <div className="max-w-[380px] mx-auto space-y-4 text-left">
              {[
                {v:firstName,set:setFirstName,label:'First name',ph:'Your first name',t:'text'},
                {v:companyName,set:setCompanyName,label:'Company name',ph:'Company or fund',t:'text'},
                {v:accessEmail,set:setAccessEmail,label:'Email',ph:'you@company.com',t:'email'},
              ].map(f=>(
                <div key={f.label}>
                  <label className="text-label block mb-2 uppercase tracking-widest" style={{color:BODY}}>{f.label}</label>
                  <input type={f.t} value={f.v} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                    className="w-full rounded-xl border px-5 py-4 text-body-sm outline-none bg-white transition-colors" style={inputStyle}
                    onFocus={e=>(e.currentTarget.style.borderColor=GREEN2)} onBlur={e=>(e.currentTarget.style.borderColor='rgba(18,53,36,0.2)')} />
                </div>
              ))}
              <button onClick={()=>firstName.trim()&&companyName.trim()&&accessEmail.trim()&&setStage('offer')}
                disabled={!firstName.trim()||!companyName.trim()||!accessEmail.trim()}
                className="btn-primary w-full justify-center py-4 disabled:opacity-40">
                View my invitation
              </button>
            </div>
          </div>
        )}

        {/* 2-4. OFFER + INCLUDES + PROOF TO PROCEED */}
        {stage==='offer' && (
          <div className="pt-8 animate-fade-in" style={{animationDuration:'0.5s'}}>
            <p className="eyebrow mb-6" style={{color:BRONZE}}>Private invitation for {firstName}</p>
            <h2 className="font-serif text-display-md mb-6 leading-snug" style={{color:GREEN}}>
              You are being invited to apply for a reserved buyer lane.
            </h2>
            <p className="text-body-md mb-4 leading-relaxed" style={{color:BODY}}>
              A buyer lane means Prosaria builds a focused search around your acquisition criteria. We map the market, approach owners carefully, track the conversations, and show you what the market is saying.
            </p>
            <p className="text-body-md mb-12 leading-relaxed" style={{color:BODY}}>
              The goal is not to send you random names. The goal is to build real owner conversations with care businesses that may fit your mandate.
            </p>

            <p className="eyebrow mb-6" style={{color:BRONZE}}>Your reserved buyer lane includes</p>
            <div className="space-y-3 mb-12">
              {includes.map((x,i)=>(
                <div key={x.t} className="bg-white rounded-2xl border p-5 animate-fade-in"
                  style={{...card,animationDuration:'0.4s',animationDelay:`${0.05+i*0.05}s`,animationFillMode:'backwards'}}>
                  <p className="font-serif text-[1rem] mb-1" style={{color:GREEN}}>{x.t}</p>
                  <p className="text-body-sm" style={{color:BODY}}>{x.d}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border p-7 mb-6" style={{borderColor:'rgba(232,101,13,0.35)'}}>
              <p className="eyebrow mb-3" style={{color:BRONZE}}>How it starts</p>
              <p className="font-serif text-[1.15rem] mb-3" style={{color:GREEN}}>7 Day Mandate Match</p>
              <p className="text-body-sm leading-relaxed" style={{color:BODY}}>
                Every lane starts with a 7 Day Mandate Match. In the first 7 days, we match your mandate against the market and show you the first real signal. This gives both sides a fast, honest read on the fit before anything longer term.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-7 mb-12" style={{borderColor:'rgba(18,53,36,0.25)'}}>
              <p className="eyebrow mb-3" style={{color:BRONZE}}>The engagement</p>
              <p className="font-serif text-[1.15rem] mb-3" style={{color:GREEN}}>Retained 90 day mandate — £2,999 per month</p>
              <p className="text-body-sm leading-relaxed mb-3" style={{color:BODY}}>
                If the Mandate Match shows a genuine fit, the lane moves to a retained 90 day mandate. The retainer is £2,999 per month, locked in for 90 days, paid monthly in advance.
              </p>
              <p className="text-body-sm leading-relaxed" style={{color:BODY}}>
                One buyer holds one lane. Your search focus is protected for the full term.
              </p>
            </div>

            <button onClick={()=>setStage('fit')} className="btn-primary w-full justify-center py-4">
              Continue
            </button>
          </div>
        )}

        {/* 5. FIT QUESTIONS */}
        {stage==='fit' && (
          <div className="pt-8 animate-fade-in" style={{animationDuration:'0.4s'}} key={qIdx}>
            <div className="flex items-center gap-2 mb-10">
              {fitQs.map((_,i)=>(
                <div key={i} className="h-[3px] flex-1 rounded-full transition-all duration-500"
                  style={{background:i<=qIdx?GREEN2:'#E2DACB'}} />
              ))}
            </div>
            {qIdx===0 && (
              <>
                <p className="eyebrow mb-3" style={{color:BRONZE}}>A few fit questions</p>
                <p className="text-body-sm mb-8" style={{color:BODY}}>
                  Before you apply, we ask a few simple questions. This helps us protect each buyer lane and make sure the work is useful for both sides.
                </p>
              </>
            )}
            <p className="eyebrow mb-4" style={{color:BRONZE}}>Question {qIdx+1} of {fitQs.length}</p>
            <h2 className="font-serif text-display-md mb-10 leading-snug" style={{color:GREEN}}>
              {fitQs[qIdx].text}
            </h2>
            <div className="space-y-3">
              {['Yes','No'].map(opt=>(
                <button key={opt} onClick={()=>answerFit(opt)}
                  className="w-full text-left px-6 py-5 rounded-xl border bg-white text-body-md transition-all duration-150"
                  style={{...inputStyle}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=GREEN2;e.currentTarget.style.background='#F1EBE0'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(18,53,36,0.2)';e.currentTarget.style.background='#FFFFFF'}}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q4 BLOCK */}
        {stage==='blocked' && (
          <div className="pt-16 text-center animate-fade-in" style={{animationDuration:'0.5s'}}>
            <Rule />
            <h2 className="font-serif text-display-md mb-6 leading-snug" style={{color:GREEN}}>
              Thank you for your interest.
            </h2>
            <p className="text-body-md leading-relaxed max-w-[46ch] mx-auto" style={{color:BODY}}>
              At this stage, this invitation is only suitable for buyers who are comfortable moving into a retained 90 day mandate at £2,999 per month if the 7 Day Mandate Match shows a genuine fit.
            </p>
          </div>
        )}

        {/* 6. APPLICATION FORM */}
        {stage==='form' && (
          <div className="pt-8 animate-fade-in" style={{animationDuration:'0.5s'}}>
            <p className="eyebrow mb-4" style={{color:BRONZE}}>Buyer lane application</p>
            <h2 className="font-serif text-display-md mb-3 leading-snug" style={{color:GREEN}}>
              Tell us about your search.
            </h2>
            <p className="text-body-sm mb-10" style={{color:BODY}}>
              Nathan reviews every application personally. Nothing here is shared.
            </p>

            <div className="space-y-5 mb-6">
              <div>
                <label className="text-label block mb-2 uppercase tracking-widest" style={{color:BODY}}>
                  Buyer type <span style={{color:GREEN2}}>*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {buyerTypes.map(bt=>(
                    <button key={bt} onClick={()=>setBuyerType(bt)}
                      className="px-4 py-2.5 rounded-full border text-body-sm transition-all duration-150"
                      style={buyerType===bt
                        ? {borderColor:GREEN2,background:'#E9F0EA',color:GREEN}
                        : {borderColor:'rgba(18,53,36,0.2)',background:'#FFFFFF',color:BODY}}>
                      {bt}
                    </button>
                  ))}
                </div>
              </div>

              {appFields.map(f=>(
                <div key={f.k}>
                  <label className="text-label block mb-2 uppercase tracking-widest" style={{color:BODY}}>
                    {f.label} {f.req && <span style={{color:GREEN2}}>*</span>}
                  </label>
                  <input type={f.type} value={form[f.k]||''} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                    placeholder={f.ph}
                    className="w-full rounded-xl border px-5 py-4 text-body-sm outline-none bg-white transition-colors" style={inputStyle}
                    onFocus={e=>(e.currentTarget.style.borderColor=GREEN2)} onBlur={e=>(e.currentTarget.style.borderColor='rgba(18,53,36,0.2)')} />
                </div>
              ))}

              <div>
                <label className="text-label block mb-2 uppercase tracking-widest" style={{color:BODY}}>Message (optional)</label>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={3}
                  placeholder="Anything else that helps us understand the search"
                  className="w-full rounded-xl border px-5 py-4 text-body-sm outline-none resize-none bg-white" style={inputStyle} />
              </div>

              <label className="flex gap-3 items-start cursor-pointer bg-white rounded-xl border p-5" style={card}>
                <input type="checkbox" checked={ack} onChange={e=>setAck(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#123524] flex-shrink-0" />
                <span className="text-body-sm leading-relaxed" style={{color:BODY}}>
                  I understand that every lane starts with a 7 Day Mandate Match, and that continuation requires a retained 90 day mandate at £2,999 per month, locked in for 90 days and paid monthly in advance.
                </span>
              </label>
            </div>

            <button onClick={submit}
              disabled={loading || !buyerType || !ack || !appFields.filter(f=>f.req).every(f=>(form[f.k]||'').trim())}
              className="btn-primary w-full justify-center py-4 disabled:opacity-40">
              {loading?'Submitting…':'Submit buyer lane application'}
            </button>
          </div>
        )}

        {/* 7. THANK YOU */}
        {stage==='done' && (
          <div className="pt-16 text-center animate-fade-in" style={{animationDuration:'0.5s'}}>
            <Rule />
            <h2 className="font-serif text-display-md mb-6 leading-snug" style={{color:GREEN}}>
              Thank you. Nathan will review this personally.
            </h2>
            <p className="text-body-md leading-relaxed max-w-[42ch] mx-auto" style={{color:BODY}}>
              If the mandate looks like a fit, the next step is a private review call.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
