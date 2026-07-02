import { useState } from 'react'

const services = [
  { num: '01', icon: '🌐', title: 'Custom Website Development', desc: 'High-converting websites built with Next.js and React. Engineered for speed, SEO, and lead generation from day one.' },
  { num: '02', icon: '📊', title: 'Business Dashboards & BI', desc: 'Custom analytics dashboards that turn your raw data into decisions. Power BI, real-time reporting, and KPI visibility.' },
  { num: '03', icon: '🤖', title: 'AI Automation & Workflows', desc: 'Eliminate repetitive tasks with intelligent automation. Document processing, lead routing, and workflow systems.' },
  { num: '04', icon: '🚀', title: 'SaaS & Landing Pages', desc: 'Conversion-optimized pages for SaaS products. Designed to acquire users and reduce drop-off at every step.' },
  { num: '05', icon: '⚙️', title: 'CRM & Process Automation', desc: "Connect your tools and build a CRM that works the way your business actually operates — not the other way around." },
  { num: '06', icon: '🎨', title: 'UI/UX Design', desc: "Premium interface design that reflects your brand's quality. From wireframe to pixel-perfect production delivery." },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section id="services">
      <div className="services-header reveal">
        <h2>What we do</h2>
        <p>Six focused services. Each one designed to deliver measurable business results.</p>
      </div>
      <div className="services-split reveal">
        <ul className="services-list">
          {services.map((s, i) => (
            <li key={s.num}>
              <button
                type="button"
                className={`services-list-item${i === active ? ' active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="sl-num">{s.num}</span>
                <span className="sl-title">{s.title}</span>
                <span className="sl-arrow">→</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="services-detail">
          <div className="services-detail-inner" key={current.num}>
            <div className="sd-icon">{current.icon}</div>
            <div className="sd-num">{current.num} / 06</div>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
            <a href="#contact" className="sd-link">Discuss this service →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
