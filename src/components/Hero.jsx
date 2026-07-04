import { useEffect, useRef } from 'react'
import commandCenter from '../assets/veeniac-command-center.png'

const heroStats = [
  { value: '04', label: 'Owned products in the lab' },
  { value: '12+', label: 'Countries served by shipped systems' },
  { value: '24h', label: 'First response on new briefs' },
]

const missionRail = [
  'Invoice engines',
  'Factory dashboards',
  'Enterprise RAG',
  'Market intelligence',
]

export default function Hero() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -12
      ty = (e.clientY / window.innerHeight - 0.5) * -8
    }
    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    loop()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="hero">
      <div className="hero-media" aria-hidden="true">
        <img src={commandCenter} alt="" />
        <div className="hero-media-shade"></div>
      </div>
      <div className="hero-noise" aria-hidden="true"></div>
      <div className="hero-content-wrap" ref={wrapRef}>
        <p className="hero-kicker">
          <span>Veeniac</span>
          Product lab for business operating software
        </p>
        <h1 className="hero-headline">
          Veeniac builds the software your business runs on.
        </h1>
        <p className="hero-sub">
          We turn messy workflows into polished products: invoicing platforms,
          factory dashboards, AI knowledge systems, and custom tools built to
          survive real operations.
        </p>
        <div className="hero-btns">
          <a href="#work" className="btn-dark">Explore the lab</a>
          <a href="#contact" className="btn-ghost">Bring a workflow</a>
        </div>
        <div className="hero-stats" aria-label="Veeniac highlights">
          {heroStats.map((stat) => (
            <div className="hero-stat" key={stat.value}>
              <span>{stat.value}</span>
              <small>{stat.label}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="mission-rail" aria-label="Product focus areas">
        {missionRail.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}
