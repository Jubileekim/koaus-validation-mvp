import { useTranslation } from '../../contexts/LocaleContext.jsx'

const CATEGORIES = [
  'All',
  'Beauty',
  'Fashion',
  'Wellness',
  'Food',
  'Lifestyle',
  'Stationery',
]

export default function ProductFilters({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="mp-filters" role="group" aria-label={t('marketplace.filterAria')}>
      {CATEGORIES.map((category) => {
        const active = value === category
        return (
          <button
            key={category}
            type="button"
            className={active ? 'mp-filter is-active' : 'mp-filter'}
            aria-pressed={active}
            onClick={() => onChange(category)}
          >
            {t(`category.${category}`)}
          </button>
        )
      })}
    </div>
  )
}
