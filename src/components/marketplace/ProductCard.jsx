import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import { getProductGallery, productInitials } from '../../utils/productMedia.js'
import ProductImage from './ProductImage.jsx'

export default function ProductCard({ product }) {
  const { t, pick } = useTranslation()
  const mainImage = product.images?.main || getProductGallery(product)[0] || ''
  const href = `/products/${product.id}`

  const placeholder = (
    <div className="mp-card__fallback">
      <span className="mp-card__initials">{productInitials(product.name)}</span>
    </div>
  )

  return (
    <article className="mp-card">
      <Link className="mp-card__visual" to={href} tabIndex={-1} aria-hidden="true">
        <ProductImage
          src={mainImage}
          alt=""
          className="mp-card__image"
          fallback={placeholder}
        />
        {product.isNew ? (
          <span className="mp-card__badge mp-card__badge--overlay">
            {t('common.new')}
          </span>
        ) : null}
        <span className="mp-card__visual-category">
          {t(`category.${product.category}`)}
        </span>
      </Link>

      <div className="mp-card__body">
        <p className="mp-card__brand">{product.brand}</p>
        <h2 className="mp-card__name">
          <Link to={href}>{product.name}</Link>
        </h2>
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

        <Link className="button button--dark" to={href}>
          {t('card.view')}
        </Link>
      </div>
    </article>
  )
}
