const services = [
  { num: '01', icon: '🌐', title: 'Custom Website Development', desc: 'High-converting websites built with Next.js and React. Engineered for speed, SEO, and lead generation from day one.' },
  { num: '02', icon: '📊', title: 'Business Dashboards & BI', desc: 'Custom analytics dashboards that turn your raw data into decisions. Power BI, real-time reporting, and KPI visibility.', accent: 'accent' },
  { num: '03', icon: '🤖', title: 'AI Automation & Workflows', desc: 'Eliminate repetitive tasks with intelligent automation. Document processing, lead routing, and workflow systems.', accent: 'secondary' },
  { num: '04', icon: '🚀', title: 'SaaS & Landing Pages', desc: 'Conversion-optimized pages for SaaS products. Designed to acquire users and reduce drop-off at every step.' },
  { num: '05', icon: '⚙️', title: 'CRM & Process Automation', desc: "Connect your tools and build a CRM that works the way your business actually operates — not the other way around.", accent: 'accent' },
  { num: '06', icon: '🎨', title: 'UI/UX Design', desc: "Premium interface design that reflects your brand's quality. From wireframe to pixel-perfect production delivery.", accent: 'secondary' },
]

const accentStyles = {
  accent: { background: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.2)' },
  secondary: { background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.2)' },
}

export default function Services() {
  return (
    <section id="services">
      <div className="services-header reveal">
        <h2>What we do</h2>
        <p>Three focused services. Each one designed to deliver measurable business results.</p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-item reveal" key={s.num}>
            <div className="service-num">{s.num}</div>
            <div className="service-icon-wrap" style={s.accent ? accentStyles[s.accent] : undefined}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  )
}
