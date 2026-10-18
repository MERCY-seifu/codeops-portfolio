import { useRouter } from 'next/navigation'

export function CategoryBar({ categories, activeCategory }) {
  const router = useRouter()

  function chooseCategory(category) {
    const query = category === 'All' ? '' : `?category=${encodeURIComponent(category)}`
    router.push(`/menu${query}`, { scroll: false })
  }

  return (
    <div className="filter-row" role="group" aria-label="Filter menu by category">
      {categories.map((category) => (
        <button
          className="filter-pill"
          type="button"
          key={category}
          aria-pressed={activeCategory === category}
          onClick={() => chooseCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
