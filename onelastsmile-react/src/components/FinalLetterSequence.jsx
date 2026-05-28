import { useState, useEffect } from 'react'

const PAGES = [
  { id: 1, text: "I really always asked Gods…", holdTime: 6000 },
  { id: 2, text: "maybe this was never about manifestation…", holdTime: 6000 },
  { id: 3, text: "Maine tumhe usse bheekh manga…", holdTime: 6000 },
  { id: 4, text: "Ye mera pyaar hai.\nMeri marzi hai.", holdTime: 10000 },
  { id: 5, text: "Tum meri chaand ho…", holdTime: 7000, effect: 'moon' },
  { id: 6, text: "Tumhara naam meri zindagi ki woh baarish hai…", holdTime: 7000, effect: 'rain' },
  { id: 7, text: "Bass khush rahna…", holdTime: 6000 },
  { id: 8, text: "Shayad mil jaau kahi.", holdTime: 8000 }
]

export default function FinalLetterSequence() {
  const [isActive, setIsActive] = useState(false)
  const [currentPage, setCurrentPage] = useState(-1) // -1 = not started
  const [fadeState, setFadeState] = useState('in') // 'in' or 'out'
  const [finished, setFinished] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [showWaiting, setShowWaiting] = useState(false)
  const [forceSkip, setForceSkip] = useState(false)

  // Start sequence when user scrolls to the bottom anchor
  useEffect(() => {
    if (forceSkip) return
    const el = document.getElementById('final-trigger-point')
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isActive) {
        setIsActive(true)
        document.body.style.overflow = 'hidden' // lock scrolling
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [isActive, forceSkip])

  useEffect(() => {
    if (!isActive || finished) return

    if (currentPage === -1) {
      // Opening silence before first page
      const t = setTimeout(() => {
        setCurrentPage(0)
        setFadeState('in')
      }, 3000)
      return () => clearTimeout(t)
    }

    if (currentPage < PAGES.length) {
      if (fadeState === 'in') {
        // Hold the page
        const t = setTimeout(() => setFadeState('out'), PAGES[currentPage].holdTime)
        return () => clearTimeout(t)
      } else {
        // Fade out transition
        const t = setTimeout(() => {
          if (currentPage === PAGES.length - 1) {
            setFinished(true) // Start the final fade to black
          } else {
            setCurrentPage(currentPage + 1)
            setFadeState('in')
          }
        }, 2500) // 2.5s blur fade overlap
        return () => clearTimeout(t)
      }
    }
  }, [isActive, currentPage, fadeState, finished])

  // Final sequence timings
  useEffect(() => {
    if (finished) {
      const t1 = setTimeout(() => setShowSignature(true), 4000) // wait for black screen
      const t2 = setTimeout(() => setShowSignature(false), 9000) // fade out signature
      const t3 = setTimeout(() => setShowWaiting(true), 13000) // show waiting
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [finished])

  const exitSequence = () => {
    document.body.style.overflow = ''
    setIsActive(false)
    setForceSkip(true)
  }

  if (!isActive) {
    if (forceSkip) return null;
    return <div id="final-trigger-point" style={{ height: '20vh', width: '100%', position: 'relative' }}>
      <p style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', opacity: 0.2, fontSize: '0.8rem', fontStyle: 'italic' }}>
        Scroll deeper...
      </p>
    </div>
  }

  const page = currentPage >= 0 && currentPage < PAGES.length ? PAGES[currentPage] : null

  return (
    <div className={`final-sequence-overlay ${finished ? 'fully-black' : ''} ${page?.effect === 'moon' ? 'moon-glow' : ''} ${page?.effect === 'rain' ? 'rain-distortion' : ''}`}>
      
      {!finished && (
        <div className="sequence-controls">
          <button onClick={exitSequence}>Exit</button>
        </div>
      )}

      <div className="sequence-grain"></div>

      <div className="sequence-content">
        {!finished && page && (
          <p className={`sequence-text ${fadeState === 'in' ? 'visible' : 'hidden'}`}>
            {page.text.split('\n').map((line, i) => (
              <span key={i}>{line}<br/></span>
            ))}
          </p>
        )}

        {finished && (
          <div className="sequence-ending">
            <p className={`signature ${showSignature ? 'visible' : 'hidden'}`}>— Swapnadip</p>
            <p className={`still-waiting ${showWaiting ? 'visible' : 'hidden'}`}>still waiting.</p>
          </div>
        )}
      </div>
    </div>
  )
}
