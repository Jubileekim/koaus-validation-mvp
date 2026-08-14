import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function MarketplaceHeader() {
  const { t } = useTranslation()

  return (
    <header className="mp-hero">
      <p className="eyebrow">{t('marketplace.eyebrow')}</p>
      <h1>{t('marketplace.title')}</h1>
      <p className="mp-hero__body">{t('marketplace.body')}</p>
    </header>
  )
}
