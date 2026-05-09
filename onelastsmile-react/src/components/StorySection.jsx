import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

export default memo(function StorySection() {
  const ref = useReveal()

  return (
    <section className="story-section" id="anushka-story" ref={ref}>
      <div className="story-bg-overlay"></div>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-pen-fancy"></i> A Quiet Truth</p>
        <h2 className="section-title">শুধু তোকে দেখেই যেতে চেয়েছি—</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="story-container reveal">
        <div className="story-scroll-box">
          <p>I never loved you just to call you mine,<br/>I never wanted to possess you.<br/>I only wanted to see you, hear your voice,<br/>And quietly watch you smile.</p>
          <p>People often ask me for reasons,<br/>But I never had a perfect answer.<br/>I never knew why I loved you so much,<br/>I just loved you, without any explanation.</p>
          <p>Even if you never stay beside me,<br/>I will still care for you quietly.<br/>Even if you never understand my feelings,<br/>I could never bring myself to hate you.<br/>And if life ever brings you back someday,<br/>I will still accept you, without a single question.</p>
          <p>I learned to love without any expectation.<br/>To wait for you without forcing anything.<br/>My feelings simply stayed true in the silence.</p>
          <p style={{ fontSize:'1.15rem', marginTop:'2rem', textAlign:'center', color:'var(--accent)' }}>
            তোকে পাওয়াই আমার ভালোবাসা ছিল না,<br/>তোকে ভালোবাসাটাই ছিল আমার পাওয়া।
          </p>
        </div>
      </div>
    </section>
  )
})
