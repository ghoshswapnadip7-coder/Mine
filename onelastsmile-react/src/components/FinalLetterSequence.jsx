import { useState, useEffect } from 'react'

const PAGES = [
  // --- HINDI / URDU SECTION ---
  { id: 1, text: "I really used to ask God one thing over and over again —\n\n“Why can’t you just be mine?”", holdTime: 4500 },
  { id: 2, text: "I kept praying for you.\nAgain and again.\nThinking maybe someday,\nif I asked enough,\nif I loved enough,\nif I waited enough,\nmaybe life would finally bring you to me.", holdTime: 6500 },
  { id: 3, text: "But one day I realized,\nmaybe this was never about my prayers or manifestations.\n\nMaybe I kept asking for someone\nwho never truly wanted me back.", holdTime: 6000 },
  { id: 4, text: "Shayad tumne kabhi mera pyaar dekha hi nahi.\nYa shayad maine hi tumhe kabhi theek se samjha nahi.\n\nAur ho sakta hai —\ntumne dekh kar bhi kabhi koshish nahi ki mujhe samajhne ki.", holdTime: 6500 },
  { id: 5, text: "Shayad yehi meri kismat hai.\n\nLekin tum chinta mat karo.\nMain iss janam mein aakhri din tak tumhe maangta rahunga.\nKya pata…\nshayad kabhi na kabhi\nupar wala tumhe de hi de mujhe.", holdTime: 7000 },
  { id: 6, text: "Shayad kabhi tumhe mera pyaar dikh jaaye.\nShayad kabhi tum mere paas aakar thoda thehar jao.\nAur bolo—\n\n“Main aa gaya hoon.\nAb nahi jaunga tumhe chhod kar.”", holdTime: 6500 },
  { id: 7, text: "Mujhe pata hai,\nye shayad kabhi sach nahi hoga.\n\nPhir bhi,\nmain intezar karta rahunga.\nAur intezar sirf iss janam tak nahi.", holdTime: 6000 },
  { id: 8, text: "Agar kabhi dobara janam mila,\naur agar mujhe sab yaad raha,\ntoh main phir bhi tumhe hi maangunga.", holdTime: 5500 },
  { id: 9, text: "Iss janam mein bhi,\nmaine tumhe usse bheekh mein maanga.\nUsne nahi diya.\nShayad uski marzi thi.\n\nMaine tumhe tumse bhi maanga.\nTumne nahi samjha.\nShayad woh tumhari marzi thi.", holdTime: 7000 },
  { id: 10, text: "Lekin main tumse pyaar karun ya na karun,\ntumhe chahun ya na chahun —\nye meri marzi hai.\n\nNa isme tumhara haq banta hai,\nna uska.", holdTime: 6000 },
  { id: 11, text: "Ye mera pyaar hai.\nMeri marzi hai.", holdTime: 5000 }, // Silence point
  { id: 12, text: "Aur akhir mein bas itna hi kahunga—\n\nTum meri chaand ho.\nJise roz door se dekh kar\nchhoone ki tamanna toh kar sakta hoon,\nlekin kabhi chhoo nahi paunga.", holdTime: 6500, effect: 'moon' },
  { id: 13, text: "Phir bhi roz uske sapne dekhta hoon.", holdTime: 3500, effect: 'moon' },
  { id: 14, text: "Tumhara naam meri zindagi ki woh baarish hai\njo bas kuch waqt ke liye aayi thi,\nlekin itna sukoon de gayi\nki ab poori zindagi\nsirf ussi ka intezar kar sakta hoon.", holdTime: 7000, effect: 'rain' },
  { id: 15, text: "Aur akhir mein bas yehi—\n\nTum jiske bhi saath ho,\nkhush rehna.\nBas khush rehna.\nYehi meri prarthana hai.", holdTime: 6000 },
  { id: 16, text: "Aur agar kabhi meri yaad aaye,\ntoh dhoond lena mujhe.\n\nShayad…\nkahin mil jaaun.", holdTime: 5500 },
  { id: 17, text: "", holdTime: 3000 }, // Silence

  // --- BENGALI SECTION ---
  { id: 18, text: "Janish,\ntoke onek kichu bolte ichaa kore.\nEto kichu bolar achey je\nhoito ekta life o kom pore jabe sobta bolar jonno.", holdTime: 6000, effect: 'crimson' },
  { id: 19, text: "Tai bhablam,\nei chotto website ta baniye jai.\nHoyto purota bojhate parbena,\nkintu jotota perechi,\ntotota rekhe gelam ekhane.", holdTime: 6000, effect: 'crimson' },
  { id: 20, text: "Hoito er por ami number change kore nebo.\nHoito call e ar pabi na.\nHoito dekhao hobena.\nCause ekhane theke chole jabo ami.", holdTime: 6000, effect: 'crimson' },
  { id: 21, text: "Kintu sotti bolchi,\njodi kokhono amar kotha mone pore,\nba khujte ichaa hoy,\ntahole peye jabi.\nTar onek rasta achey.", holdTime: 6000, effect: 'crimson' },
  { id: 22, text: "Ami jani,\ntor hoyto kokhono amar dorkar hobena.\nHoito kokhono amake khujte ichaao korbina.\n\nBut still...\njodi kokhono koris,\ntahole khuje nish.\nAmi opekkhay thakbo.", holdTime: 7500, effect: 'crimson' },
  { id: 23, text: "And...\na really good goodbye.\n\nValo thakish re.\nKhub khushi thakish.", holdTime: 5000, effect: 'crimson' },
  { id: 24, text: "Aar hee,\ntui to janis ami guchiye kichu bolte parina.\nJa mone ashe,\ntai bole di.\n\nTobu o...\nei baar ektu guchiye bolar chesta korlam.\nJotota parlam.", holdTime: 7000, effect: 'crimson' },
  { id: 25, text: "Tai kichu bhul hole,\nplease mind korish na.", holdTime: 5000, effect: 'crimson' }
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
        }, 1500)
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
