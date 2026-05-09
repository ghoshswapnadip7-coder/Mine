import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const events = [
  {
    side: 'left', icon: 'fa-star', date: '2022 — Class 9',
    title: 'The Day I Noticed You — And Never Really Forgot',
    body: "I first saw you standing in front of Ayan sir's batch. It was just a normal day for everyone else, but something quietly stayed in my memory. It wasn't love immediately—just a quiet feeling that simply remained with me.",
  },
  {
    side: 'right', icon: 'fa-comments', date: '2023 — After Class 10 Results',
    title: 'When Conversations Became Part of My Everyday Life',
    body: "We started talking more after the Class 10 results. The conversations slowly became longer, and talking to you just became a normal part of my days. Without me even realizing it, you became a comforting part of my daily routine.",
  },
  {
    side: 'left', icon: 'fa-heart-broken', date: 'Confession Period',
    title: 'The Day I Finally Said What I Was Afraid To Say',
    body: "I gathered the courage to tell you how I felt. It wasn't done perfectly, but it was honest. Unfortunately, misunderstandings happened, and a quiet distance slowly began to grow between us after that.",
  },
  {
    side: 'right', icon: 'fa-utensils', date: 'Fuchka Day',
    title: 'One Evening That Felt Quieter Than Usual',
    body: "You and the others went to eat fuchka together, and I wasn't called. I just sat quietly on the opposite side of the road. I didn't have any dramatic reaction; it was just a quiet moment of realizing how alone I felt.",
  },
  {
    side: 'left', icon: 'fa-dumbbell', date: 'Gym Days',
    title: 'The Only Place Where I Could Still See You',
    body: "The gym became my daily routine. It wasn't because of fitness, but because it became the only place where I could still see you. Seeing you from a distance became a part of my day, and even without any conversation, those moments truly mattered to me.",
  },
  {
    side: 'right', icon: 'fa-eye-slash', date: '27 April 2026',
    title: 'The Day Silence Became Too Heavy',
    extra: [
      "You told me not to look at you like that. I stayed silent. Later, I sat quietly and covered my face with a towel so no one would notice. Inside, the same questions kept repeating:",
      { italic: '"Has it really become so wrong just to look at you? Did I do something so bad to deserve this distance?"' },
      "I slowly realized that maybe I care more than you ever did. Maybe I truly became an unwanted person in your world.",
      { bold: "I love her — and maybe she doesn't love me. It's that simple." },
    ],
  },
]

export default memo(function Timeline() {
  const ref = useReveal()

  return (
    <section className="timeline-section" id="timeline" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-infinity"></i> Our Journey</p>
        <h2 className="section-title">Our Story</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="timeline">
        {events.map((ev, i) => (
          <div key={i} className={`timeline-item ${ev.side} reveal`}>
            <div className="timeline-dot"><i className={`fas ${ev.icon}`}></i></div>
            <div className="timeline-content">
              <span className="timeline-date">
                <i className="fas fa-calendar-heart"></i> {ev.date}
              </span>
              <h4>{ev.title}</h4>
              {ev.body ? <p>{ev.body}</p> : null}
              {ev.extra?.map((line, j) => {
                if (typeof line === 'string') return <p key={j} style={{ marginTop: '10px' }}>{line}</p>
                if (line.italic) return <p key={j} style={{ marginTop: '10px', fontStyle: 'italic' }}>{line.italic}</p>
                if (line.bold)   return <p key={j} style={{ marginTop: '10px', fontWeight: 'bold' }}>{line.bold}</p>
                return null
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})
