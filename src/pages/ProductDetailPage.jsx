import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import CollaborationRequestModal from '../components/collaboration/CollaborationRequestModal.jsx'
import Header from '../components/layout/Header.jsx'
import ProductCard from '../components/marketplace/ProductCard.jsx'
import ProductGallery from '../components/marketplace/ProductGallery.jsx'
import { PRODUCTS } from '../data/products.js'
import { getRequestsByCreator } from '../services/collaborationStorage.js'
import {
  getCreatorProfile,
  hasCreatorAccess,
} from '../services/creatorStorage.js'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import {
  displayFitTag,
  getLifestyleImage,
} from '../utils/productMedia.js'
import '../styles/marketplace.css'
import '../styles/product-detail.css'

function countryLabel(t, country) {
  if (country === 'China') return t('common.countryChina')
  if (country === 'Korea') return t('common.countryKorea')
  return country || t('common.countryKorea')
}

function originCopy(t, product) {
  const madeIn = t('common.madeIn', { country: countryLabel(t, product.country) })
  if (product.brandOrigin === 'Korea' && product.country && product.country !== 'Korea') {
    return `${t('product.koreanBrand')} · ${madeIn}`
  }
  return madeIn
}

function getRelatedProducts(product) {
  return PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, 3)
}

function LifestyleVisual({ src }) {
  const [failed, setFailed] = useState(!src)
  if (!src || failed) return null
  return (
    <div className="pd-story__visual">
      <img
        src={src}
        alt=""
        className="pd-story__image"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function SampleStatus({ product, t }) {
  return (
    <span
      className={
        product.sampleAvailable ? 'pd-sample is-available' : 'pd-sample is-unavailable'
      }
    >
      {product.sampleAvailable ? t('product.sampleOn') : t('product.sampleOff')}
    </span>
  )
}

export default function ProductDetailPage() {
  const { productId } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [productId])

  return <ProductDetailContent key={productId} productId={productId} />
}

function ProductDetailContent({ productId }) {
  const { t, pick } = useTranslation()
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

  if (!product) {
    return (
      <div className="mp-page">
        <Header />
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
  const contentIdeas = pick(product.contentIdeas) || []
  const contentAngles = pick(product.creatorFit?.contentAngles) || []
  const lifestyleImage = getLifestyleImage(product)
  const related = getRelatedProducts(product)
  const openCollaboration = () => {
    if (!hasCreatorAccess() || !creator?.email) return
    setIsCollaborationModalOpen(true)
  }

  return (
    <div className="mp-page">
      <Header />

      <main className="shell pd-main">
        <Link className="pd-back" to="/marketplace">
          ← {t('nav.backToMarketplace')}
        </Link>

        <div className="pd-layout">
          <ProductGallery product={product} />

          <div className="pd-info">
            <p className="pd-kicker">
              {t(`category.${product.category}`)} · {originCopy(t, product)}
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
                <dt>{t('product.sample')}</dt>
                <dd>
                  <SampleStatus product={product} t={t} />
                </dd>
              </div>
            </dl>

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
                {unlocked ? (
                  <div>
                    <dt>{t('product.sample')}</dt>
                    <dd>
                      <SampleStatus product={product} t={t} />
                    </dd>
                  </div>
                ) : null}
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
                      onClick={openCollaboration}
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
                      onClick={openCollaboration}
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

        <section className="pd-section pd-story">
          <div className="pd-story__copy">
            <p className="pd-section__kicker">{t('product.storyKicker')}</p>
            <h2>{t('product.story')}</h2>
            <p>{pick(product.description)}</p>
          </div>
          {lifestyleImage ? (
            <LifestyleVisual src={lifestyleImage} />
          ) : null}
        </section>

        {highlights.length > 0 ? (
          <section className="pd-section">
            <p className="pd-section__kicker">{t('product.highlightsKicker')}</p>
            <h2>{t('product.highlights')}</h2>
            <div className="pd-feature-grid">
              {highlights.map((highlight, index) => (
                <article className="pd-feature" key={highlight}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{highlight}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {product.creatorFit ? (
          <section className="pd-section">
            <p className="pd-section__kicker">{t('product.fitKicker')}</p>
            <h2>{t('product.fitTitle')}</h2>
            <div className="pd-fit-grid">
              <article className="pd-fit-card">
                <h3>{t('product.bestFor')}</h3>
                <div className="pd-chips">
                  {(product.creatorFit.bestFor || []).map((tag) => (
                    <span className="pd-chip" key={tag}>
                      {displayFitTag(t, tag)}
                    </span>
                  ))}
                </div>
              </article>
              <article className="pd-fit-card">
                <h3>{t('product.platforms')}</h3>
                <div className="pd-chips">
                  {(product.creatorFit.platforms || []).map((tag) => (
                    <span className="pd-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
              <article className="pd-fit-card">
                <h3>{t('product.contentAngles')}</h3>
                <ul>
                  {contentAngles.map((angle) => (
                    <li key={angle}>{angle}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        <section className="pd-section">
          <p className="pd-section__kicker">{t('product.collabKicker')}</p>
          <h2>{t('product.collabTypes')}</h2>
          <div className="pd-chips">
            {product.collaborationTypes.map((type) => (
              <span className="pd-chip" key={type}>
                {t(`collabType.${type}`)}
              </span>
            ))}
          </div>
        </section>

        <section className="pd-section">
          <p className="pd-section__kicker">{t('product.detailsKicker')}</p>
          <h2>{t('product.details')}</h2>
          <dl className="pd-specs">
            <div>
              <dt>{t('product.origin')}</dt>
              <dd>{originCopy(t, product)}</dd>
            </div>
            <div>
              <dt>{t('product.shipsTo')}</dt>
              <dd>{t('common.shipsToUS')}</dd>
            </div>
            <div>
              <dt>{t('product.sample')}</dt>
              <dd>
                <SampleStatus product={product} t={t} />
              </dd>
            </div>
            <div>
              <dt>{t('product.moq')}</dt>
              <dd>{t('common.units', { n: product.moq })}</dd>
            </div>
            <div>
              <dt>{t('product.retailPrice')}</dt>
              <dd>${product.retailPrice}</dd>
            </div>
          </dl>
        </section>

        {contentIdeas.length > 0 ? (
          <section className="pd-section">
            <p className="pd-section__kicker">{t('product.ideasKicker')}</p>
            <h2>{t('product.contentIdeas')}</h2>
            <div className="pd-ideas">
              {contentIdeas.map((idea, index) => (
                <article className="pd-idea" key={idea}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{idea}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="pd-section pd-related">
            <p className="pd-section__kicker">{t('product.relatedKicker')}</p>
            <h2>{t('product.related')}</h2>
            <div className="pd-related__grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
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
