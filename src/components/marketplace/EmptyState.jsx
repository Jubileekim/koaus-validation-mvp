import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function EmptyState({ onClear }) {
  const { t } = useTranslation()

  return (
    <div className="mp-empty">
      <h2>{t('marketplace.emptyTitle')}</h2>
      <p>{t('marketplace.emptyBody')}</p>
      <button className="button button--dark" type="button" onClick={onClear}>
        {t('marketplace.clear')}
      </button>
    </div>
  )
}
