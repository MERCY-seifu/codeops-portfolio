import { FilterShell } from './FilterShell.jsx'
import { DishList } from './DishList.jsx'

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
        <form className="menu-search" action="/menu">
          <label className="sr-only" htmlFor="menu-search">Search dishes</label>
          <input id="menu-search" name="q" type="search" placeholder="Search dishes or cuisine" defaultValue={searchQuery} />
          {activeCategory !== 'All' && <input type="hidden" name="category" value={activeCategory} />}
          <button className="button button--primary" type="submit">Search</button>
        </form>
        <FilterShell categories={categories} activeCategory={activeCategory}>
          <DishList dishes={visibleDishes} />
        </FilterShell>
      </section>
    </main>
  )
}
