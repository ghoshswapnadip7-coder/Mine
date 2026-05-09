import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

export default memo(function ThingsINeverSaid() {
  const ref = useReveal()

  return (
    <section className="confession-section" id="things-i-never-said" ref={ref}>
      <div className="confession-bg"></div>
      <div className="confession-container reveal">
        <div className="confession-icon"><i className="fas fa-comment-slash"></i></div>
        <h2 className="confession-title">Things I Never Said</h2>
        <div className="confession-content">
          <p>Anushka,</p>
          <p>It was always so difficult for me to express my feelings face to face. Whenever I tried, the words just stayed locked inside my chest.</p>
          <p>I often stayed completely silent, even on the days when I really wanted to speak to you.</p>
          <p>The fear of losing whatever small connection we had made me quiet. Over time, loving you silently just became normal for me.</p>
          <p className="confession-promise">
            <i className="fas fa-leaf"></i>
            I kept it all inside, quietly.
            <i className="fas fa-leaf"></i>
          </p>
        </div>
        <div className="confession-sign">
          <p>— Swapnadip Ghosh</p>
          <p className="confession-subtitle"><i className="fas fa-pen-fancy"></i> Silent Thoughts</p>
        </div>
      </div>
    </section>
  )
})
