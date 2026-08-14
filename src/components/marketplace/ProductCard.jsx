import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

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
  const { t, pick } = useTranslation()

  return (
    <article className="mp-card">
      <div className="mp-card__visual" aria-hidden="true">
        <span className="mp-card__initials">{initials(product.name)}</span>
        <span className="mp-card__visual-brand">{product.brand}</span>
        <span className="mp-card__visual-category">{t(`category.${product.category}`)}</span>
      </div>

      <div className="mp-card__body">
        <div className="mp-card__meta">
          <span className="mp-card__category">{t(`category.${product.category}`)}</span>
          {product.isNew ? <span className="mp-card__badge">{t('common.new')}</span> : null}
        </div>
        <p className="mp-card__brand">{product.brand}</p>
        <h2 className="mp-card__name">{product.name}</h2>
        <p className="mp-card__tagline">{pick(product.tagline)}</p>

        <dl className="mp-card__facts">
          <div>
            <dt>{t('card.msrp')}</dt>
            <dd>${product.retailPrice}</dd>
          </div>
          <div>
            <dt>{t('card.sample')}</dt>
            <dd>
              {product.sampleAvailable ? t('common.available') : t('common.notAvailable')}
            </dd>
          </div>
          <div>
            <dt>{t('card.creatorPrice')}</dt>
            <dd>{t('card.lockedPrice')}</dd>
          </div>
        </dl>

        <Link className="button button--dark" to={`/products/${product.id}`}>
          {t('card.view')}
        </Link>
      </div>
    </article>
  )
}
