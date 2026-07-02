import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60)
            revObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    revealEls.forEach((el) => revObs.observe(el))
    return () => revObs.disconnect()
  }, [])
}
