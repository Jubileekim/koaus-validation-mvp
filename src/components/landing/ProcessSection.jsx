import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function ProcessSection() {
  const { t } = useTranslation()

  return (
    <>
      <header className="pilot-decision-heading">
        <p className="section-kicker">{t('process.kicker')}</p>
        <div className="pilot-decision-heading__copy">
          <h2 id="process-title">
            {t('process.title1')}
            <br />
            <em>{t('process.titleEm')}</em>
          </h2>
          <p>{t('process.body')}</p>
        </div>
      </header>

      <div className="process-timeline-shell">
        <div
          className="process-timeline"
          role="tablist"
          aria-label={t('process.aria')}
          style={{ '--process-active': '0' }}
        >
          <button
            className="process-node is-active"
            id="process-step-1"
            type="button"
            role="tab"
            aria-selected="true"
            aria-controls="process-detail-1"
            data-process-index="0"
          >
            <span className="process-node__number">01</span>
            <span className="process-node__copy">
              <strong>{t('process.n1')}</strong>
              <small>{t('process.n1s')}</small>
            </span>
          </button>
          <button
            className="process-node"
            id="process-step-2"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="process-detail-2"
            data-process-index="1"
            tabIndex="-1"
          >
            <span className="process-node__number">02</span>
            <span className="process-node__copy">
              <strong>{t('process.n2')}</strong>
              <small>{t('process.n2s')}</small>
            </span>
          </button>
          <button
            className="process-node"
            id="process-step-3"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="process-detail-3"
            data-process-index="2"
            tabIndex="-1"
          >
            <span className="process-node__number">03</span>
            <span className="process-node__copy">
              <strong>{t('process.n3')}</strong>
              <small>{t('process.n3s')}</small>
            </span>
          </button>
          <button
            className="process-node"
            id="process-step-4"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="process-detail-4"
            data-process-index="3"
            tabIndex="-1"
          >
            <span className="process-node__number">04</span>
            <span className="process-node__copy">
              <strong>{t('process.n4')}</strong>
              <small>{t('process.n4s')}</small>
            </span>
          </button>
        </div>
      </div>

      <div className="process-detail-panels">
        <article
          className="process-detail is-active"
          id="process-detail-1"
          role="tabpanel"
          aria-labelledby="process-step-1"
        >
          <span className="process-detail__number">01</span>
          <div className="process-detail__copy">
            <small>{t('process.current')}</small>
            <h3>{t('process.d1Title')}</h3>
            <p>{t('process.d1Body')}</p>
          </div>
          <div className="process-detail__output">
            <small>{t('process.output')}</small>
            <strong>{t('process.d1Out')}</strong>
          </div>
        </article>

        <article
          className="process-detail"
          id="process-detail-2"
          role="tabpanel"
          aria-labelledby="process-step-2"
          hidden
        >
          <span className="process-detail__number">02</span>
          <div className="process-detail__copy">
            <small>{t('process.current')}</small>
            <h3>{t('process.d2Title')}</h3>
            <p>{t('process.d2Body')}</p>
          </div>
          <div className="process-detail__output">
            <small>{t('process.output')}</small>
            <strong>{t('process.d2Out')}</strong>
          </div>
        </article>

        <article
          className="process-detail"
          id="process-detail-3"
          role="tabpanel"
          aria-labelledby="process-step-3"
          hidden
        >
          <span className="process-detail__number">03</span>
          <div className="process-detail__copy">
            <small>{t('process.current')}</small>
            <h3>{t('process.d3Title')}</h3>
            <p>{t('process.d3Body')}</p>
          </div>
          <div className="process-detail__output">
            <small>{t('process.output')}</small>
            <strong>{t('process.d3Out')}</strong>
          </div>
        </article>

        <article
          className="process-detail"
          id="process-detail-4"
          role="tabpanel"
          aria-labelledby="process-step-4"
          hidden
        >
          <span className="process-detail__number">04</span>
          <div className="process-detail__copy">
            <small>{t('process.current')}</small>
            <h3>{t('process.d4Title')}</h3>
            <p>{t('process.d4Body')}</p>
          </div>
          <div className="process-detail__output">
            <small>{t('process.output')}</small>
            <strong>{t('process.d4Out')}</strong>
          </div>
        </article>
      </div>
    </>
  )
}
