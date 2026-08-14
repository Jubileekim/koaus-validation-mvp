import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function LaunchEventSection() {
  const { t } = useTranslation()

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
          <span className="koaus-event-badge">{t('drop.badge')}</span>
          <p>{t('drop.lead')}</p>
          <h2 id="event-title">
            {t('drop.title1')}
            <br />
            <em>
              {t('drop.titleEm1')}
              <br />
              {t('drop.titleEm2')}
            </em>
          </h2>
          <p className="koaus-event-description">{t('drop.body')}</p>
          <Link className="button button--dark" to="/creator-access">
            {t('nav.creatorAccess')}
          </Link>
        </div>
        <article className="koaus-event-card">
          <div className="koaus-event-card__top">
            <div>
              <span>{t('drop.cardEyebrow')}</span>
              <h3>{t('drop.cardTitle')}</h3>
            </div>
            <span className="koaus-event-roundel">
              {t('drop.roundel1')}
              <br />
              {t('drop.roundel2')}
            </span>
          </div>
          <div className="koaus-event-price">
            <strong>{t('drop.price')}</strong>
            <small>{t('drop.priceSmall')}</small>
          </div>
          <div className="koaus-event-benefits">
            <ul>
              <li>{t('drop.b1')}</li>
              <li>{t('drop.b2')}</li>
              <li>{t('drop.b3')}</li>
              <li>{t('drop.b4')}</li>
            </ul>
            <ul>
              <li>{t('drop.b5')}</li>
              <li>{t('drop.b6')}</li>
              <li>{t('drop.b7')}</li>
              <li>{t('drop.b8')}</li>
            </ul>
          </div>
          <p>{t('drop.note')}</p>
        </article>
      </div>
    </section>
  )
}
