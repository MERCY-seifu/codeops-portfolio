export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="filter-row" role="tablist" aria-label="Filter menu by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={active === category}
          className={`filter-pill${active === category ? ' filter-pill--active' : ''}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
