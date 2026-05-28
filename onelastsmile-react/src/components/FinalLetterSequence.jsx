import { useState, useEffect } from 'react'

const PAGES = [
  { id: 1, text: "I really always asked Gods…", holdTime: 6000 },
  { id: 2, text: "maybe this was never about manifestation…", holdTime: 6000 },
  { id: 3, text: "Maine tumhe usse bheekh manga…", holdTime: 6000 },
  { id: 4, text: "Ye mera pyaar hai.\nMeri marzi hai.", holdTime: 10000 },
  { id: 5, text: "Tum meri chaand ho…", holdTime: 7000, effect: 'moon' },
  { id: 6, text: "Tumhara naam meri zindagi ki woh baarish hai…", holdTime: 7000, effect: 'rain' },
  { id: 7, text: "Bass khush rahna…", holdTime: 6000 },
  { id: 8, text: "Shayad mil jaau kahi.", holdTime: 8000 },
  { id: 9, text: "", holdTime: 6000 }, // Silence
  { id: 10, text: "Janish,\ntoke onek kichu bolte ichaa kore.\nEto kichu bolar achey je\nhoito ekta life o kom pore jabe sobta bolar jonno.", holdTime: 8000, effect: 'crimson' },
  { id: 11, text: "Tai bhablam,\nei chotto website ta baniye jai.\nHoyto purota bojhate parbena,\nkintu jotota perechi,\ntotota rekhe gelam ekhane.", holdTime: 8000, effect: 'crimson' },
  { id: 12, text: "Hoito er por ami number change kore nebo.\nHoito call e ar pabi na.\nHoito dekhao hobena.\nCause ekhane theke chole jabo ami.", holdTime: 8000, effect: 'crimson' },
  { id: 13, text: "Kintu sotti bolchi,\njodi kokhono amar kotha mone pore,\nba khujte ichaa hoy,\ntahole peye jabi.\nTar onek rasta achey.", holdTime: 8000, effect: 'crimson' },
  { id: 14, text: "Ami jani,\ntor hoyto kokhono amar dorkar hobena.\nHoito kokhono amake khujte ichaao korbina.", holdTime: 7000, effect: 'crimson' },
  { id: 15, text: "But still...\njodi kokhono koris,\ntahole khuje nish.\nAmi opekkhay thakbo.", holdTime: 7000, effect: 'crimson' },
  { id: 16, text: "And...\na really good goodbye.\n\nValo thakish re.\nKhub khushi thakish.", holdTime: 8000, effect: 'crimson' },
  { id: 17, text: "Aar hee,\ntui to janis ami guchiye kichu bolte parina.\nJa mone ashe,\ntai bole di.", holdTime: 7000, effect: 'crimson' },
  { id: 18, text: "Tobu o...\nei baar ektu guchiye bolar chesta korlam.\nJotota parlam.", holdTime: 6000, effect: 'crimson' },
  { id: 19, text: "Tai kichu bhul hole,\nplease mind korish na.", holdTime: 8000, effect: 'crimson' }
]

export default function FinalLetterSequence() {
  const [isActive, setIsActive] = useState(false)
  const [currentPage, setCurrentPage] = useState(-1)
  const [fadeState, setFadeState] = useState('in')
  const [finished, setFinished] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [hasWatched, setHasWatched] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('watchedFinalSequence') === 'true') {
      setHasWatched(true)
    }
  }, [])

  useEffect(() => {
    if (!isActive || finished) return

    if (currentPage === -1) {
      const t = setTimeout(() => {
        setCurrentPage(0)
        setFadeState('in')
      }, 3000)
      return () => clearTimeout(t)
    }

    if (currentPage < PAGES.length) {
      if (fadeState === 'in') {
        const t = setTimeout(() => setFadeState('out'), PAGES[currentPage].holdTime)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          if (currentPage === PAGES.length - 1) {
            setFinished(true)
          } else {
            setCurrentPage(currentPage + 1)
            setFadeState('in')
          }
        }, 2500)
        return () => clearTimeout(t)
      }
    }
  }, [isActive, currentPage, fadeState, finished])

  useEffect(() => {
    if (finished) {
      const t1 = setTimeout(() => setShowSignature(true), 4000)
      const t2 = setTimeout(() => setShowSignature(false), 9000)
      const t3 = setTimeout(() => {
        setIsActive(false)
        setFinished(false)
        setCurrentPage(-1)
        setHasWatched(true)
        localStorage.setItem('watchedFinalSequence', 'true')
        document.body.style.overflow = ''
      }, 15000)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [finished])

  const exitSequence = () => {
    document.body.style.overflow = ''
    setIsActive(false)
    setFinished(false)
    setCurrentPage(-1)
  }

  const triggerSequence = () => {
    setIsActive(true)
    document.body.style.overflow = 'hidden'
  }

  if (!isActive) {
    return (
      <div className="final-trigger-container">
        <button 
          className={`final-trigger-btn ${hasWatched ? 'watched' : ''}`} 
          onClick={triggerSequence}
        >
          {hasWatched ? 'you stayed.' : 'one last thing.'}
        </button>
      </div>
    )
  }

  const page = currentPage >= 0 && currentPage < PAGES.length ? PAGES[currentPage] : null

  return (
    <div className={`final-sequence-overlay ${finished ? 'fully-black' : ''} ${page?.effect === 'moon' ? 'moon-glow' : ''} ${page?.effect === 'rain' ? 'rain-distortion' : ''} ${page?.effect === 'crimson' ? 'crimson-glow' : ''}`}>
      
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
          </div>
        )}
      </div>
    </div>
  )
}
