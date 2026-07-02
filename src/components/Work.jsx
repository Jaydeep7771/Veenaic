import { products } from '../data/products'

export default function Work() {
  return (
    <section id="work">
      <div className="work-header reveal">
        <h2>Our products</h2>
        <a href="#contact">Get one built for you →</a>
      </div>
      {products.map((p) => (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-row reveal"
          key={p.num}
        >
          <div className="proj-num">{p.num}</div>
          <div className="proj-info">
            <div className="proj-title">
              {p.title} {p.live && <span className="proj-live">● LIVE</span>}
            </div>
            <div className="proj-sub">{p.desc}</div>
          </div>
          <div className="proj-tags">
            {p.tags.map((tag) => (
              <span className="proj-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <div className="proj-arrow">↗</div>
        </a>
      ))}
    </section>
  )
}
