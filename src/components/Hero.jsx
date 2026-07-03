import { useEffect, useRef } from 'react'

const taglineItems = ['Websites', 'Dashboards', 'AI Automation', 'BI Analytics']

export default function Hero() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let tx = 0, ty = 0, cx = 0, cy = 0
    let raf

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -14
      ty = (e.clientY / window.innerHeight - 0.5) * -10
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
      <div className="bg-grid"></div>
      <div className="hero-glow"></div>
      <div className="hero-content-wrap" ref={wrapRef}>
        <div className="hero-tag">AI-Powered Digital Solutions</div>
        <h1 className="hero-headline">
          <span className="line"><span>Built to</span></span>
          <span className="line"><span>scale your</span></span>
          <span className="line"><span className="grad-text">business.</span></span>
        </h1>
        <div className="hero-taglines">
          {taglineItems.map((item, i) => (
            <span key={item}>
              {item}
              {i < taglineItems.length - 1 && <span className="hero-taglines-dot">·</span>}
            </span>
          ))}
        </div>
        <div className="hero-bottom">
          <p className="hero-sub">Websites, dashboards, and AI automation engineered for startups and businesses that want to grow fast.</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-dark">Start a project</a>
            <a href="#work" className="btn-ghost">View work →</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span className="hero-scroll-line"></span>
        Scroll to explore
      </div>
    </section>
  )
}
