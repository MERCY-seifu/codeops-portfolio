import { useCart } from '../cart/useCart.js'

export function DishCard({ dish }) {
  const { addItem } = useCart()

  return (
    <article className="dish-card">
      <div className="dish-card__top">
        <h3>{dish.name}</h3>
        <span className="dish-card__price">{dish.price} ETB</span>
      </div>
      <p className="dish-card__desc">{dish.description}</p>
      <div className="dish-card__bottom">
        <span className="dish-card__spice" aria-label={`Spice level ${dish.spice} of 3`}>
          {dish.spice === 0 ? 'Mild' : '🌶️'.repeat(dish.spice)}
        </span>
        <button type="button" className="btn btn--add" onClick={() => addItem(dish)}>
          Add to cart
        </button>
      </div>
    </article>
  )
}
