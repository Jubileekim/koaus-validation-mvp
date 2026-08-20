import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import {
  getProductGallery,
  productInitials,
} from '../../utils/productMedia.js'
import ProductImage from './ProductImage.jsx'

export default function ProductGallery({ product }) {
  const { t } = useTranslation()
  const sources = useMemo(() => getProductGallery(product), [product])
  const [failed, setFailed] = useState(() => new Set())
  const [selected, setSelected] = useState(sources[0] || '')

  useEffect(() => {
    const next = getProductGallery(product)
    setFailed(new Set())
    setSelected(next[0] || '')
  }, [product])

  const visible = sources.filter((src) => !failed.has(src))
  const active = visible.includes(selected) ? selected : visible[0] || ''
  const showThumbs = visible.length > 1

  const markFailed = (src) => {
    setFailed((current) => {
      const next = new Set(current)
      next.add(src)
      return next
    })
  }

  const placeholder = (
    <div className="pd-gallery__fallback" aria-hidden="true">
      <span className="pd-gallery__brand">{product.brand}</span>
      <span className="pd-gallery__initials">{productInitials(product.name)}</span>
      <span className="pd-gallery__category">
        {t(`category.${product.category}`)}
      </span>
    </div>
  )

  return (
    <div className="pd-gallery" aria-label={t('product.galleryLabel')}>
      <div className="pd-gallery__stage">
        <ProductImage
          src={active}
          alt={product.name}
          className="pd-gallery__image"
          fallback={placeholder}
          onFail={markFailed}
        />
      </div>
      {showThumbs ? (
        <div className="pd-gallery__thumbs" role="list">
          {visible.map((src, index) => (
            <button
              key={src}
              type="button"
              role="listitem"
              className={
                src === active
                  ? 'pd-gallery__thumb is-active'
                  : 'pd-gallery__thumb'
              }
              onClick={() => setSelected(src)}
              aria-label={t('product.thumbnail', { n: index + 1 })}
              aria-pressed={src === active}
            >
              <ProductImage
                src={src}
                alt=""
                className="pd-gallery__thumb-image"
                fallback={<span>{index + 1}</span>}
                onFail={markFailed}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
