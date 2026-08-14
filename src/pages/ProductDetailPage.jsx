import { useState } from 'react'
import { Link, useParams } from 'react-router'
import CollaborationRequestModal from '../components/collaboration/CollaborationRequestModal.jsx'
import LanguageToggle from '../components/layout/LanguageToggle.jsx'
import { PRODUCTS } from '../data/products.js'
import { getRequestsByCreator } from '../services/collaborationStorage.js'
import {
  getCreatorProfile,
  hasCreatorAccess,
} from '../services/creatorStorage.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
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
  const { t, pick } = useTranslation()
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === productId)
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false)
  const [requestVersion, setRequestVersion] = useState(0)

  const creator = getCreatorProfile()
  const unlocked = hasCreatorAccess()
  const existingRequest =
    requestVersion >= 0 && unlocked && creator?.email && product
      ? getRequestsByCreator(creator.email).find(
          (item) => item.productId === product.id,
        ) || null
      : null

  const topbar = (
    <div className="mp-topbar">
      <div className="shell mp-topbar__inner">
        <Link className="wordmark" to="/" aria-label={t('nav.homeAria')}>
          koaus <span>/ marketplace</span>
        </Link>
        <div className="mp-topbar__actions">
          <LanguageToggle />
          <Link className="button button--ghost" to="/marketplace">
            {t('nav.backToMarketplace')}
          </Link>
        </div>
      </div>
    </div>
  )

  if (!product) {
    return (
      <div className="mp-page">
        {topbar}
        <main className="shell pd-main">
          <div className="pd-missing">
            <h1>{t('product.notFoundTitle')}</h1>
            <p>{t('product.notFoundBody')}</p>
            <Link className="button button--dark" to="/marketplace">
              {t('nav.backToMarketplace')}
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const accessTo = `/creator-access?redirect=/products/${product.id}`
  const highlights = pick(product.highlights) || []

  return (
    <div className="mp-page">
      {topbar}

      <main className="shell pd-main">
        <Link className="pd-back" to="/marketplace">
          ← {t('nav.backToMarketplace')}
        </Link>

        <div className="pd-layout">
          <div className="pd-visual" aria-hidden="true">
            <span className="pd-visual__brand">{product.brand}</span>
            <span className="pd-visual__initials">{initials(product.name)}</span>
            <span className="pd-visual__category">{t(`category.${product.category}`)}</span>
          </div>

          <div className="pd-info">
            <p className="pd-kicker">
              {t(`category.${product.category}`)} ·{' '}
              {t('common.madeIn', { country: t('common.countryKorea') })}
            </p>
            <p className="pd-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <p className="pd-tagline">{pick(product.tagline)}</p>
            <p className="pd-description">{pick(product.description)}</p>

            <dl className="pd-facts">
              <div>
                <dt>{t('card.msrp')}</dt>
                <dd>${product.retailPrice}</dd>
              </div>
              <div>
                <dt>{t('product.shipsTo')}</dt>
                <dd>{t('common.shipsToUS')}</dd>
              </div>
              <div>
                <dt>{t('product.sample')}</dt>
                <dd>
                  <span
                    className={
                      product.sampleAvailable
                        ? 'pd-sample is-available'
                        : 'pd-sample is-unavailable'
                    }
                  >
                    {product.sampleAvailable
                      ? t('product.sampleOn')
                      : t('product.sampleOff')}
                  </span>
                </dd>
              </div>
            </dl>

            <section className="pd-block">
              <h2>{t('product.highlights')}</h2>
              <ul className="pd-highlights">
                {highlights.map((highlight) => (
                  <li key={highlight}>✓ {highlight}</li>
                ))}
              </ul>
            </section>

            <section className="pd-block">
              <h2>{t('product.collabTypes')}</h2>
              <div className="pd-chips">
                {product.collaborationTypes.map((type) => (
                  <span className="pd-chip" key={type}>
                    {t(`collabType.${type}`)}
                  </span>
                ))}
              </div>
            </section>

            <aside className={unlocked ? 'pd-access is-unlocked' : 'pd-access'}>
              <p className="pd-access__eyebrow">{t('product.access')}</p>
              {unlocked ? (
                <p className="pd-access__status">{t('product.accessActive')}</p>
              ) : null}
              <dl>
                <div>
                  <dt>{t('product.creatorPrice')}</dt>
                  <dd>
                    {unlocked
                      ? `$${Number(product.creatorPrice).toFixed(2)}`
                      : t('common.locked')}
                  </dd>
                </div>
                <div>
                  <dt>{t('product.creatorMargin')}</dt>
                  <dd>
                    {unlocked ? `${product.creatorMargin}%` : t('common.locked')}
                  </dd>
                </div>
                <div>
                  <dt>{t('product.moq')}</dt>
                  <dd>
                    {unlocked
                      ? t('common.units', { n: product.moq })
                      : t('common.locked')}
                  </dd>
                </div>
              </dl>
              {unlocked ? (
                existingRequest ? (
                  <>
                    <p className="pd-access__requested">
                      {t('product.submittedTitle')}
                    </p>
                    <p className="pd-access__note">
                      {t('product.submittedBody1')}
                      <br />
                      {t('product.submittedBody2')}
                    </p>
                    <button className="pd-access__done" type="button" disabled>
                      {t('product.submittedCta')}
                    </button>
                    <button
                      className="pd-access__another"
                      type="button"
                      onClick={() => {
                        if (!hasCreatorAccess() || !creator?.email) return
                        setIsCollaborationModalOpen(true)
                      }}
                    >
                      {t('product.another')}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="pd-access__note">{t('product.pricingReady')}</p>
                    <button
                      className="button button--dark"
                      type="button"
                      onClick={() => {
                        if (!hasCreatorAccess() || !creator?.email) return
                        setIsCollaborationModalOpen(true)
                      }}
                    >
                      {t('product.request')}
                    </button>
                  </>
                )
              ) : (
                <>
                  <p className="pd-access__note">{t('product.pricingLocked')}</p>
                  <Link className="button button--dark" to={accessTo}>
                    {t('product.unlock')}
                  </Link>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>

      {unlocked && creator ? (
        <CollaborationRequestModal
          product={product}
          creator={creator}
          isOpen={isCollaborationModalOpen}
          onClose={() => setIsCollaborationModalOpen(false)}
          onSuccess={() => setRequestVersion((current) => current + 1)}
        />
      ) : null}
    </div>
  )
}
