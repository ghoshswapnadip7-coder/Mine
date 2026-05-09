import { useState, useEffect } from 'react'
import './legacy.css'
import './perf.css'
import DualCursor from './components/DualCursor'
import BirthdayFlow from './components/BirthdayFlow'
import MainSite from './components/MainSite'

export default function App() {
  const [phase, setPhase] = useState('birthday') // 'birthday' | 'main'
  const [isPlaying, setIsPlaying] = useState(false)

  // Check view-once on mount
  useEffect(() => {
    localStorage.removeItem('siteDestroyed')
  }, [])

  return (
    <>
      <DualCursor />
      {phase === 'birthday' ? (
        <BirthdayFlow onEnter={() => setPhase('main')} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      ) : (
        <MainSite isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )}
    </>
  )
}
