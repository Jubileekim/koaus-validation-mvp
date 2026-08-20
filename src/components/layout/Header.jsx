import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { hasCreatorAccess } from '../../services/creatorStorage.js'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import LanguageToggle from './LanguageToggle.jsx'

export default function Header() {
  const access = hasCreatorAccess()
  const { t } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const creatorLabel = access
    ? t('nav.creatorAccessActive')
    : t('nav.creatorAccess')

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" to="/" aria-label={t('nav.homeAria')}>
          koaus
        </Link>
        <nav className="desktop-nav" aria-label={t('nav.primaryAria')}>
          <Link to="/marketplace">{t('nav.marketplace')}</Link>
          <Link to="/creator-access">{t('nav.creators')}</Link>
          <Link to="/brands">{t('nav.brands')}</Link>
        </nav>
        <div className="header-actions">
          <LanguageToggle />
          <Link className="button button--dark" to="/creator-access">
            {creatorLabel}
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t('nav.openMenu')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </div>
      <nav
        className="mobile-menu"
        id="mobile-menu"
        aria-label={t('nav.mobileAria')}
        hidden={!menuOpen}
      >
        <Link to="/marketplace">{t('nav.marketplace')}</Link>
        <Link to="/creator-access">{t('nav.creators')}</Link>
        <Link to="/brands">{t('nav.brands')}</Link>
        <Link to="/creator-access">{creatorLabel}</Link>
      </nav>
    </header>
  )
}
