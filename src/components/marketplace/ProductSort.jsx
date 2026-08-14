import { useTranslation } from '../../contexts/LocaleContext.jsx'

export default function ProductSort({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <label className="mp-sort">
      <span>{t('marketplace.sort')}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="newest">{t('marketplace.newest')}</option>
        <option value="price-asc">{t('marketplace.priceAsc')}</option>
        <option value="price-desc">{t('marketplace.priceDesc')}</option>
        <option value="margin">{t('marketplace.margin')}</option>
      </select>
    </label>
  )
}
