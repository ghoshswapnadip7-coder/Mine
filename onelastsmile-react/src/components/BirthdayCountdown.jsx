import React, { useState, useEffect, useRef, memo } from 'react'
import { useReveal } from '../hooks/useReveal'

function pad(n, len = 2) { return String(n).padStart(len, '0') }

export default memo(function BirthdayCountdown() {
  const [time, setTime] = useState({ days: '000', hours: '00', minutes: '00', seconds: '00' })
  const [age, setAge] = useState('')
  const ref = useReveal()

  useEffect(() => {
    const birthday = new Date('2008-01-03')
    const calc = () => {
      const now = new Date()
      let a = now.getFullYear() - birthday.getFullYear()
      const m = now.getMonth() - birthday.getMonth()
      if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) a--
      setAge(`✨ She is ${a} years old ✨`)
      let next = new Date(now.getFullYear(), 0, 3)
      if (now >= next) next.setFullYear(next.getFullYear() + 1)
      const diff = next - now
      setTime({
        days:    pad(Math.floor(diff / (1000*60*60*24)), 3),
        hours:   pad(Math.floor(diff / (1000*60*60)) % 24),
        minutes: pad(Math.floor(diff / (1000*60)) % 60),
        seconds: pad(Math.floor(diff / 1000) % 60),
      })
    }
    calc()
    const iv = setInterval(calc, 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="birthday-section" id="birthday" ref={ref}>
      <div className="birthday-bg-particles" id="birthdayParticles"></div>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-cake-candles"></i> Her Special Day</p>
        <h2 className="section-title">Birthday Countdown</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="birthday-card reveal">
        <div className="birthday-avatar-wrap">
          <div className="birthday-avatar">
            <span className="birthday-avatar-letter">A</span>
          </div>
          <div className="birthday-crown"><i className="fas fa-crown"></i></div>
        </div>
        <h3 className="birthday-name">Anushka</h3>
        <p className="birthday-date"><i className="fas fa-calendar-heart"></i> Born: 3rd January 2008</p>
        <p className="birthday-age" id="birthdayAge">{age}</p>
        <div className="countdown-container" id="countdown">
          {[['Days', time.days], ['Hours', time.hours], ['Minutes', time.minutes], ['Seconds', time.seconds]].map(([label, val], i) => (
            <React.Fragment key={label}>
              {i > 0 && <div className="countdown-separator">:</div>}
              <div className="countdown-item">
                <span className="countdown-number">{val}</span>
                <span className="countdown-label">{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <p className="birthday-wish">
          Every year your birthday comes,<br/>
          but this time I wanted to give you something<br/>
          that came from my heart.
        </p>
      </div>
    </section>
  )
})
