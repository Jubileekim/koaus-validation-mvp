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
  return (
    <div className="mp-filters" role="group" aria-label="Product categories">
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
            {category}
          </button>
        )
      })}
    </div>
  )
}
