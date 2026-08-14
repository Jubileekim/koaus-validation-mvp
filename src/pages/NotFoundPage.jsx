import { Link } from 'react-router'
import LanguageToggle from '../components/layout/LanguageToggle.jsx'
import { useTranslation } from '../contexts/LocaleContext.jsx'
import '../styles/marketplace.css'
import '../styles/not-found.css'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="mp-page">
      <div className="mp-topbar">
        <div className="shell mp-topbar__inner">
          <Link className="wordmark" to="/" aria-label={t('nav.homeAria')}>
            koaus
          </Link>
          <div className="mp-topbar__actions">
            <LanguageToggle />
            <Link className="button button--ghost" to="/marketplace">
              {t('nav.browseMarketplace')}
            </Link>
          </div>
        </div>
      </div>
      <main className="shell nf-main">
        <div className="nf-card">
          <p className="nf-kicker">404</p>
          <h1>{t('notFound.title')}</h1>
          <p>{t('notFound.body')}</p>
          <div className="nf-actions">
            <Link className="button button--dark" to="/">
              {t('notFound.home')}
            </Link>
            <Link className="button button--ghost" to="/marketplace">
              {t('nav.browseMarketplace')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
