export default function Hero() {
  return (
    <section id="hero">
      <div className="bg-grid"></div>
      <div className="hero-glow"></div>
      <div className="hero-content-wrap">
        <div className="hero-tag">AI-Powered Digital Solutions</div>
        <h1 className="hero-headline">
          <span className="line"><span>Built to</span></span>
          <span className="line"><span>scale your</span></span>
          <span className="line"><span className="grad-text">business.</span></span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-sub">Websites, dashboards, and AI automation engineered for startups and businesses that want to grow fast.</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-dark">Start a project</a>
            <a href="#work" className="btn-ghost">View work →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
