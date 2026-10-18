import { AddToCartButton } from '../components/CartControls.jsx'

export function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p className="empty-state">There are no dishes in this category yet.</p>
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <div className="dish-card__meta">
            <span>{dish.category}</span>
            <span>{dish.spicy ? '🌶️ Spicy' : 'Mild'}</span>
          </div>
          <h3>{dish.name}</h3>
          <p className="dish-card__description">{dish.description}</p>
          <div className="dish-card__bottom">
            <strong className="dish-card__price">{dish.price} ETB</strong>
            <AddToCartButton dish={dish} />
          </div>
        </article>
      ))}
    </div>
  )
}
