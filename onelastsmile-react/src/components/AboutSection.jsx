import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

export default memo(function AboutSection() {
  const ref = useReveal()

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="section-header reveal">
        <p className="section-label"><i className="fas fa-star"></i> Someone Special</p>
        <h2 className="section-title">About Her</h2>
        <div className="title-ornament"><i className="fas fa-heart"></i></div>
      </div>
      <div className="about-container">
        <div className="about-image-wrap reveal">
          <div className="about-image-ring"></div>
          <div className="about-image-ring ring2"></div>
          <div className="about-avatar">
            <img src="/anushka_portrait.png" alt="Anushka" className="about-portrait"/>
          </div>
          <div className="about-badge"><i className="fas fa-heart"></i> Very Special</div>
        </div>
        <div className="about-text reveal">
          <h3>Anushka</h3>
          <p>
            You became a part of my daily life before I even realized it.
            When we started talking more after the Class 10 results, those long conversations felt like the most normal and comforting part of my day.
          </p>
          <p>
            You are sometimes kind, sometimes distant, and sometimes hard to understand. But I never hated you.
            I just learned to accept you exactly as you are, loving you silently and patiently.
          </p>
          <div className="about-traits">
            {[
              ['fa-star','Genuine'],['fa-heart','Kind'],['fa-magic','Beautiful'],
              ['fa-sun','Bright'],['fa-gem','Precious'],['fa-crown','Thoughtful']
            ].map(([icon, label]) => (
              <div className="trait" key={label}>
                <i className={`fas ${icon}`}></i><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
