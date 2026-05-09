import { useState, useEffect, useRef } from 'react'

const TOTAL_STEPS = 7
const SCREENS = [1, 2, 3, 4, 5, 6, 7]
const SCREEN_DATA = {
  1: { icon:'fas fa-gift',               ornament:'3 January',   heading:"Hey\u2026 today is your day.",              text:"I didn\u2019t want to just text you like everyone else.\nSo I made something.", btnLabel:'Start' },
  2: { icon:'fas fa-cake-candles',        ornament:'For You',    heading:'Happy Birthday, Anushka.',                 text:"Not just another year\u2026\nbut another version of you\nthe world gets to become.", btnLabel:'Next' },
  3: { icon:'fas fa-heart',               ornament:'Honestly',   heading:'You matter more than you probably realize.',text:"I don\u2019t say this often.\nBut it\u2019s true, and it needed to be said.", btnLabel:'Continue' },
  4: { icon:'fas fa-sun',                 ornament:'Today',      heading:"Today isn\u2019t about anything complicated.",text:"No past. No confusion.\n\nJust you.", btnLabel:'Next' },
  5: { icon:'fas fa-envelope-open-heart', ornament:'A Gift',     heading:'This is just something I wanted to give you.',text:'No expectations attached to it.', btnLabel:'See More' },
  6: { icon:'fas fa-star',                ornament:'Real Things', heading:"Some things don\u2019t need to be loud to be real.", text:'Quiet can still mean genuine.', btnLabel:'Continue' },
  7: { icon:'fas fa-dove',                ornament:'Always',     heading:"So yeah\u2026 Happy Birthday.",              text:"I hope life gives you everything you deserve.\nAnd I genuinely mean that.", btnLabel:'Finish' },
}

export default function BirthdayFlow({ onEnter, setIsPlaying }) {
  const [screen, setScreen] = useState(1)      // 1-7, then 'final'
  const [exiting, setExiting] = useState(false)
  const [olsActive, setOlsActive] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [dotsVisible, setDotsVisible] = useState(true)
  const canvasRef = useRef(null)
  const audioRef  = useRef(null)
  const musicStarted = useRef(false)
  const exitingRef = useRef(false)
  const timeoutsRef = useRef(new Set())
  const intervalsRef = useRef(new Set())

  const scheduleTimeout = (fn, delay) => {
    const id = window.setTimeout(() => {
      timeoutsRef.current.delete(id)
      fn()
    }, delay)
    timeoutsRef.current.add(id)
    return id
  }

  const scheduleInterval = (fn, delay) => {
    const id = window.setInterval(fn, delay)
    intervalsRef.current.add(id)
    return id
  }

  const clearManagedInterval = (id) => {
    window.clearInterval(id)
    intervalsRef.current.delete(id)
  }

  useEffect(() => () => {
    timeoutsRef.current.forEach(id => window.clearTimeout(id))
    intervalsRef.current.forEach(id => window.clearInterval(id))
    exitingRef.current = false
  }, [])

  /* ── particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => {
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth
        canvas.height = nextHeight
      }
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const particles = Array.from({ length: 70 }, () => makePart(canvas))

    function makePart(c) {
      const colors = ['255,77,133', '162,57,202', '255,179,198', '255,255,255']
      return {
        x: Math.random() * c.width, y: Math.random() * c.height,
        size: Math.random() * 2.4 + 0.6, speed: Math.random() * 0.55 + 0.15,
        opacity: Math.random() * 0.45 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2, twinkle: Math.random() * 0.018 + 0.008,
      }
    }

    let rafId = 0
    let running = true
    function animate() {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        p.phase += p.twinkle
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.phase))
        ctx.fillStyle = `rgba(${p.color},${alpha})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        p.y -= p.speed; p.x += Math.sin(p.y * 0.009) * 0.25
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
      }
      rafId = requestAnimationFrame(animate)
    }
    const stop = () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }
    const start = () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(animate)
    }
    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    rafId = requestAnimationFrame(animate)
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  /* ── music helpers ── */
  const tryStartMusic = () => {
    if (musicStarted.current) return
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => {
      musicStarted.current = true; setIsPlaying(true)
      setShowPrompt(false)
    }).catch(() => setShowPrompt(true))
  }

  /* ── navigation ── */
  const goNext = (from) => {
    const next = from + 1
    setExiting(true)
    scheduleTimeout(() => {
      setExiting(false)
      if (next > TOTAL_STEPS) {
        setScreen('final')
        setDotsVisible(false)
        scheduleTimeout(() => setOlsActive(true), 900)
        // Lower volume
        const audio = audioRef.current
        if (audio) {
          const iv = scheduleInterval(() => {
            if (audio.volume > 0.38) audio.volume = Math.max(0.38, audio.volume - 0.025)
            else clearManagedInterval(iv)
          }, 80)
        }
      } else {
        setScreen(next)
      }
    }, 880)
  }

  const bdStart = () => { tryStartMusic(); goNext(1) }

  /* ── cinematic exit ── */
  const bdEnter = () => {
    if (exitingRef.current) return
    exitingRef.current = true

    // fade audio out
    const audio = audioRef.current
    if (audio) {
      const fadeOut = scheduleInterval(() => {
        if (audio.volume > 0.03) audio.volume = Math.max(0, audio.volume - 0.018)
        else {
          audio.volume = 0
          audio.pause()
          setIsPlaying(false)
          clearManagedInterval(fadeOut)
        }
      }, 60)
    }

    // show blackout then reveal main
    const blackout = document.getElementById('olsBlackout')
    if (blackout) {
      blackout.style.transition = 'opacity 1.8s cubic-bezier(0.4,0,0.2,1)'
      blackout.classList.add('active')
    }
    scheduleTimeout(() => {
      if (blackout) blackout.classList.add('glow-pulse')
    }, 1900)
    scheduleTimeout(() => {
      try {
        sessionStorage.setItem('allowAccess', 'true')
      } catch {
        /* storage can be unavailable in private browsing */
      }
      setIsPlaying(false)
      onEnter()
      exitingRef.current = false
      scheduleTimeout(() => {
        if (blackout) {
          blackout.style.transition = 'opacity 1.6s ease'
          blackout.classList.remove('active', 'glow-pulse')
        }
      }, 600)
    }, 3600)
  }

  return (
    <div id="birthdayFlow">
      <canvas ref={canvasRef} id="bdCanvas"></canvas>

      <audio ref={audioRef} id="bgAudio" loop>
        <source src="/song.mp3" type="audio/mpeg"/>
      </audio>

      {showPrompt && (
        <button id="bdMusicPrompt" onClick={() => { musicStarted.current = false; tryStartMusic() }}>
          <i className="fas fa-music"></i>&nbsp; Tap to start music
        </button>
      )}

      {/* Screens 1-7 */}
      {SCREENS.map(n => {
        const d = SCREEN_DATA[n]
        const isActive = screen === n && !exiting
        const isExit   = screen === n && exiting
        const action = n === 1 ? bdStart : () => goNext(n)
        return (
          <div key={n} className={`bd-screen${isActive?' active':''}${isExit?' exiting':''}`} id={`bdScreen${n}`}>
            <i className={`bd-icon ${d.icon}`}></i>
            <div className="bd-ornament">{d.ornament}</div>
            {n === 1
              ? <h1 className="bd-heading">{d.heading}</h1>
              : <h2 className="bd-heading">{d.heading}</h2>
            }
            {d.text.split('\n').map((line, i) =>
              line === '' ? <br key={i}/> : <p key={i} className="bd-text">{line}</p>
            )}
            <button className="bd-btn" onClick={action}>
              <span>{d.btnLabel}</span> <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )
      })}

      {/* Final Screen */}
      <div className={`bd-screen${screen==='final'&&!exiting?' active':''}${olsActive?' ols-active':''}`} id="bdScreenFinal">
        <div className="ols-glow-blob"></div>
        <div className="ols-vignette"></div>
        <div className="ols-content">
          <div className="bd-ornament ols-ornament">OneLastSmile</div>
          <h2 className="bd-heading ols-heading ols-line ols-line-1">One Last Smile.</h2>
          <p className="bd-text ols-sub ols-line ols-line-2">
            This was never just a page&hellip;<br/>
            It was everything I couldn&rsquo;t say.
          </p>
          <p className="bd-text ols-support ols-line ols-line-3">
            If this is where it ends,<br/>
            let it end with a smile.
          </p>
          <button className="bd-btn bd-enter-btn ols-btn ols-line ols-line-4" id="enterBtn" onClick={bdEnter}>
            <span>One Last Smile</span>
            <i className="fas fa-arrow-right"></i>
          </button>
          <p className="ols-signature ols-line ols-line-5">&mdash; OneLastSmile</p>
        </div>
      </div>

      {/* Step dots */}
      {dotsVisible && (
        <div id="bdDots">
          {SCREENS.map(n => (
            <span key={n} className={`bd-dot${screen===n?' active':''}`}></span>
          ))}
        </div>
      )}

      {/* Blackout overlay */}
      <div id="olsBlackout"></div>
    </div>
  )
}
