const signals = [
  {
    metric: '15h/wk',
    title: 'Less spreadsheet chasing',
    text: 'Reporting surfaces should remove recurring status calls, not create another dashboard nobody trusts.',
  },
  {
    metric: '3x',
    title: 'Cleaner lead capture',
    text: 'High-intent pages need fast context, sharp proof, and a path that lets serious buyers raise their hand.',
  },
  {
    metric: '0.2s',
    title: 'Interface response target',
    text: 'Operational tools should feel immediate because slow software becomes a hidden tax on every shift.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="section-intro test-intro reveal">
        <p className="section-label">Outcome Signals</p>
        <h2>We optimize for the things people feel on Monday.</h2>
      </div>
      <div className="signal-grid">
        {signals.map((signal) => (
          <article className="signal-card reveal" key={signal.metric}>
            <span>{signal.metric}</span>
            <h3>{signal.title}</h3>
            <p>{signal.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
