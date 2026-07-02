const testimonials = [
  { initials: 'JM', quote: '"Veenaic transformed our reporting. The dashboard saved my team 15 hours a week and finally gave us clarity on our pipeline."', name: 'James Mitchell', role: 'CEO, GrowthStack — USA' },
  { initials: 'SA', quote: '"The AI automation they built for our document workflow was a game changer. What took 3 staff now runs automatically overnight."', name: 'Sara Al-Fahad', role: 'Operations Director — UAE' },
  { initials: 'LK', quote: '"Best investment we made this year. Our new website tripled inbound leads in the first month. The design is simply world-class."', name: 'Liam Keane', role: 'Founder, Arcflow — UK' },
]

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="test-header reveal">
        <h2>Client stories</h2>
      </div>
      <div className="test-grid">
        {testimonials.map((t) => (
          <div className="test-card reveal" key={t.initials}>
            <div className="test-stars">★★★★★</div>
            <p className="test-quote">{t.quote}</p>
            <div className="test-who">
              <div className="test-av">{t.initials}</div>
              <div className="test-name-wrap">
                <div className="name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
