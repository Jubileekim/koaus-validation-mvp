import { Link } from 'react-router'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <strong>koaus</strong> —<span> {t('footer.statement')}</span>
        </div>
        <div className="footer-links">
          <Link to="/marketplace">{t('nav.marketplace')}</Link>
          <Link to="/creator-access">{t('nav.creatorAccessNav')}</Link>
          <Link to="/brands">{t('nav.brands')}</Link>
          <a
            href="https://www.instagram.com/koaus.shop"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
