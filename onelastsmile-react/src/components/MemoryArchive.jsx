import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

export default memo(function MemoryArchive() {
  const ref = useReveal()

  return (
    <section className="memory-archive" id="memory-archive" ref={ref}>
      <div className="memory-grain"></div>
      
      <div className="memory-content">
        <p className="memory-line reveal">
          The day I met you, I was just looking for a familiar face.
        </p>
        
        <div className="memory-gap"></div>

        <p className="memory-line reveal">
          I had no idea that a single quiet moment would stay with me this long.
        </p>
        
        <div className="memory-gap"></div>

        <p className="memory-line reveal">
          Without me even noticing, you became more than just someone I cared about.
        </p>
        
        <div className="memory-gap"></div>

        <p className="memory-line reveal">
          You just became my quiet comfort... <span className="memory-handwritten">my light in the dark.</span>
        </p>
        
        <div className="memory-long-gap"></div>

        <p className="memory-note reveal">
          aar hee ami likhechi eta onek bhebe bhebe🤧🙌🏻
        </p>
      </div>
    </section>
  )
})
