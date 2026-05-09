import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const links = [
    { href:'#home',           icon:'fa-home',               label:'Home' },
    { href:'#about',          icon:'fa-star',               label:'About Her' },
    { href:'#birthday',       icon:'fa-cake-candles',       label:'Birthday' },
    { href:'#letter',         icon:'fa-envelope-open-text', label:'Love Letter' },
    { href:'#reasons',        icon:'fa-heart',              label:'Why I Love You' },
    { href:'#quotes',         icon:'fa-quote-left',         label:'Quotes' },
    { href:'#timeline',       icon:'fa-infinity',           label:'Our Story' },
    { href:'#music',          icon:'fa-music',              label:'Song' },
    { href:'#anushka-story',  icon:'fa-pen-fancy',          label:'Poem' },
    { href:'#confession',     icon:'fa-hand-holding-heart', label:'My Truth' },
    { href:'#propose',        icon:'fa-ring',               label:'Proposal', cls:'propose-nav' },
  ]

  return (
    <nav className={`navbar${scrolled?' scrolled':''}`} id="navbar">
      <div className="nav-logo">
        <i className="fas fa-heart-pulse"></i>
        <span>Anushka</span>
      </div>
      <ul className={`nav-links${menuOpen?' active':''}`} id="navLinks">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className={`nav-link${l.cls?' '+l.cls:''}`} onClick={closeMenu}>
              <i className={`fas ${l.icon}`}></i> {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div
        className={`hamburger${menuOpen?' active':''}`}
        id="hamburger"
        onClick={() => setMenuOpen(m => !m)}
      >
        <span></span><span></span><span></span>
      </div>
    </nav>
  )
}
