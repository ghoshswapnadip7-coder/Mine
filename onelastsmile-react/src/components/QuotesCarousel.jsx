import { useState, useEffect, useRef, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const quotes = [
  { text: "I never wanted to have you. I just wanted to keep seeing you.", author: "— A silent wish" },
  { text: "Even if you never choose me, I'll still choose you.",           author: "— Quiet devotion" },
  { text: "If you ever come back someday, I'll still be there.",           author: "— Waiting patiently" },
  { text: "I don't know why I love you. If someone asks me the reason, I still don't have an answer. I just do.", author: "— The simple truth" },
  { text: "I never asked you to love me. I only wished to stay somewhere in your world.", author: "— Just staying close" },
]

export default function QuotesCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const ref = useReveal()

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % quotes.length), 5000)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const goTo = useCallback(i => { setCurrent(i); resetTimer() }, [resetTimer])
  const prev  = useCallback(() => { setCurrent(c => (c - 1 + quotes.length) % quotes.length); resetTimer() }, [resetTimer])
  const next  = useCallback(() => { setCurrent(c => (c + 1) % quotes.length); resetTimer() }, [resetTimer])

  return (
    <section className="quotes-section" id="quotes" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-quote-left"></i> Words of Love</p>
        <h2 className="section-title">Love Quotes For You</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="quotes-carousel reveal">
        {quotes.map((q, i) => (
          <div key={i} className={`quote-card${i === current ? ' active' : ''}`} id={`quote-${i}`}>
            <i className="fas fa-quote-left quote-icon"></i>
            <p className="quote-text">{q.text}</p>
            <p className="quote-author">{q.author}</p>
          </div>
        ))}
        <div className="quotes-dots" id="quotesDots">
          {quotes.map((_, i) => (
            <span key={i} className={`dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)}></span>
          ))}
        </div>
        <div className="quotes-nav">
          <button className="quote-nav-btn" onClick={prev}><i className="fas fa-chevron-left"></i></button>
          <button className="quote-nav-btn" onClick={next}><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>
  )
}
