import { FilterShell } from './FilterShell.jsx'
import { DishList } from './DishList.jsx'
import { LiveMenuSearch } from './LiveMenuSearch.jsx'

export function MenuContent({ dishes, requestedCategory, searchQuery = '' }) {
  const categories = ['All', ...new Set(dishes.map((dish) => dish.category))]
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : 'All'
  const normalizedQuery = typeof searchQuery === 'string' ? searchQuery.trim().toLowerCase() : ''
  const visibleDishes = dishes
    .filter((dish) => activeCategory === 'All' || dish.category === activeCategory)
    .filter((dish) => !normalizedQuery || `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">A taste of home, made in Addis</p>
        <h1>Good food brings us together.</h1>
        <p>Explore Ethiopian favorites from the home kitchens in your neighborhood.</p>
      </section>
      <section>
        <div className="section-head">
          <div>
            <p className="eyebrow">Fresh from local kitchens</p>
            <h2>Today&apos;s menu</h2>
          </div>
          <p className="menu-count">{visibleDishes.length} dishes</p>
        </div>
        <FilterShell categories={categories} activeCategory={activeCategory}>
          <LiveMenuSearch
            initialQuery={normalizedQuery}
            initialDishes={visibleDishes}
            category={activeCategory}
          />
        </FilterShell>
      </section>
    </main>
  )
}
