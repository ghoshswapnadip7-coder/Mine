import { useEffect, useRef } from 'react'

/**
 * Centralized reveal hook — single IntersectionObserver per component mount.
 * Observes all `.reveal` descendants of the returned `ref`.
 */
export function useReveal(deps = []) {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('active')
            obs.unobserve(e.target) // fire once — cheaper
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
  return ref
}
