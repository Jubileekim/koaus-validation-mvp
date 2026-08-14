export default function ProductSearch({ value, onChange }) {
  return (
    <label className="mp-search">
      <span className="mp-search__label">Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products or brands..."
        autoComplete="off"
      />
    </label>
  )
}
