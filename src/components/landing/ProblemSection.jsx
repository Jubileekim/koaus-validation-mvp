import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function ProblemSection() {
  const { t } = useTranslation()

  return (
    <div className="decision-head">
      <div className="decision-head__problem">
        <p className="section-kicker">{t('problem.kicker')}</p>
        <h2 id="decision-title">
          {t('problem.title1')}
          <br />
          {t('problem.title2')}
        </h2>
      </div>

      <div className="decision-head__arrow" aria-hidden="true">
        →
      </div>

      <div className="decision-head__solution">
        <p className="section-kicker">{t('problem.solutionKicker')}</p>
        <h2>
          {t('problem.solutionTitle1')}
          <br />
          <em>{t('problem.solutionTitleEm')}</em>.
        </h2>
        <p>{t('problem.solutionBody')}</p>
      </div>
    </div>
  )
}
