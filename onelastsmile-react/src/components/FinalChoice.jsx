import { useState, useEffect, useRef } from 'react'

function sendDecisionEmail(type) {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_DECISION_ID
  if (window.emailjs) {
    window.emailjs.send(serviceID, templateID, {
      decision: type === 'keep' ? 'KEEP THIS STORY' : 'LET IT FADE AWAY',
      time: new Date().toLocaleString(),
      session_id: crypto.randomUUID()
    }).catch(() => {})
  }
}

export default function FinalChoice({ isPlaying, setIsPlaying, audioRef }) {
  const [choice, setChoice] = useState(null) // null | 'keep' | 'fade'
  const [fadeActive, setFadeActive] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    // Restore permanence if previously decided
    const stored = localStorage.getItem('decision')
    if (stored === 'keep') setChoice('keep')
    if (stored === 'fade') setChoice('fade') // but we don't fade actively on return, just show they faded it

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

  const saveMemoryKeepsake = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>One Last Smile - Memory</title>
  <style>
    body { background: #0f0514; color: #f4f4f4; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .memory-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; padding: 50px 40px; max-width: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .title { opacity: 0.5; font-size: 0.85rem; margin-bottom: 30px; letter-spacing: 3px; text-transform: uppercase; }
    .message { font-size: 1.1rem; line-height: 2; opacity: 0.9; margin-bottom: 40px; white-space: pre-line; }
    .timestamp { font-size: 0.75rem; opacity: 0.4; }
    .note { margin-top: 40px; font-size: 0.85rem; opacity: 0.5; font-style: italic; }
  </style>
</head>
<body>
  <div class="memory-card">
    <div class="title">A Preserved Memory</div>
    <div class="message">
      "Thank you for taking the time to read my true feelings.
      
      Even if life takes us in different directions, 
      a part of my story will always carry your name."
      
      — Swapnadip
    </div>
    <div class="timestamp">Memory kept on: ${new Date().toLocaleString()}</div>
    <div class="note">Some memories stay, even after the page is closed.</div>
  </div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'OneLastSmile-memory.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
            <>
              <div className="keep-message" id="keepMessage">
                <p>Then this story stays —<br/>quietly,<br/>without expectations.</p>
              </div>
              
              <div className="keepsake-sequence" style={{ marginTop: '60px', textAlign: 'center', animation: 'fadeInUp 1s ease forwards' }}>
                <p style={{ opacity: 0.5, fontSize: '0.85rem', marginBottom: '15px', letterSpacing: '1px', fontFamily: 'monospace', color: '#fff' }}>Before You Go...</p>
                <p style={{ fontSize: '1rem', marginBottom: '35px', opacity: 0.8, fontFamily: 'monospace', color: '#fff' }}>Thank you for staying until the end.</p>
                <button 
                  onClick={saveMemoryKeepsake} 
                  className="keepsake-btn"
                  style={{ 
                    background: 'none', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: 'rgba(255,255,255,0.7)', 
                    padding: '12px 28px', 
                    borderRadius: '30px', 
                    cursor: 'pointer', 
                    fontFamily: 'monospace', 
                    fontSize: '0.9rem', 
                    transition: 'all 0.4s ease' 
                  }}
                  onMouseOver={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#fff'; e.target.style.border = '1px solid rgba(255,255,255,0.2)' }}
                  onMouseOut={(e) => { e.target.style.background = 'none'; e.target.style.color = 'rgba(255,255,255,0.7)'; e.target.style.border = '1px solid rgba(255,255,255,0.1)' }}
                >
                  Take This With You
                </button>
              </div>
            </>
          )}
          {choice === 'fade' && !fadeActive && (
             <div className="keep-message" id="keepMessage">
               <p style={{ opacity: 0.5 }}>This story was allowed to fade away.</p>
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
