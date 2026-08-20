import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function SolutionSection() {
  const { t } = useTranslation()

  return (
    <div className="decision-lanes" aria-label={t('solution.aria')}>
      <article className="decision-lane decision-lane--creator">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>01</span>
            <small>{t('solution.p1Meta')}</small>
          </div>
          <h3>{t('solution.p1Title')}</h3>
        </div>
        <div className="decision-connector" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="decision-solution">
          <h3>{t('solution.s1Title')}</h3>
          <ul>
            <li>{t('solution.s1a')}</li>
            <li>{t('solution.s1b')}</li>
            <li>{t('solution.s1c')}</li>
            <li>{t('solution.s1d')}</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--ugc">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>02</span>
            <small>{t('solution.p2Meta')}</small>
          </div>
          <h3>{t('solution.p2Title')}</h3>
        </div>
        <div className="decision-connector" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="decision-solution">
          <h3>{t('solution.s2Title')}</h3>
          <ul>
            <li>{t('solution.s2a')}</li>
            <li>{t('solution.s2b')}</li>
            <li>{t('solution.s2c')}</li>
            <li>{t('solution.s2d')}</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--commerce">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>03</span>
            <small>{t('solution.p3Meta')}</small>
          </div>
          <h3>{t('solution.p3Title')}</h3>
        </div>
        <div className="decision-connector" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="decision-solution">
          <h3>{t('solution.s3Title')}</h3>
          <ul>
            <li>{t('solution.s3a')}</li>
            <li>{t('solution.s3b')}</li>
            <li>{t('solution.s3c')}</li>
            <li>{t('solution.s3d')}</li>
          </ul>
        </div>
      </article>
    </div>
  )
}
