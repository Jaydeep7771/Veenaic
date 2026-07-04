import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    n: '01',
    verb: 'Decode',
    title: 'Map the real workflow',
    desc: 'We trace the messy handoffs, data sources, edge cases, and decisions before naming the product.',
    artifact: 'Workflow map + build risks',
  },
  {
    n: '02',
    verb: 'Prototype',
    title: 'Make the first useful surface',
    desc: 'We design the core screens quickly so stakeholders can react to something concrete.',
    artifact: 'Clickable interface + scope lock',
  },
  {
    n: '03',
    verb: 'Instrument',
    title: 'Wire data, roles, and guardrails',
    desc: 'The system gets its data model, permissions, automations, and review points before polish.',
    artifact: 'Architecture + integration plan',
  },
  {
    n: '04',
    verb: 'Ship',
    title: 'Release in working slices',
    desc: 'We launch the smallest complete system, test it with real usage, and keep the feedback loop tight.',
    artifact: 'Production release + QA notes',
  },
  {
    n: '05',
    verb: 'Operate',
    title: 'Improve it after reality hits',
    desc: 'Usage teaches the next version. We measure, tune, and add the pieces that actually matter.',
    artifact: 'Iteration backlog + growth loop',
  },
]

const STEP_VH = 68

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
        <div className="section-intro process-intro reveal">
          <p className="section-label">Build Loop</p>
          <h2>Less ceremony. More working software.</h2>
        </div>
        <div className="process-stage">
          <div className="process-map" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.n} className={i <= active ? 'on' : ''}>{s.n}</span>
            ))}
          </div>
          <article className="process-stage-content" key={step.n}>
            <p className="process-stage-label">{step.n} / {step.verb}</p>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <div className="process-artifact">
              <span>Artifact</span>
              <strong>{step.artifact}</strong>
            </div>
          </article>
          <div className="process-ghost" aria-hidden="true">{step.verb}</div>
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
