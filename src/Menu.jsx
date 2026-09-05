import { useMemo, useState } from 'react'
import { useFetch } from './hooks/useFetch.js'
import { CategoryFilter } from './components/CategoryFilter.jsx'
import { DishCard } from './components/DishCard.jsx'
import { MenuLoading, MenuError } from './components/MenuStatus.jsx'

const ALL = 'All'

export function Menu() {
  const { data: dishes, loading, error } = useFetch('/menu.json')
  const [activeCategory, setActiveCategory] = useState(ALL)

  const categories = useMemo(() => {
    if (!dishes) return [ALL]
    const unique = Array.from(new Set(dishes.map((dish) => dish.category)))
    return [ALL, ...unique]
  }, [dishes])

  // Filtering (and a stable sort by name) only recomputes when the
  // fetched list or the chosen category actually changes.
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
    <section className="menu">
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <div className="menu__grid">
        {visibleDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  )
}
