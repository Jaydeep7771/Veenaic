import { useEffect, useRef } from 'react'

const statement =
  'Veeniac is not a brochure shop. We build our own software, operate it in public, and bring that owner mindset into client systems where invoices, machines, documents, leads, and decisions all need to move cleanly.'

const principles = [
  {
    title: 'Operator memory',
    desc: 'We design around the daily pressure of the people who will actually use the product.',
  },
  {
    title: 'Shippable strategy',
    desc: 'Roadmaps are only useful when they become screens, data models, integrations, and releases.',
  },
  {
    title: 'AI with handles',
    desc: 'Automation needs sources, approvals, fallbacks, and interfaces your team can trust.',
  },
  {
    title: 'After-launch pulse',
    desc: 'We stay close to the product after go-live so the system keeps improving instead of freezing.',
  },
]

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
      const progress = Math.min(Math.max((vh * 0.86 - rect.top) / (rect.height + vh * 0.42), 0), 1)
      const lit = Math.floor(progress * words.length)
      words.forEach((word, i) => word.classList.toggle('lit', i < lit))
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
      <div className="section-intro reveal">
        <p className="section-label">Operator Mindset</p>
        <h2>We build like the product has to pay rent.</h2>
      </div>
      <div className="about-statement">
        <p className="statement-text" ref={textRef}>
          {statement.split(' ').map((word, i) => (
            <span className="word" key={`${word}-${i}`}>{word} </span>
          ))}
        </p>
      </div>
      <div className="principle-grid">
        {principles.map((item, index) => (
          <article className="principle-card reveal" key={item.title}>
            <span className="principle-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
