export default function EmptyState({ onClear }) {
  return (
    <div className="mp-empty">
      <h2>No products found</h2>
      <p>Try another keyword or category.</p>
      <button className="button button--dark" type="button" onClick={onClear}>
        Clear filters
      </button>
    </div>
  )
}
