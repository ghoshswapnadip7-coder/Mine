import { useState, useEffect, useRef } from 'react'

function sendDecisionEmail(type) {
  const templateID = type === 'keep' ? 'template_4j2me57' : 'template_lsiglrr'
  if (window.emailjs) {
    window.emailjs.send('service_k6r37m4', templateID, {
      decision: type,
      time: new Date().toLocaleString(),
    }).then(() => console.log('Email sent')).catch(e => console.log('Email failed', e))
  }
}

export default function FinalChoice({ isPlaying, setIsPlaying, audioRef }) {
  const [choice, setChoice] = useState(null) // null | 'keep' | 'fade'
  const [fadeActive, setFadeActive] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const keepStory = () => {
    sendDecisionEmail('keep')
    localStorage.setItem('decision', 'keep')
    setChoice('keep')
    showConfirmation()
  }

  const fadeAway = () => {
    sendDecisionEmail('fade')
    localStorage.setItem('decision', 'fade')
    setChoice('fade')
    setFadeActive(true)
    showConfirmation()

    // stop music
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
    document.body.style.overflow = 'hidden'

    // canvas fade
    const canvas = document.getElementById('heartCanvas')
    if (canvas) { canvas.style.transition = 'opacity 3s ease'; canvas.style.opacity = '0' }
  }

  const showConfirmation = () => setConfirmation(true)

  return (
    <>
      <section className="final-choice-section" id="final-choice" ref={ref}>
        <div className="final-choice-container reveal">
          <h2 className="final-choice-title">One Last Choice</h2>
          <div className="final-choice-content" id="finalChoiceContent">
            {choice === null && (
              <p>This website carries memories that mattered to me.<br/>But memories only stay if they are allowed to.</p>
            )}
            {choice === null && (
              <div className="final-buttons" id="finalButtons">
                <button id="keepBtn" className="btn-keep" onClick={keepStory}>Keep This Story</button>
                <button id="fadeBtn" className="btn-fade" onClick={fadeAway}>Let It Fade Away</button>
              </div>
            )}
          </div>
          {choice === 'keep' && (
            <div className="keep-message" id="keepMessage">
              <p>Then this story stays —<br/>quietly,<br/>without expectations.</p>
            </div>
          )}
        </div>
      </section>

      {/* Fade Out Screen */}
      {fadeActive && (
        <div className="fade-out-screen active" id="fadeOutScreen">
          <div className="fade-out-text" id="fadeOutText">
            <FadeText delay={4500} text="If this story doesn't belong in your life,\nI'll let it fade quietly." />
            <FadeText delay={7500} text="Not because it didn't matter,\nbut because loving you\nwas never about forcing you to stay." />
            <FadeText delay={11000} text="Some stories don't last forever,\nbut they still remain real." />
          </div>
        </div>
      )}

      {/* Email confirmation toast */}
      {confirmation && (
        <div id="emailConfirmMsg" style={{
          position:'fixed',bottom:'30px',left:'50%',transform:'translateX(-50%)',
          background:'rgba(0,0,0,0.7)',color:'rgba(255,255,255,0.9)',
          padding:'12px 24px',borderRadius:'30px',fontSize:'0.95rem',
          zIndex:10000,fontStyle:'italic',border:'1px solid rgba(255,255,255,0.15)',
          backdropFilter:'blur(5px)',pointerEvents:'none',
          animation:'fadeInUp 1.5s ease forwards',
        }}>
          For a moment, something changed.
        </div>
      )}
    </>
  )
}

function FadeText({ delay, text }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <p style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.5s ease', whiteSpace: 'pre-line' }}>
      {text}
    </p>
  )
}
