import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useTranslation } from '../../contexts/LocaleContext.jsx'
import { getSafeReturnTo } from '../../utils/authRedirect.js'
import '../../styles/auth.css'

function HeaderAuthControls({ variant = 'desktop' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  if (isLoading || !isAuthenticated || !user) {
    return null
  }

  async function handleLogout() {
    if (loggingOut) {
      return
    }

    try {
      setLoggingOut(true)
      setLogoutError('')
      await logout()

      if (
        location.pathname === '/login' ||
        location.pathname === '/signup'
      ) {
        navigate('/', { replace: true })
      }
    } catch (error) {
      setLogoutError(
        error.message || 'Failed to log out. Please try again.',
      )
    } finally {
      setLoggingOut(false)
    }
  }

  const className = [
    'header-auth',
    variant === 'desktop' ? 'header-auth--desktop' : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <span className="header-auth__name">{user.displayName}</span>
      <button
        className="header-auth__logout"
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? 'Logging out…' : 'Log out'}
      </button>
      {logoutError ? (
        <p className="header-auth__error" role="alert">
          {logoutError}
        </p>
      ) : null}
    </div>
  )
}

function LoginCta({ className = '', state }) {
  return (
    <Link
      className={['button', 'button--login', className]
        .filter(Boolean)
        .join(' ')}
      to="/login"
      state={state}
    >
      Log in
      <span aria-hidden="true">→</span>
    </Link>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const returnFrom = getSafeReturnTo(
    `${location.pathname}${location.search}`,
  )
  const authLinkState =
    returnFrom !== '/' ? { from: returnFrom } : undefined

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="wordmark"
          to="/"
          aria-label={t('nav.homeAria')}
        >
          koaus
        </Link>

        <nav
          className="desktop-nav"
          aria-label={t('nav.primaryAria')}
        >
          <Link to="/editorial">
            {t('nav.editorial')}
          </Link>

          <Link to="/marketplace">
            {t('nav.marketplace')}
          </Link>

          <Link to="/creator-access">
            {t('nav.creators')}
          </Link>

          <Link to="/brands">
            {t('nav.brands')}
          </Link>
        </nav>

        <div className="header-actions">
          {!isLoading && isAuthenticated ? (
            <>
              <HeaderAuthControls variant="desktop" />

              <Link
                className="button button--dark"
                to="/editorial/write"
              >
                Write
              </Link>
            </>
          ) : null}

          {!isLoading && !isAuthenticated ? (
            <LoginCta
              className="header-actions__login"
              state={authLinkState}
            />
          ) : null}

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t('nav.openMenu')}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
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
        <Link to="/editorial">
          {t('nav.editorial')}
        </Link>

        <Link to="/marketplace">
          {t('nav.marketplace')}
        </Link>

        <Link to="/creator-access">
          {t('nav.creators')}
        </Link>

        <Link to="/brands">
          {t('nav.brands')}
        </Link>

        {!isLoading && isAuthenticated ? (
          <Link to="/editorial/write">Write</Link>
        ) : null}

        {!isLoading && !isAuthenticated ? (
          <LoginCta state={authLinkState} />
        ) : null}

        <HeaderAuthControls variant="mobile" />
      </nav>
    </header>
  )
}
