import { Link } from 'react-router'
import { hasCreatorAccess } from '../../services/creatorStorage.js'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import LanguageToggle from './LanguageToggle.jsx'

export default function Header() {
  const access = hasCreatorAccess()
  const { t } = useTranslation()

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" to="/" aria-label={t('nav.homeAria')}>
          koaus
        </Link>
        <nav className="desktop-nav" aria-label={t('nav.primaryAria')}>
          <Link to="/marketplace">{t('nav.marketplace')}</Link>
          <a href="#for-creators">{t('nav.creators')}</a>
          <Link to="/brands">{t('nav.brands')}</Link>
        </nav>
        <div className="header-actions">
          <LanguageToggle />
          <Link className="button button--dark" to="/creator-access">
            {access ? t('nav.creatorAccessActive') : t('nav.creatorAccess')}
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label={t('nav.openMenu')}
          >
            ☰
          </button>
        </div>
      </div>
      <nav
        className="mobile-menu"
        id="mobile-menu"
        aria-label={t('nav.mobileAria')}
        hidden
      >
        <Link to="/marketplace">{t('nav.marketplace')}</Link>
        <a href="#for-creators">{t('nav.creators')}</a>
        <Link to="/brands">{t('nav.brands')}</Link>
        <Link to="/creator-access">
          {access ? t('nav.creatorAccessActive') : t('nav.creatorAccess')}
        </Link>
      </nav>
    </header>
  )
}
