import { Link } from 'react-router'
import { PRODUCTS } from '../../data/products.js'
import ProductCard from '../marketplace/ProductCard.jsx'
import '../../styles/marketplace.css'

function getPreviewProducts(products) {
  const newest = products.filter((product) => product.isNew)
  const source = newest.length > 0 ? newest : products
  return source.slice(0, 4)
}

export default function MarketplacePreviewSection() {
  const products = getPreviewProducts(PRODUCTS)

  return (
    <section
      className="section landing-mp"
      id="marketplace-preview"
      data-reveal
      aria-labelledby="landing-mp-title"
    >
      <div className="shell">
        <header className="pilot-decision-heading">
          <p className="section-kicker">CREATOR MARKETPLACE</p>
          <div className="pilot-decision-heading__copy">
            <h2 id="landing-mp-title">
              Fresh from Korea.
              <br />
              <em>Ready for collaboration.</em>
            </h2>
            <p>Explore curated products looking to work with U.S. creators.</p>
          </div>
        </header>

        <div className="landing-mp__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="landing-mp__cta">
          <Link className="button button--dark" to="/marketplace">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
