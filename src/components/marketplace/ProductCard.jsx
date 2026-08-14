import { Link } from 'react-router'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function ProductCard({ product }) {
  return (
    <article className="mp-card">
      <div className="mp-card__visual" aria-hidden="true">
        <span className="mp-card__initials">{initials(product.name)}</span>
        <span className="mp-card__visual-brand">{product.brand}</span>
        <span className="mp-card__visual-category">{product.category}</span>
      </div>

      <div className="mp-card__body">
        <div className="mp-card__meta">
          <span className="mp-card__category">{product.category}</span>
          {product.isNew ? <span className="mp-card__badge">NEW</span> : null}
        </div>
        <p className="mp-card__brand">{product.brand}</p>
        <h2 className="mp-card__name">{product.name}</h2>
        <p className="mp-card__tagline">{product.tagline}</p>

        <dl className="mp-card__facts">
          <div>
            <dt>MSRP</dt>
            <dd>${product.retailPrice}</dd>
          </div>
          <div>
            <dt>Sample</dt>
            <dd>{product.sampleAvailable ? 'Available' : 'Not available'}</dd>
          </div>
          <div>
            <dt>Creator Price</dt>
            <dd>🔒 Creator Access</dd>
          </div>
        </dl>

        <Link className="button button--dark" to={`/products/${product.id}`}>
          View Product
        </Link>
      </div>
    </article>
  )
}
