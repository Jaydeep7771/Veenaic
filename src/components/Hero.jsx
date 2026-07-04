import { useEffect, useRef } from 'react'

const taglineItems = ['Invixy', 'Manufacture OS', 'Enterprise RAG', 'Synapse AI']

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
        <div className="hero-tag">Digital Product Agency</div>
        <h1 className="hero-headline">
          <span className="line"><span>We ship</span></span>
          <span className="line"><span>products that</span></span>
          <span className="line"><span className="grad-text">mean business.</span></span>
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
          <p className="hero-sub">Veeniac designs, builds, and operates software products — from invoicing platforms to factory dashboards. The next one could be built for your business.</p>
          <div className="hero-btns">
            <a href="#work" className="btn-dark">Explore our products</a>
            <a href="#contact" className="btn-ghost">Build yours with us →</a>
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
