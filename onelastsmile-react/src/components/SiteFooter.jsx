import { memo } from 'react'

export default memo(function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-hearts">
        <i className="fas fa-leaf"></i>
        <i className="fas fa-dove"></i>
        <i className="fas fa-leaf"></i>
      </div>
      <p className="footer-text">
        Made with quiet devotion by <strong>Swapnadip Ghosh</strong> for <strong>Anushka</strong>
      </p>
      <p className="footer-sub">If love is true, no effort ever goes to waste.</p>
      <p className="footer-copy">Silent Memories — 2026</p>
    </footer>
  )
})
