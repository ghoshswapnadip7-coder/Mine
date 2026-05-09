import { memo } from 'react'

export default memo(function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.3s' }}>
          <i className="fas fa-music"></i>&nbsp; A Song From My Heart To Yours&nbsp; <i className="fas fa-music"></i>
        </p>
        <h1 className="hero-name fade-in-up" style={{ animationDelay: '0.6s' }}>Anushka</h1>
        <p className="hero-tagline fade-in-up" style={{ animationDelay: '0.9s' }}>
          I never asked you to love me.<br/>
          I only wished to stay somewhere in your world.<br/>
          This is just what I felt, honestly and quietly.
        </p>
        <div className="hero-from fade-in-up" style={{ animationDelay: '1.2s' }}>
          <span>— Written patiently from my heart, Swapnadip</span>
        </div>
        <div className="hero-buttons fade-in-up" style={{ animationDelay: '1.5s' }}>
          <a href="#propose" className="btn-primary">
            <i className="fas fa-envelope"></i>&nbsp; A Message For You
          </a>
          <a href="#about" className="btn-secondary">
            <i className="fas fa-heart"></i>&nbsp; Explore
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
        <p>Scroll Down</p>
      </div>
    </section>
  )
})
