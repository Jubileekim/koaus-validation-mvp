import { Link } from 'react-router'

export default function LaunchEventSection() {
  return (
    <section
      className="section koaus-launch-event"
      id="launch-event"
      data-rail-section
      data-reveal
      aria-labelledby="event-title"
    >
      <div className="shell koaus-launch-event__grid">
        <div className="koaus-launch-event__copy">
          <span className="koaus-event-badge">✦ CREATOR PRODUCT DROP</span>
          <p>Be early to new Korean products.</p>
          <h2 id="event-title">
            Be first to discover
            <br />
            <em>
              new Korean
              <br />
              products.
            </em>
          </h2>
          <p className="koaus-event-description">
            Join Creator Access to receive updates when new collaboration-ready
            products are added.
          </p>
          <Link className="button button--dark" to="/creator-access">
            Get Creator Access
          </Link>
        </div>
        <article className="koaus-event-card">
          <div className="koaus-event-card__top">
            <div>
              <span>CREATOR ACCESS</span>
              <h3>Get product-drop updates</h3>
            </div>
            <span className="koaus-event-roundel">
              NEW
              <br />
              DROPS
            </span>
          </div>
          <div className="koaus-event-price">
            <strong>Creator-only terms</strong>
            <small>Unlock pricing, MOQ and samples</small>
          </div>
          <div className="koaus-event-benefits">
            <ul>
              <li>New collaboration-ready products</li>
              <li>Creator-only pricing unlock</li>
              <li>Group Buy, Affiliate, UGC</li>
              <li>Sample availability on product pages</li>
            </ul>
            <ul>
              <li>Product-drop updates</li>
              <li>Request Collaboration from product pages</li>
              <li>Save your creator profile on this device</li>
              <li>Browse the curated marketplace anytime</li>
            </ul>
          </div>
          <p>
            Updates are a preference saved with Creator Access. This MVP does
            not send emails yet.
          </p>
        </article>
      </div>
    </section>
  )
}
