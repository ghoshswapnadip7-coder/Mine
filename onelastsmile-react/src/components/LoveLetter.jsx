import { useEffect, useRef, useState, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const LETTER_TEXT = `Anushka,

I've held onto these words for so long, partly because I didn't know how to say them, and partly because I didn't want to ruin whatever small space I had in your life.

It all started in Class 9. I remember seeing you standing in front of Ayan sir's batch. It wasn't anything cinematic, just a quiet moment that somehow anchored itself in my mind. By the time Class 10 results came out, we were talking. Those conversations stretched into hours, and without me even noticing, you became the quiet comfort of my everyday life. 

When I finally told you how I felt, the misunderstanding that followed hurt more than I can explain. The distance grew. I remember that day you were eating fuchka with the others, and I was sitting across the road, shaking, unable to stand, crying silently onto a friend's shoulder. The tightness in my chest was unbearable. I tried so hard to move on after that, but I never truly forgot you.

Then the gym brought us close again. It was the only place I could see you every day, and I held onto that routine because, outside of it, you never really needed me. I know you know how I feel. And I know sometimes my presence bothers you, like when you complained about me just looking at you. I never meant to make you uncomfortable.

I just loved you—silently and patiently. I never asked you to love me back. I only wished to stay somewhere in your world.`

export default function LoveLetter() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]     = useState(false)
  const startedRef  = useRef(false)
  const ivRef       = useRef(null)
  const idxRef      = useRef(0)
  const sectionRef  = useReveal()

  const startTypewriter = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    setDisplayed(''); setDone(false); idxRef.current = 0
    ivRef.current = setInterval(() => {
      if (idxRef.current < LETTER_TEXT.length) {
        // Batch 3 chars per tick to reduce setState calls (≈ same visual speed at 30ms)
        const chunk = LETTER_TEXT.slice(idxRef.current, idxRef.current + 3)
        setDisplayed(prev => prev + chunk)
        idxRef.current += 3
      } else {
        clearInterval(ivRef.current)
        setDone(true)
      }
    }, 30)
  }, [])

  const replay = useCallback(() => {
    clearInterval(ivRef.current)
    startedRef.current = false
    setDisplayed(''); setDone(false)
    setTimeout(startTypewriter, 50)
  }, [startTypewriter])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          section.querySelectorAll('.reveal').forEach(el => el.classList.add('active'))
          setTimeout(startTypewriter, 500)
          obs.disconnect()
        }
      })
    }, { threshold: 0.3 })
    obs.observe(section)
    return () => { obs.disconnect(); clearInterval(ivRef.current) }
  }, [sectionRef, startTypewriter])

  return (
    <section className="letter-section" id="letter" ref={sectionRef}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-envelope-open-text"></i> From My Heart</p>
        <h2 className="section-title">A Love Letter</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="letter-container reveal">
        <div className="letter-paper">
          <div className="letter-seal"><i className="fas fa-heart"></i></div>
          <p className="letter-date">April 2026</p>
          <p className="letter-greeting">My Dearest Anushka,</p>
          <div className="letter-body" id="letterBody">
            <p id="typewriterText" style={{ whiteSpace: 'pre-wrap' }}>
              {displayed}
              {!done && <span className="typewriter-cursor"></span>}
            </p>
          </div>
          <div className="letter-signature">
            <p>With all my love, forever &amp; always,</p>
            <p className="letter-sign">— Swapnadip 💕</p>
          </div>
        </div>
        <button className="letter-replay-btn" id="replayLetter" onClick={replay}>
          <i className="fas fa-redo"></i> Read Again
        </button>
      </div>
    </section>
  )
}
