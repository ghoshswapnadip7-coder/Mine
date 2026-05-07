import { useState, useEffect, useRef } from 'react'

export default function ProposeSection({ isPlaying, setIsPlaying, audioRef }) {
  const [accepted, setAccepted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const sayYes = () => {
    setAccepted(true)
    createFireworks()
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const createFireworks = () => {
    const container = document.getElementById('fireworks')
    if (!container) return
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('i')
      heart.className = 'fas fa-heart'
      heart.style.cssText = `position:absolute;color:#ff4d85;font-size:${Math.random()*20+10}px;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100;transition:all 1s ease-out;`
      const angle = Math.random() * Math.PI * 2
      const vel = Math.random() * 100 + 50
      const tx = Math.cos(angle) * vel, ty = Math.sin(angle) * vel
      container.appendChild(heart)
      setTimeout(() => { heart.style.transform = `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)`; heart.style.opacity = '0' }, 50)
      setTimeout(() => heart.remove(), 1050)
    }
    const iv = setInterval(() => {
      const h = document.createElement('i')
      h.className = 'fas fa-heart'
      h.style.cssText = `position:absolute;color:${Math.random()>0.5?'#ff4d85':'#a239ca'};left:${Math.random()*100}%;top:-20px;font-size:${Math.random()*15+10}px;opacity:0.7;transition:top 3s linear,opacity 3s linear;`
      container.appendChild(h)
      setTimeout(() => { h.style.top='100%'; h.style.opacity='0' }, 50)
      setTimeout(() => h.remove(), 3050)
    }, 300)
    setTimeout(() => clearInterval(iv), 10000)
  }

  return (
    <section className="propose-section" id="propose" ref={ref}>
      <div className="propose-bg-overlay"></div>
      <div className="propose-particles" id="proposeParticles"></div>
      <div className="propose-container reveal">
        <div className="ring-animation">
          <div className="ring-outer"><i className="fas fa-dove ring-icon"></i></div>
          <div className="ring-glow"></div>
        </div>
        <p className="propose-from"><i className="fas fa-leaf"></i> With silent strength</p>
        <h2 className="propose-title">Before I Leave</h2>
        <div className="propose-message">
          <p>This website is a final memory for you before I leave for university. I just wanted to leave behind something meaningful.</p>
          <p>I am not doing this to force you into anything. I just wanted a place to preserve these memories before I go.</p>
          <p className="propose-big-text">
            <span>Even if life takes us in different directions,<br/>a part of my story will always carry your name.</span>
          </p>
        </div>
        {!accepted ? (
          <div className="propose-buttons" id="proposeButtons">
            <button className="btn-yes" id="yesBtn" onClick={sayYes}>
              <i className="fas fa-heart"></i> I Understand
            </button>
          </div>
        ) : (
          <div className="celebrate-message" id="celebrateMessage" style={{ display: 'block' }}>
            <div className="firework-container" id="fireworks"></div>
            <div className="celebrate-text">
              <i className="fas fa-leaf"></i>
              <h3>Thank You</h3>
              <p>Thank you for taking the time to read my true feelings. That is all I ever wanted.</p>
              <div className="celebrate-icons">
                <i className="fas fa-dove"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-heart"></i>
              </div>
              <p className="forever-text">— With silent respect, Swapnadip</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
