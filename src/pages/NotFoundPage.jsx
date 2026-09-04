import { Link } from 'react-router'
import { useTranslation } from '../contexts/LocaleContext.jsx'

import '../styles/not-found.css'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="shell nf-main">
      <div className="nf-card">
        <p className="nf-kicker">
          404
        </p>

        <h1>
          {t('notFound.title')}
        </h1>

        <p>
          {t('notFound.body')}
        </p>

        <div className="nf-actions">
          <Link
            className="button button--dark"
            to="/"
          >
            {t('notFound.home')}
          </Link>

          <Link
            className="button button--ghost"
            to="/marketplace"
          >
            {t('nav.browseMarketplace')}
          </Link>
        </div>
      </div>
    </main>
  )
}