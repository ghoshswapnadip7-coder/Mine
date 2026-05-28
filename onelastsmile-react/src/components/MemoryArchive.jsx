import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

export default memo(function MemoryArchive() {
  const ref = useReveal()

  return (
    <section className="memory-archive" id="memory-archive" ref={ref}>
      <div className="memory-grain"></div>
      <div className="memory-content reveal">
        <p className="memory-text">
          The day I met you, I was just looking for a familiar face in the crowd.
        </p>
        <p className="memory-text">
          I had no idea that a single quiet moment would anchor itself so deeply into my life.
        </p>
        <p className="memory-text">
          As time passed, without me even noticing, you became more than just a person I loved.
        </p>
        <p className="memory-text">
          You became the quiet comfort in my everyday life... my light in the dark.
        </p>
      </div>
    </section>
  )
})
