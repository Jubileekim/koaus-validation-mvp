import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function PricingSection() {
  const { t } = useTranslation()

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
            <p className="section-kicker">{t('pathways.kicker')}</p>
            <h2 id="pricing-title">{t('pathways.title')}</h2>
          </div>
          <p>{t('pathways.body')}</p>
        </div>

        <div className="koaus-pricing__cards koaus-pricing__cards--pathways">
          <article className="koaus-plan-card koaus-plan-card--featured">
            <div className="koaus-popular-badge">{t('pathways.creatorBadge')}</div>
            <div className="koaus-plan-card__head">
              <span>{t('pathways.creatorEyebrow')}</span>
              <h3>{t('pathways.creatorTitle')}</h3>
              <p>{t('pathways.creatorDesc')}</p>
            </div>
            <p className="koaus-per-person">{t('pathways.creatorPath')}</p>
            <ul>
              <li>{t('pathways.creator1')}</li>
              <li>{t('pathways.creator2')}</li>
              <li>{t('pathways.creator3')}</li>
              <li>{t('pathways.creator4')}</li>
            </ul>
            <Link className="button button--dark" to="/creator-access">
              {t('nav.creatorAccess')}
            </Link>
          </article>

          <article className="koaus-plan-card">
            <div className="koaus-plan-card__head">
              <span>{t('pathways.brandEyebrow')}</span>
              <h3>{t('pathways.brandTitle')}</h3>
              <p>{t('pathways.brandDesc')}</p>
            </div>
            <p className="koaus-per-person">{t('pathways.brandPath')}</p>
            <ul>
              <li>{t('pathways.brand1')}</li>
              <li>{t('pathways.brand2')}</li>
              <li>{t('pathways.brand3')}</li>
              <li>{t('pathways.brand4')}</li>
            </ul>
            <Link className="button button--ghost" to="/brands">
              {t('pathways.listProduct')}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
