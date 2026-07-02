import { useEffect, useRef } from 'react'

const statement =
  "Veeniac is an AI-powered digital solutions agency. We don't just write code — we solve the operational, sales, and growth problems behind your business with websites, dashboards, and intelligent automation."

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
          <div className="stat-num grad">50+</div>
          <div className="stat-desc">Projects delivered across web, dashboards, and AI automation</div>
        </div>
        <div className="stat-box reveal">
          <div className="stat-num">12+</div>
          <div className="stat-desc">Countries served — US, UK, UAE, Europe, Australia and growing</div>
        </div>
      </div>
    </section>
  )
}
