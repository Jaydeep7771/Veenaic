import { products } from '../data/products'

function ProductVisual({ product }) {
  return (
    <div className={`product-visual ${product.visual}`} aria-hidden="true">
      <div className="visual-topline">
        <span>{product.type}</span>
        <span>{product.signal}</span>
      </div>
      <div className="visual-stage">
        <span className="visual-node node-a"></span>
        <span className="visual-node node-b"></span>
        <span className="visual-node node-c"></span>
        <span className="visual-node node-d"></span>
        <span className="visual-path path-a"></span>
        <span className="visual-path path-b"></span>
        <span className="visual-path path-c"></span>
        <div className="visual-stack">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="visual-meter">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work">
      <div className="trust-strip reveal">
        Live product thinking, not portfolio theater
      </div>
      <div className="section-intro work-intro reveal">
        <p className="section-label">Product Atlas</p>
        <h2>Owned systems we build, test, and run.</h2>
        <p>
          These products shape how we work with clients: practical interfaces,
          durable data models, and automation that has to behave under pressure.
        </p>
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
            <ProductVisual product={p} />
            <div className="product-copy">
              <div className="product-kicker">
                <span>{p.num}</span>
                <span>{p.type}</span>
                {p.live && <strong>Live</strong>}
              </div>
              <h3>{p.title}</h3>
              <p className="product-tagline">{p.tagline}</p>
              <p className="product-blurb">{p.blurb}</p>
              <div className="product-metric">{p.metric}</div>
              <ul className="product-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="product-foot">
                <div className="product-tags">
                  {p.tags.map((tag) => (
                    <span className="proj-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="product-visit">Visit {p.domain}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
