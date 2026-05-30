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

  const handleNoHover = (e) => {
    const btn = e.target
    const maxX = window.innerWidth - btn.offsetWidth - 20
    const maxY = window.innerHeight - btn.offsetHeight - 20
    const x = Math.random() * maxX
    const y = Math.random() * maxY
    btn.style.position = 'fixed'
    btn.style.left = `${x}px`
    btn.style.top = `${y}px`
    btn.style.zIndex = 9999
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
          <div className="ring-outer"><i className="fas fa-ring ring-icon"></i></div>
          <div className="ring-glow"></div>
        </div>
        <p className="propose-from"><i className="fas fa-heart"></i> One Last Smile</p>
        <h2 className="propose-title">Will you be mine?</h2>
        <div className="propose-message">
          <p>I know I'm not perfect, but my love for you is true.</p>
          <p>I've waited for this moment to finally ask you.</p>
          <p className="propose-big-text">
            <span>Will you let me hold your hand forever?</span>
          </p>
        </div>
        {!accepted ? (
          <div className="propose-buttons" id="proposeButtons" style={{ position: 'relative' }}>
            <button className="btn-yes" id="yesBtn" onClick={sayYes}>
              <i className="fas fa-heart"></i> Yes!
            </button>
            <button className="btn-no" id="noBtn" onMouseOver={handleNoHover} onClick={handleNoHover} style={{ background: '#333', color: '#fff', padding: '12px 30px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <i className="fas fa-heart-broken"></i> No
            </button>
          </div>
        ) : (
          <div className="celebrate-message" id="celebrateMessage" style={{ display: 'block' }}>
            <div className="firework-container" id="fireworks"></div>
            <div className="celebrate-text">
              <i className="fas fa-heart"></i>
              <h3>I Love You!</h3>
              <p>You just made me the happiest person in the world.</p>
              <div className="celebrate-icons">
                <i className="fas fa-kiss-wink-heart"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-heart"></i>
              </div>
              <p className="forever-text">— Yours forever, Swapnadip</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
