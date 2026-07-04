import { products } from '../data/products'

export default function Work() {
  return (
    <section id="work">
      <div className="trust-strip reveal">
        Trusted by manufacturers, exporters & SaaS teams across 12+ countries
      </div>
      <div className="work-header reveal">
        <div>
          <h2>Products we build & run</h2>
          <p className="work-header-sub">Live software used by real businesses — designed, built, and operated end-to-end by Veeniac.</p>
        </div>
        <a href="#contact">Want one for your business? →</a>
      </div>
      <div className="products-grid">
        {products.map((p) => (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card reveal"
            key={p.num}
          >
            <div className="product-mock">
              <div className="product-mock-bar">
                <span className="mock-dot"></span>
                <span className="mock-dot"></span>
                <span className="mock-dot"></span>
                <span className="mock-url">{p.domain}</span>
              </div>
              <div className="product-mock-body">
                <div className="mock-stat-row">
                  <span className="mock-stat"></span>
                  <span className="mock-stat"></span>
                  <span className="mock-stat"></span>
                </div>
                <div className="mock-chart">
                  <span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
            <div className="product-head">
              <h3>{p.title}</h3>
              {p.live && <span className="proj-live">● LIVE</span>}
              <div className="product-tags">
                {p.tags.map((tag) => (
                  <span className="proj-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p className="product-tagline">{p.tagline}</p>
            <ul className="product-features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <span className="product-visit">Visit product →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
