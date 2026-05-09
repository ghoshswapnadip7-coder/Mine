import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

export default memo(function IfYouNeverReadThis() {
  const ref = useReveal()

  return (
    <section className="confession-section" id="if-you-never-read-this" style={{ background: 'rgba(15,10,20,0.95)' }} ref={ref}>
      <div className="confession-container reveal">
        <div className="confession-icon"><i className="fas fa-envelope"></i></div>
        <h2 className="confession-title">If You Never Read This</h2>
        <div className="confession-content">
          <p>Even if you never understand my feelings, I want you to know that the love was still real. Even if you never read this, I don&rsquo;t regret loving you.</p>
          <p>This website was not made to force you or make you feel guilty. It was made simply to release the emotions I couldn&rsquo;t hold inside anymore.</p>
          <p>Loving you changed me, even if nothing came from it. And I have accepted that.</p>
        </div>
      </div>
    </section>
  )
})
