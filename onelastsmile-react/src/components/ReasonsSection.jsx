import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const reasons = [
  { icon:'fa-comment',    title:'Casual Talks',          text:"I love the way you talk casually, like nothing matters. Those simple, everyday conversations felt more real to me than anything else." },
  { icon:'fa-laugh',      title:'Your Laughter',         text:"I love the way you laugh without thinking too much. It's one of those small, imperfect things that just stayed in my memory." },
  { icon:'fa-eye-slash',  title:'Staying in My Thoughts',text:"Even on the days you completely ignored me, somehow you still stayed in my thoughts. It was strange, but true." },
  { icon:'fa-walking',    title:'Your Presence',         text:"Just seeing you walking around the gym or crossing the road. The most ordinary moments were the ones that mattered the most." },
  { icon:'fa-sun',        title:'Small Imperfections',   text:"I didn't fall for a fantasy. I fell for a real person with moods, silence, and distance. I loved the real you." },
  { icon:'fa-clock',      title:'Quiet Patience',        text:"The way time seemed to slow down just a bit when you were around. I never needed you to notice me for it to happen." },
  { icon:'fa-user',       title:'Being Yourself',        text:"You never tried to be anyone else. Whether you were kind or distant, you were just Anushka. And that was enough." },
  { icon:'fa-infinity',   title:'No Reason Why',         text:"I don't know why I love you. If someone asks me the reason, I still don't have a perfect answer. I just do." },
]

export default memo(function ReasonsSection() {
  const ref = useReveal()

  return (
    <section className="reasons-section" id="reasons" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-heart"></i> Silent Truths</p>
        <h2 className="section-title">Why I Love You</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="reasons-grid">
        {reasons.map(r => (
          <div className="reason-card reveal" key={r.title}>
            <div className="reason-icon"><i className={`fas ${r.icon}`}></i></div>
            <h4>{r.title}</h4>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
})
