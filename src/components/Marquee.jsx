const items = [
  'Website Development',
  'Business Dashboards',
  'AI Automation',
  'BI Analytics',
  'Workflow Solutions',
  'SaaS Platforms',
  'CRM Systems',
  'UI/UX Design',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
