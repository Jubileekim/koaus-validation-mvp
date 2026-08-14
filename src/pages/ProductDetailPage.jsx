import { Link, useParams } from 'react-router'
import { PRODUCTS } from '../data/products.js'
import { hasCreatorAccess } from '../services/creatorStorage.js'
import '../styles/marketplace.css'
import '../styles/product-detail.css'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function ProductDetailPage() {
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === productId)

  if (!product) {
    return (
      <div className="mp-page">
        <div className="mp-topbar">
          <div className="shell mp-topbar__inner">
            <Link className="wordmark" to="/" aria-label="Koaus home">
              koaus <span>/ marketplace</span>
            </Link>
            <Link className="button button--ghost" to="/marketplace">
              Back to Marketplace
            </Link>
          </div>
        </div>
        <main className="shell pd-main">
          <div className="pd-missing">
            <h1>Product not found</h1>
            <p>This product may no longer be available.</p>
            <Link className="button button--dark" to="/marketplace">
              Back to Marketplace
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const accessTo = `/creator-access?redirect=/products/${product.id}`
  const unlocked = hasCreatorAccess()

  return (
    <div className="mp-page">
      <div className="mp-topbar">
        <div className="shell mp-topbar__inner">
          <Link className="wordmark" to="/" aria-label="Koaus home">
            koaus <span>/ marketplace</span>
          </Link>
          <Link className="button button--ghost" to="/marketplace">
            Back to Marketplace
          </Link>
        </div>
      </div>

      <main className="shell pd-main">
        <Link className="pd-back" to="/marketplace">
          ← Back to Marketplace
        </Link>

        <div className="pd-layout">
          <div className="pd-visual" aria-hidden="true">
            <span className="pd-visual__brand">{product.brand}</span>
            <span className="pd-visual__initials">{initials(product.name)}</span>
            <span className="pd-visual__category">{product.category}</span>
          </div>

          <div className="pd-info">
            <p className="pd-kicker">
              {product.category} · Made in {product.country}
            </p>
            <p className="pd-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <p className="pd-tagline">{product.tagline}</p>
            <p className="pd-description">{product.description}</p>

            <dl className="pd-facts">
              <div>
                <dt>MSRP</dt>
                <dd>${product.retailPrice}</dd>
              </div>
              <div>
                <dt>Ships to</dt>
                <dd>{product.shipsTo}</dd>
              </div>
              <div>
                <dt>Sample</dt>
                <dd>
                  <span
                    className={
                      product.sampleAvailable
                        ? 'pd-sample is-available'
                        : 'pd-sample is-unavailable'
                    }
                  >
                    {product.sampleAvailable
                      ? 'Sample Available'
                      : 'Sample Currently Unavailable'}
                  </span>
                </dd>
              </div>
            </dl>

            <section className="pd-block">
              <h2>Product Highlights</h2>
              <ul className="pd-highlights">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>✓ {highlight}</li>
                ))}
              </ul>
            </section>

            <section className="pd-block">
              <h2>Collaboration types</h2>
              <div className="pd-chips">
                {product.collaborationTypes.map((type) => (
                  <span className="pd-chip" key={type}>
                    {type}
                  </span>
                ))}
              </div>
            </section>

            <aside className={unlocked ? 'pd-access is-unlocked' : 'pd-access'}>
              <p className="pd-access__eyebrow">CREATOR ACCESS</p>
              {unlocked ? (
                <p className="pd-access__status">✓ Access Active</p>
              ) : null}
              <dl>
                <div>
                  <dt>Creator Price</dt>
                  <dd>
                    {unlocked
                      ? `$${Number(product.creatorPrice).toFixed(2)}`
                      : '🔒 Locked'}
                  </dd>
                </div>
                <div>
                  <dt>Creator Margin</dt>
                  <dd>
                    {unlocked ? `${product.creatorMargin}%` : '🔒 Locked'}
                  </dd>
                </div>
                <div>
                  <dt>MOQ</dt>
                  <dd>{unlocked ? `${product.moq} units` : '🔒 Locked'}</dd>
                </div>
              </dl>
              {unlocked ? (
                <>
                  <p className="pd-access__note">
                    Creator-only pricing is available for this product.
                  </p>
                  <button className="button button--dark" type="button" disabled>
                    Request Collaboration
                  </button>
                  <p className="pd-access__coming">Coming next</p>
                </>
              ) : (
                <>
                  <p className="pd-access__note">
                    Creator pricing and collaboration terms are available to
                    approved creators.
                  </p>
                  <Link className="button button--dark" to={accessTo}>
                    Unlock Creator Access
                  </Link>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
