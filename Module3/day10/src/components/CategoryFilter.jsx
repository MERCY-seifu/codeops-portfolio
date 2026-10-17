export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="filter-row" role="group" aria-label="Filter menu by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter-pill${active === category ? ' filter-pill--active' : ''}`}
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
