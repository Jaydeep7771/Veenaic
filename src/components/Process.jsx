import { useEffect, useRef, useState } from 'react'

const steps = [
  { n: '01', title: 'Discovery', desc: 'Deep-dive into your business goals, users, and the problems that actually need solving.' },
  { n: '02', title: 'Strategy', desc: 'Define scope, architecture, and a clear roadmap with milestones and deliverables.' },
  { n: '03', title: 'Design', desc: "Premium UI/UX design aligned with your brand and conversion goals." },
  { n: '04', title: 'Build', desc: 'Clean, scalable code with daily updates and complete transparency throughout.' },
  { n: '05', title: 'Launch', desc: 'Deploy, test, and optimize — with support that continues well after go-live.' },
]

const STEP_VH = 70

export default function Process() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let ticking = false

    const update = () => {
      ticking = false
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
      const idx = Math.min(Math.floor(progress * steps.length), steps.length - 1)
      setActive(idx)
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

  const step = steps[active]

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ height: `${100 + (steps.length - 1) * STEP_VH}vh` }}
    >
      <div className="process-sticky">
        <div className="process-header reveal">
          <h2>How we work</h2>
        </div>
        <div className="process-stage">
          <div className="process-num-ghost" key={`n${active}`}>{step.n}</div>
          <div className="process-stage-content" key={`c${active}`}>
            <div className="process-stage-label">Step {step.n} / 05</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </div>
        <div className="process-meter">
          {steps.map((s, i) => (
            <span key={s.n} className={i <= active ? 'on' : ''}></span>
          ))}
        </div>
      </div>
    </section>
  )
}
