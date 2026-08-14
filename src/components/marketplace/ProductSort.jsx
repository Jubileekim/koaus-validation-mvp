export default function ProductSort({ value, onChange }) {
  return (
    <label className="mp-sort">
      <span>Sort</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="margin">Creator Margin</option>
      </select>
    </label>
  )
}
