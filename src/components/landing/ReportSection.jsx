import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function ReportSection() {
  const { t } = useTranslation()

  return (
    <>
      <div className="pilot-report-bridge" aria-hidden="true">
        <span>{t('report.bridgeLeft')}</span>
        <i></i>
        <strong>{t('report.bridgeRight')}</strong>
      </div>

      <div className="pilot-report-grid">
        <div className="pilot-report-copy">
          <p className="section-kicker">{t('report.kicker')}</p>
          <h3>
            {t('report.title1')}
            <br />
            <em>{t('report.titleEm')}</em>
          </h3>
          <p>{t('report.body')}</p>
          <dl className="pilot-report-list">
            <div>
              <dt>{t('report.dtPrice')}</dt>
              <dd>{t('report.ddPrice')}</dd>
            </div>
            <div>
              <dt>{t('report.dtMoq')}</dt>
              <dd>{t('report.ddMoq')}</dd>
            </div>
            <div>
              <dt>{t('report.dtSample')}</dt>
              <dd>{t('report.ddSample')}</dd>
            </div>
            <div>
              <dt>{t('report.dtTypes')}</dt>
              <dd>{t('report.ddTypes')}</dd>
            </div>
          </dl>
          <Link className="button button--dark" to="/marketplace">
            {t('report.cta')}
          </Link>
        </div>

        <div
          className="koaus-dashboard pilot-report-dashboard"
          aria-label={t('report.dashAria')}
        >
          <div className="koaus-dashboard__top">
            <div>
              <span>{t('report.dashLabel')}</span>
              <strong>{t('report.dashTitle')}</strong>
            </div>
            <span className="koaus-dashboard__status">
              <i></i> {t('report.active')}
            </span>
          </div>

          <div className="koaus-dashboard__metrics">
            <article>
              <span>{t('report.dtPrice')}</span>
              <strong>$14.50</strong>
              <small>{t('common.example')}</small>
            </article>
            <article>
              <span>{t('report.dtMoq')}</span>
              <strong>20</strong>
              <small>{t('common.unitShort')}</small>
            </article>
            <article>
              <span>{t('report.sample')}</span>
              <strong>{t('common.yes')}</strong>
              <small>{t('report.sampleSmall')}</small>
            </article>
            <article>
              <span>{t('report.collab')}</span>
              <strong>UGC</strong>
              <small>{t('report.collabExample')}</small>
            </article>
          </div>

          <div className="koaus-dashboard__lower">
            <div className="koaus-dashboard__chart" aria-label={t('report.formats')}>
              <div className="koaus-dashboard__chart-head">
                <span>{t('report.formats')}</span>
                <strong>{t('report.availableTypes')}</strong>
              </div>
              <div className="koaus-dashboard__bars" aria-hidden="true">
                <div>
                  <i style={{ '--bar': '88%' }}></i>
                  <span>G</span>
                </div>
                <div>
                  <i style={{ '--bar': '74%' }}></i>
                  <span>A</span>
                </div>
                <div>
                  <i style={{ '--bar': '81%' }}></i>
                  <span>U</span>
                </div>
                <div>
                  <i style={{ '--bar': '46%' }}></i>
                  <span>S</span>
                </div>
              </div>
            </div>

            <div className="koaus-dashboard__insight">
              <span>{t('report.next')}</span>
              <strong>{t('report.insight')}</strong>
              <small>{t('report.nextSmall')}</small>
            </div>
          </div>

          <p>{t('report.disclaimer')}</p>
        </div>
      </div>
    </>
  )
}
