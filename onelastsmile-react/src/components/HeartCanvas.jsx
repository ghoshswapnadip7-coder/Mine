import { useEffect, useRef } from 'react'

export default function HeartCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize, { passive: true })

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.speed = Math.random() * 0.8 + 0.2
        this.opacity = Math.random() * 0.5 + 0.1
        this.type = Math.random() > 0.7 ? 'heart' : 'star'
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
        this.twinklePhase = Math.random() * Math.PI * 2
      }
      draw() {
        this.twinklePhase += this.twinkleSpeed
        const alpha = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase))
        ctx.fillStyle = this.type === 'heart'
          ? `rgba(255,77,133,${alpha})`
          : `rgba(255,255,255,${alpha * 0.7})`
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill()
      }
      update() {
        this.y -= this.speed
        this.x += Math.sin(this.y * 0.008) * 0.3
        if (this.y < -10) { this.y = canvas.height + 10; this.x = Math.random() * canvas.width }
        this.draw()
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle())
    let rafId

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => p.update())
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas id="heartCanvas" ref={canvasRef}></canvas>
}
