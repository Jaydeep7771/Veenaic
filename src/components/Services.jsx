import { useState } from 'react'

const services = [
  {
    num: '01',
    tag: 'Web Systems',
    title: 'Websites that behave like products',
    desc:
      'Brand sites, SaaS pages, and conversion flows designed around the jobs your visitors came to finish.',
    bestFor: 'Founders, agencies, exporters, and B2B teams that need trust fast.',
    deliverables: ['UX architecture', 'High-fidelity UI', 'Responsive React build', 'SEO and speed pass'],
  },
  {
    num: '02',
    tag: 'Dashboards',
    title: 'Decision rooms for live operations',
    desc:
      'Dashboards that connect scattered business data and make the next move obvious for every role.',
    bestFor: 'Manufacturing, sales, finance, support, and leadership reporting.',
    deliverables: ['Data model', 'KPI surfaces', 'Role views', 'Export and alert flows'],
  },
  {
    num: '03',
    tag: 'AI Workflow',
    title: 'Automation with review points',
    desc:
      'AI agents, document processors, lead routers, and back-office automations with clear controls.',
    bestFor: 'Teams drowning in repetitive documents, messages, checks, and handoffs.',
    deliverables: ['Workflow map', 'AI prompts and tools', 'Human approval paths', 'Failure handling'],
  },
  {
    num: '04',
    tag: 'Internal OS',
    title: 'Custom software for messy workflows',
    desc:
      'Internal platforms that replace shared spreadsheets, WhatsApp loops, and fragile manual work.',
    bestFor: 'Businesses with a workflow that no off-the-shelf tool fits cleanly.',
    deliverables: ['Product spec', 'Database design', 'Admin views', 'Launch and iteration plan'],
  },
  {
    num: '05',
    tag: 'RevOps',
    title: 'CRM and process automation',
    desc:
      'Lead pipelines, task systems, and customer workflows designed around how your team actually sells.',
    bestFor: 'Sales and service teams that need accountability without software bloat.',
    deliverables: ['Pipeline design', 'Automation rules', 'Integrations', 'Reporting loops'],
  },
  {
    num: '06',
    tag: 'Experience',
    title: 'Interface design for serious tools',
    desc:
      'Dense, polished UI for products where people compare, scan, decide, and repeat work all day.',
    bestFor: 'Dashboards, portals, admin panels, AI tools, and SaaS workflows.',
    deliverables: ['Design system', 'Interactive prototypes', 'Component specs', 'UX review'],
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section id="services">
      <div className="section-intro services-intro reveal">
        <p className="section-label">Mission Types</p>
        <h2>Bring the workflow. We shape the system.</h2>
        <p>
          Every engagement starts with the operational mess, then moves toward
          interfaces, automations, and release plans that people can use.
        </p>
      </div>
      <div className="services-split reveal">
        <ul className="services-list" aria-label="Service mission types">
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
                <span>
                  <strong>{s.title}</strong>
                  <small>{s.tag}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <article className="services-detail" key={current.num}>
          <div className="service-detail-top">
            <span className="service-tag">{current.tag}</span>
            <span>{current.num} / 06</span>
          </div>
          <h3>{current.title}</h3>
          <p>{current.desc}</p>
          <div className="service-best">
            <span>Best for</span>
            <strong>{current.bestFor}</strong>
          </div>
          <div className="deliverable-grid">
            {current.deliverables.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <a href="#contact" className="detail-link">Scope this mission</a>
        </article>
      </div>
    </section>
  )
}
