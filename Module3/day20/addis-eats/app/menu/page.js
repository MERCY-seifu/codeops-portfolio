import { getDishes } from '../../lib/menu.js'
import { FilterShell } from './FilterShell.jsx'
import { DishList } from './DishList.jsx'

export const metadata = {
  title: 'Menu',
}

export default async function MenuPage({ searchParams }) {
  const [dishes, params] = await Promise.all([getDishes(), searchParams])
  const categories = ['All', ...new Set(dishes.map((dish) => dish.category))]
  const requestedCategory = params?.category
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : 'All'
  const visibleDishes = dishes
    .filter((dish) => activeCategory === 'All' || dish.category === activeCategory)
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
          <DishList dishes={visibleDishes} />
        </FilterShell>
      </section>
    </main>
  )
}
