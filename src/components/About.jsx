export default function About() {
  return (
    <section id="about">
      <div className="about-left reveal">
        <div className="about-label">About Veenaic</div>
        <h2 className="about-title">We build digital systems that mean business.</h2>
        <p className="about-body">Veenaic is an AI-powered digital solutions agency. We don't just write code — we solve the operational, sales, and growth problems behind your business using websites, dashboards, and intelligent automation.</p>
        <p className="about-body" style={{ marginTop: '1rem' }}>Built for startups, SMBs, SaaS companies, and international clients across the US, UK, UAE, Europe and beyond.</p>
        <a href="#work" className="about-link">See our work →</a>
      </div>
      <div className="about-right">
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
