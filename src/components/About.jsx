import { useEffect, useRef } from 'react'

const statement =
  "Veeniac is a digital product agency. We don't just take briefs — we build and operate our own software products, and we bring that same product muscle to the platforms, dashboards, and AI systems your business needs."

export default function About() {
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const words = el.querySelectorAll('.word')
    let ticking = false

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(Math.max((vh * 0.85 - rect.top) / (rect.height + vh * 0.45), 0), 1)
      const lit = Math.floor(progress * words.length)
      words.forEach((w, i) => w.classList.toggle('lit', i < lit))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="about">
      <div className="about-statement">
        <div className="about-label">About Veeniac</div>
        <p className="statement-text" ref={textRef}>
          {statement.split(' ').map((word, i) => (
            <span className="word" key={i}>{word} </span>
          ))}
        </p>
        <a href="#work" className="about-link">See our work →</a>
      </div>
      <div className="about-stats">
        <div className="stat-box reveal">
          <div className="stat-num grad">04</div>
          <div className="stat-desc">Products in production — built, shipped, and operated by our team</div>
        </div>
        <div className="stat-box reveal">
          <div className="stat-num">12+</div>
          <div className="stat-desc">Countries served — US, UK, UAE, Europe, Australia and growing</div>
        </div>
      </div>
    </section>
  )
}
