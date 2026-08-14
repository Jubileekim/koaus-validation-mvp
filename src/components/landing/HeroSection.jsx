import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="hero hero--ugc" id="intro" data-rail-section aria-labelledby="hero-title">
      <div className="ugc-mosaic" aria-hidden="true">
        <div
          className="ugc-column ugc-column--1"
          style={{ '--ugc-duration': '28s', '--ugc-direction': 'normal' }}
        >
          <div className="ugc-track">
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-01.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-02.mp4" />
                </video>
              </article>
            </div>
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-01.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-02.mp4" />
                </video>
              </article>
            </div>
          </div>
        </div>
        <div
          className="ugc-column ugc-column--2"
          style={{ '--ugc-duration': '34s', '--ugc-direction': 'reverse' }}
        >
          <div className="ugc-track">
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-03.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-04.mp4" />
                </video>
              </article>
            </div>
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-03.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-04.mp4" />
                </video>
              </article>
            </div>
          </div>
        </div>
        <div
          className="ugc-column ugc-column--3"
          style={{ '--ugc-duration': '31s', '--ugc-direction': 'normal' }}
        >
          <div className="ugc-track">
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-05.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-06.mp4" />
                </video>
              </article>
            </div>
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-05.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-06.mp4" />
                </video>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-ugc-shade" aria-hidden="true"></div>

      <div className="shell hero-ugc-inner">
        <div className="hero-ugc-copy" data-reveal>
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 id="hero-title">
            <span className="hero-title-line">{t('hero.titleLine1')}</span>
            <span className="hero-title-line">
              {t('hero.titleBeforeEm')}
              <em>{t('hero.titleEm')}</em>
              {t('hero.titleAfterEm')}
            </span>
          </h1>
          <div className="hero-ugc-body hero-validation">
            <p className="hero-validation__lead">{t('hero.lead')}</p>
            <div className="hero-validation__rows">
              <div>
                <strong>{t('hero.row1Label')}</strong>
                <span>{t('hero.row1Text')}</span>
              </div>
              <div>
                <strong>{t('hero.row2Label')}</strong>
                <span>{t('hero.row2Text')}</span>
              </div>
              <div>
                <strong>{t('hero.row3Label')}</strong>
                <span>{t('hero.row3Text')}</span>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <Link className="button button--lime" to="/marketplace">
              {t('hero.browse')}
            </Link>
            <Link className="button button--glass" to="/creator-access">
              {t('nav.creatorAccess')}
            </Link>
          </div>
        </div>

        <div className="hero-ugc-proof" data-reveal>
          <div>
            <strong>{t('hero.proof1Title')}</strong>
            <span>{t('hero.proof1Text')}</span>
          </div>
          <div>
            <strong>{t('hero.proof2Title')}</strong>
            <span>{t('hero.proof2Text')}</span>
          </div>
          <div>
            <strong>{t('hero.proof3Title')}</strong>
            <span>{t('hero.proof3Text')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
