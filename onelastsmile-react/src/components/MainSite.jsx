import { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import AboutSection from './AboutSection'
import BirthdayCountdown from './BirthdayCountdown'
import LoveLetter from './LoveLetter'
import ReasonsSection from './ReasonsSection'
import QuotesCarousel from './QuotesCarousel'
import HeartsDivider from './HeartsDivider'
import Timeline from './Timeline'
import MusicSection from './MusicSection'
import StorySection from './StorySection'
import ThingsINeverSaid from './ThingsINeverSaid'
import IfYouNeverReadThis from './IfYouNeverReadThis'
import ProposeSection from './ProposeSection'
import FinalChoice from './FinalChoice'
import SiteFooter from './SiteFooter'
import HeartCanvas from './HeartCanvas'

export default function MainSite({ isPlaying, setIsPlaying }) {
  const [viewOnce, setViewOnce] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // view-once check
    if (localStorage.getItem('hasVisited') === 'true' && !sessionStorage.getItem('allowAccess')) {
      setViewOnce(true)
      document.body.style.overflow = 'hidden'
    } else {
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const openAgain = () => {
    sessionStorage.setItem('allowAccess', 'true')
    setViewOnce(false)
    document.body.style.overflow = ''
  }

  return (
    <div id="mainSite">
      <HeartCanvas />

      {/* View Once Screen */}
      {viewOnce && (
        <div className="view-once-screen" style={{ display: 'flex' }}>
          <div className="view-once-content">
            <p>This story was meant to be seen once.</p>
            <p>If you&rsquo;re here again,<br/>maybe it already meant something.</p>
            <button className="btn-open-again" onClick={openAgain}>Open Again</button>
          </div>
        </div>
      )}

      {/* Loader */}
      <Loader />

      <Navbar />

      <Hero />
      <AboutSection />
      <BirthdayCountdown />
      <LoveLetter />
      <ReasonsSection />
      <QuotesCarousel />
      <HeartsDivider />
      <Timeline />
      <MusicSection audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <StorySection />
      <ThingsINeverSaid />
      <IfYouNeverReadThis />
      <ProposeSection isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
      <FinalChoice isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
      <SiteFooter />
    </div>
  )
}

function Loader() {
  const [visible, setVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 2000)
    const t2 = setTimeout(() => setVisible(false), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null
  return (
    <div className="loader" id="loader" style={{ opacity, transition: 'opacity 0.8s ease' }}>
      <div className="loader-heart"><i className="fas fa-heart"></i></div>
      <p className="loader-text">Loading Love<span className="dots">...</span></p>
    </div>
  )
}
