import { Link } from 'react-router'
import { hasCreatorAccess } from '../../services/creatorStorage.js'

export default function Header() {
  const access = hasCreatorAccess()

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" to="/" aria-label="Koaus home">
          koaus
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link to="/marketplace">Marketplace</Link>
          <a href="#for-creators">For Creators</a>
          <Link to="/brands">For Brands</Link>
        </nav>
        <div className="header-actions">
          <div className="language-toggle" aria-label="Language switcher">
            <button type="button" data-language="ko" className="is-active">
              KO
            </button>
            <button type="button" data-language="en">
              EN
            </button>
          </div>
          <Link className="button button--dark" to="/creator-access">
            {access ? 'Creator Access ✓' : 'Get Creator Access'}
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
      <nav
        className="mobile-menu"
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden
      >
        <Link to="/marketplace">Marketplace</Link>
        <a href="#for-creators">For Creators</a>
        <Link to="/brands">For Brands</Link>
        <Link to="/creator-access">
          {access ? 'Creator Access ✓' : 'Get Creator Access'}
        </Link>
      </nav>
    </header>
  )
}
