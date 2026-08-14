import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function InquirySection() {
  const { t } = useTranslation()

  return (
    <section
      className="launch-contact"
      id="contact"
      data-rail-section
      aria-labelledby="launch-contact-title"
    >
      <div className="shell launch-contact__grid">
        <div className="launch-contact__intro" data-reveal>
          <p className="launch-contact__kicker">{t('inquiry.kicker')}</p>
          <h2 id="launch-contact-title">
            {t('inquiry.title1')}
            <br />
            {t('inquiry.title2')}
            <br />
            {t('inquiry.title3')}
          </h2>
          <p>{t('inquiry.body')}</p>
          <div className="launch-contact__promise">
            <span>01</span>
            <p>{t('inquiry.p1')}</p>
            <span>02</span>
            <p>{t('inquiry.p2')}</p>
            <span>03</span>
            <p>{t('inquiry.p3')}</p>
          </div>
        </div>

        <div className="launch-inquiry-form" data-reveal>
          <div className="launch-field launch-field--full">
            <p className="launch-contact__kicker">{t('inquiry.formKicker')}</p>
            <h3 className="landing-brand-cta__title">{t('inquiry.formTitle')}</h3>
            <p className="landing-brand-cta__body">{t('inquiry.formBody')}</p>
          </div>
          <Link className="launch-submit" to="/brands">
            {t('inquiry.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
