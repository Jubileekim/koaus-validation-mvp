import { PRODUCTS } from '../../data/products.js'
import FeaturedProductsCarousel from './FeaturedProductsCarousel.jsx'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import '../../styles/marketplace.css'

const FEATURED_IDS = [
  'planlight-swellcut',
  'merythod-dual-concealer',
  'prettyskin-collagen-mask',
  'mildlab-liftinal-ampoule',
  'dermasby-caviar-cream',
  'sky-im-h27',
]

function getFeaturedProducts(products) {
  return FEATURED_IDS.map((id) => products.find((product) => product.id === id)).filter(Boolean)
}

export default function MarketplacePreviewSection() {
  const { t } = useTranslation()
  const products = getFeaturedProducts(PRODUCTS)

  return (
    <section
      className="section landing-mp"
      id="marketplace-preview"
      data-reveal
      aria-labelledby="landing-mp-title"
    >
      <div className="shell">
        <header className="pilot-decision-heading">
          <p className="section-kicker">{t('preview.kicker')}</p>
          <div className="pilot-decision-heading__copy">
            <h2 id="landing-mp-title">
              {t('preview.title1')}
              <br />
              <em>{t('preview.titleEm')}</em>
            </h2>
            <p>{t('preview.body')}</p>
          </div>
        </header>

        <FeaturedProductsCarousel
          products={products}
          ctaLabel={t('preview.viewAll')}
          ctaLink="/marketplace"
        />
      </div>
    </section>
  )
}
