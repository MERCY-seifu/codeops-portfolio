import Link from 'next/link'
import { AddToCartButton } from '../components/CartControls.jsx'

export function DishList({ dishes, restaurantSlug, restaurantName }) {
  if (dishes.length === 0) {
    return <p className="empty-state">There are no dishes in this category yet.</p>
  }

  const dishHref = (dish) => {
    const base = `/dish/${dish.id}`
    return restaurantSlug ? `${base}?restaurant=${encodeURIComponent(restaurantSlug)}` : base
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <Link
            className="dish-card__image"
            href={dishHref(dish)}
            aria-label={`View ${dish.name} details`}
            style={{
              backgroundImage: `url(${dish.image})`,
            }}
          />
          <div className="dish-card__body">
            <div className="dish-card__meta">
              <span>{dish.category}</span>
              <span>{dish.spicy ? 'Spicy' : 'Mild'}</span>
            </div>
            <h3><Link href={dishHref(dish)}>{dish.name}</Link></h3>
            <p className="dish-card__description">{dish.description}</p>
            <div className="dish-card__bottom">
              <strong className="dish-card__price">{dish.price} ETB</strong>
              <AddToCartButton dish={restaurantName ? { ...dish, restaurant: restaurantName } : dish} />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
