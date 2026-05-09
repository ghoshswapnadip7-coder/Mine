import { useEffect, useRef, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

const LYRICS = [
  '🎵 You were never just someone I saw...','You became someone I waited to see.',
  'Not because you called me,','But because seeing you',
  'was enough to make my day feel complete.','',
  'I learned to stand quietly,','to look without being noticed,',
  'to smile even when my chest felt heavy.','Because loving you was never loud...',
  'It was silent, patient, and real.','',
  'Maybe you never noticed','how many times I stayed back',
  'just to see you one more moment.','Maybe you never knew',
  'how much courage it took just to stand there.','',
  'Even on the days I felt unwanted,','Even on the days I walked away quietly,',
  'My heart still chose you...','again, and again.','',
  'And even if one day you forget me,','These moments will still remain inside me.',
  'Because some feelings','are not meant to be returned...',
  'They are meant to be remembered.',
]

export default function MusicSection({ audioRef, isPlaying, setIsPlaying }) {
  const lyricsBoxRef  = useRef(null)
  const exactScrollRef = useRef(0)
  const isUserScroll   = useRef(false)
  const userScrollTmr  = useRef(null)
  const rafId          = useRef(null)
  const isPlayingRef   = useRef(isPlaying)
  const sectionRef     = useReveal()

  // Keep ref in sync so rAF closure always sees latest value
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  /* ─ user-scroll suppression ─ */
  const handleUserScroll = useCallback(() => {
    isUserScroll.current = true
    if (lyricsBoxRef.current) exactScrollRef.current = lyricsBoxRef.current.scrollTop
    clearTimeout(userScrollTmr.current)
    userScrollTmr.current = setTimeout(() => { isUserScroll.current = false }, 2500)
  }, [])

  /* ─ rAF lyrics scroll — reads from refs, zero closures captured ─ */
  const startLyricsScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    const lb = lyricsBoxRef.current
    if (!lb) return

    function tick() {
      if (!isPlayingRef.current) return
      if (!isUserScroll.current) {
        exactScrollRef.current += 0.3
        if (exactScrollRef.current + lb.clientHeight >= lb.scrollHeight - 2)
          exactScrollRef.current = 0
        lb.scrollTop = exactScrollRef.current
      } else {
        exactScrollRef.current = lb.scrollTop
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlayingRef.current) {
      audio.pause()
      cancelAnimationFrame(rafId.current)
    } else {
      audio.play().catch(e => console.log('Audio blocked', e))
      if (lyricsBoxRef.current) exactScrollRef.current = lyricsBoxRef.current.scrollTop
      startLyricsScroll()
    }
    setIsPlaying(p => !p)
  }, [audioRef, setIsPlaying, startLyricsScroll])

  /* Start/stop lyrics when isPlaying changes */
  useEffect(() => {
    if (isPlaying) startLyricsScroll()
    else cancelAnimationFrame(rafId.current)
    return () => cancelAnimationFrame(rafId.current)
  }, [isPlaying, startLyricsScroll])

  return (
    <section className="music-section" id="music" ref={sectionRef}>
      <div className="music-bg-overlay"></div>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-music"></i> Swapnadip Sings For You</p>
        <h2 className="section-title">A Song For You</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="music-player reveal">
        <div className="vinyl-wrap">
          <div className={`vinyl${isPlaying ? ' playing' : ''}`} id="vinyl">
            <div className="vinyl-center"><i className="fas fa-music"></i></div>
          </div>
        </div>
        <div className="player-info">
          <h3 className="song-title">The Words I Couldn&apos;t Say Out Loud</h3>
          <p className="song-artist">
            <i className="fas fa-microphone"></i> Swapnadip Ghosh — Written on the days I couldn&apos;t speak
          </p>
          <div
            className="lyrics-box"
            ref={lyricsBoxRef}
            onWheel={handleUserScroll}
            onTouchStart={handleUserScroll}
            onTouchMove={handleUserScroll}
          >
            <div className="lyrics-scroll" id="lyricsScroll">
              {LYRICS.map((line, i) =>
                line === '' ? <br key={i}/> : <p key={i} className="cinematic-line">{line}</p>
              )}
            </div>
          </div>
          <div className="music-controls">
            <button className="music-btn" id="playBtn" onClick={toggleMusic}>
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} id="playIcon"></i>
            </button>
            <div className={`equalizer${isPlaying ? ' active' : ''}`} id="equalizer">
              <div className="bar"></div><div className="bar"></div><div className="bar"></div>
              <div className="bar"></div><div className="bar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
