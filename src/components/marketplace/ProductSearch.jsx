import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function ProductSearch({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <label className="mp-search">
      <span className="mp-search__label">{t('marketplace.search')}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t('marketplace.searchPlaceholder')}
        autoComplete="off"
      />
    </label>
  )
}
