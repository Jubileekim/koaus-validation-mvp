import { Link } from 'react-router'

export default function PricingSection() {
  return (
    <section
      className="section koaus-pricing"
      id="pricing"
      data-rail-section
      data-reveal
      aria-labelledby="pricing-title"
    >
      <div className="shell">
        <div className="koaus-pricing__heading">
          <div>
            <p className="section-kicker">TWO PATHWAYS</p>
            <h2 id="pricing-title">Start as a creator or a Korean brand.</h2>
          </div>
          <p>
            Choose how you want to use KoaUS. Creator Access unlocks product
            terms. Brands can introduce products for creator collaboration.
          </p>
        </div>

        <div className="koaus-pricing__cards koaus-pricing__cards--pathways">
          <article className="koaus-plan-card koaus-plan-card--featured">
            <div className="koaus-popular-badge">FOR CREATORS</div>
            <div className="koaus-plan-card__head">
              <span>FOR CREATORS</span>
              <h3>Discover Korean Products</h3>
              <p>Unlock creator-only terms and request collaborations.</p>
            </div>
            <p className="koaus-per-person">Creator Access pathway</p>
            <ul>
              <li>Browse curated products</li>
              <li>Unlock creator-only terms</li>
              <li>Request collaborations</li>
              <li>Get product-drop updates</li>
            </ul>
            <Link className="button button--dark" to="/creator-access">
              Get Creator Access
            </Link>
          </article>

          <article className="koaus-plan-card">
            <div className="koaus-plan-card__head">
              <span>FOR KOREAN BRANDS</span>
              <h3>Meet U.S. Creators</h3>
              <p>Introduce your product and collaboration options.</p>
            </div>
            <p className="koaus-per-person">Brand inquiry pathway</p>
            <ul>
              <li>Showcase your product</li>
              <li>Present creator collaboration options</li>
              <li>Receive qualified interest</li>
              <li>Explore U.S. creator opportunities</li>
            </ul>
            <Link className="button button--ghost" to="/brands">
              List Your Product
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
