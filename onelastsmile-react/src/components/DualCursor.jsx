import { useEffect, useRef } from 'react'

export default function DualCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    // Touch bail-out
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      ring.style.display = dot.style.display = 'none'
      return
    }

    let mx = window.innerWidth >> 1, my = window.innerHeight >> 1
    let rx = mx, ry = my, dx = mx, dy = my
    let ringScale = 1.0, isHovering = false
    let cursorVisible = false, beatPhase = 0.0, lastTs = 0.0

    const RING_BASE = 0.880, DOT_BASE = 0.050, SCALE_BASE = 0.880
    const BEAT_OMEGA = 6.2832 / 2.4, BEAT_AMP = 0.08

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      if (!cursorVisible) {
        cursorVisible = true
        ring.style.opacity = '1'; dot.style.opacity = '1'
      }
    }
    const onLeave = () => { cursorVisible = false; ring.style.opacity = '0'; dot.style.opacity = '0' }
    const onEnter = () => { cursorVisible = true; ring.style.opacity = '1'; dot.style.opacity = '1' }

    const clickSel = 'a,button,[onclick],[role="button"],.bd-btn,.nav-link,.dot,.trait,.quote-nav-btn,.music-btn,.btn-keep,.btn-fade'
    const onOver = e => {
      if (e.target?.closest?.(clickSel)) {
        isHovering = true; ring.classList.add('ring-hovering'); dot.classList.add('dot-hovering')
      }
    }
    const onOut = e => {
      if (e.target?.closest?.(clickSel)) {
        isHovering = false; ring.classList.remove('ring-hovering'); dot.classList.remove('dot-hovering')
      }
    }

    // Magnetic effect
    let magEl = null
    const onMagMove = e => {
      const el = e.target?.closest?.('.bd-btn')
      if (el) {
        if (magEl !== el) {
          if (magEl) { magEl.style.transition = 'transform 0.4s ease'; magEl.style.transform = '' }
          magEl = el
        }
        const r = el.getBoundingClientRect()
        const fx = (e.clientX - r.left - r.width * 0.5) * 0.10
        const fy = (e.clientY - r.top - r.height * 0.5) * 0.10
        el.style.transition = 'transform 0.15s ease'
        el.style.transform = `translate(${fx}px,${fy}px)`
      } else if (magEl) {
        magEl.style.transition = 'transform 0.4s ease'
        magEl.style.transform = 'translate(0,0)'
        const _el = magEl; magEl = null
        setTimeout(() => { _el.style.transform = ''; _el.style.transition = '' }, 420)
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousemove', onMagMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    let rafId
    function animate(ts) {
      const dt = lastTs ? Math.min(ts - lastTs, 50) : 16.67
      lastTs = ts
      const norm = dt * 0.06
      const ringF = 1 - Math.pow(RING_BASE, norm)
      const dotF  = 1 - Math.pow(DOT_BASE, norm)
      const scaleF = 1 - Math.pow(SCALE_BASE, norm)

      dx += (mx - dx) * dotF; dy += (my - dy) * dotF
      rx += (mx - rx) * ringF; ry += (my - ry) * ringF
      beatPhase += BEAT_OMEGA * (dt * 0.001)
      const beat = 1 + Math.sin(beatPhase) * BEAT_AMP
      const targetScale = (isHovering ? 1.65 : 1.0) * beat
      ringScale += (targetScale - ringScale) * scaleF

      ring.style.transform = `translate3d(${rx|0}px,${ry|0}px,0)translate(-50%,-50%)scale(${ringScale})`
      dot.style.transform  = `translate3d(${dx|0}px,${dy|0}px,0)translate(-50%,-50%)${isHovering?'scale(1.35)':''}`

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousemove', onMagMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div id="customCursor" ref={ringRef}></div>
      <div id="cursorDot"    ref={dotRef}></div>
    </>
  )
}
