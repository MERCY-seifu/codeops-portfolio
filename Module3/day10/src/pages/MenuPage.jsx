import { useMemo, useState } from 'react'
import { useFetch } from '../hooks/useFetch.js'
import { CategoryFilter } from '../components/CategoryFilter.jsx'
import { DishCard } from '../components/DishCard.jsx'
import { MenuError, MenuLoading } from '../components/MenuStatus.jsx'

const ALL = 'All'

export function MenuPage() {
  const { data: dishes, loading, error } = useFetch('/menu.json')
  const [activeCategory, setActiveCategory] = useState(ALL)

  const categories = useMemo(() => {
    if (!dishes) return [ALL]
    return [ALL, ...new Set(dishes.map((dish) => dish.category))]
  }, [dishes])

  const visibleDishes = useMemo(() => {
    if (!dishes) return []
    const filtered =
      activeCategory === ALL
        ? dishes
        : dishes.filter((dish) => dish.category === activeCategory)
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }, [dishes, activeCategory])

  if (loading) return <MenuLoading />
  if (error) return <MenuError message={error} />

  return (
    <>
      <section className="hero">
        <p className="eyebrow">A taste of home, made in Addis</p>
        <h1>Good food brings us together.</h1>
        <p>Explore Ethiopian favorites from the home kitchens in your neighborhood.</p>
      </section>
      <section className="menu-section" aria-labelledby="menu-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Fresh from local kitchens</p>
            <h2 id="menu-title">Today&apos;s menu</h2>
          </div>
          <p className="menu-count">{visibleDishes.length} dishes</p>
        </div>
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <div className="menu-grid">
          {visibleDishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      </section>
    </>
  )
}
