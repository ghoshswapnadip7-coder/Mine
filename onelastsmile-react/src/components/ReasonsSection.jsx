import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const reasons = [
  { icon:'fa-comment',    title:'Casual Talks',          text:"The way you'd talk casually, like nothing was urgent. Those simple, unstructured conversations always felt more real to me than anything else." },
  { icon:'fa-laugh',      title:'Your Laughter',         text:"I remember noticing how your expression changed just before you laughed. Small, unscripted habits like that just quietly stayed in my memory." },
  { icon:'fa-eye-slash',  title:'Staying in My Thoughts',text:"Even on the days we didn't speak, you still occupied a quiet space in my mind. It became a strange, silent constant." },
  { icon:'fa-walking',    title:'Your Presence',         text:"Just seeing you in ordinary spaces—walking into the gym, crossing a road. You didn't have to do anything. Your presence alone changed the atmosphere for me." },
  { icon:'fa-sun',        title:'Small Imperfections',   text:"I never looked for a perfect version of you. I just cared for the real person—the moods, the sudden silences, the distance." },
  { icon:'fa-clock',      title:'Quiet Patience',        text:"Time always felt a little different when you were around. I never actually needed you to notice me for it to happen." },
  { icon:'fa-user',       title:'Being Yourself',        text:"There were days you were kind, and days you were distant. I just accepted whatever version of you showed up. That was always enough." },
  { icon:'fa-infinity',   title:'No Reason Why',         text:"If someone asked me to explain it, I still wouldn't have a perfect answer. I just quietly cared, without needing a reason." },
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
