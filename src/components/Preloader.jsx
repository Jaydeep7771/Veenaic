import { useEffect, useState } from 'react'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1500
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setGone(true), 1000)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null

  return (
    <div className={`preloader${count >= 100 ? ' exit' : ''}`}>
      <div className="preloader-name">
        {'Veeniac'.split('').map((ch, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>{ch}</span>
        ))}
      </div>
      <div className="preloader-count">{count}%</div>
    </div>
  )
}
