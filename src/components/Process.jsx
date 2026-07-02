const steps = [
  { n: '01', title: 'Discovery', desc: 'Deep-dive into your business goals, users, and the problems that actually need solving.' },
  { n: '02', title: 'Strategy', desc: 'Define scope, architecture, and a clear roadmap with milestones and deliverables.' },
  { n: '03', title: 'Design', desc: "Premium UI/UX design aligned with your brand and conversion goals." },
  { n: '04', title: 'Build', desc: 'Clean, scalable code with daily updates and complete transparency throughout.' },
  { n: '05', title: 'Launch', desc: 'Deploy, test, and optimize — with support that continues well after go-live.' },
]

export default function Process() {
  return (
    <section id="process">
      <div className="process-header reveal">
        <h2>How we work</h2>
      </div>
      <div className="process-steps">
        {steps.map((s) => (
          <div className="proc-step reveal" key={s.n}>
            <div className="proc-n">{s.n}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
