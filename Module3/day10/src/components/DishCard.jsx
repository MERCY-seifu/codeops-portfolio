import { useCart } from '../cart/useCart.js'

export function DishCard({ dish }) {
  const { addItem } = useCart()
  const spiceLabel = dish.spicy ? 'Spicy' : 'Mild'

  return (
    <article className="dish-card">
      <div className="dish-card__top">
        <span className="dish-card__category">{dish.category}</span>
        <span className="dish-card__spice" aria-label={spiceLabel}>
          {dish.spicy ? '🌶️ Spicy' : 'Mild'}
        </span>
      </div>
      <h2>{dish.name}</h2>
      <p className="dish-card__description">{dish.description}</p>
      <div className="dish-card__bottom">
        <strong>{dish.price} ETB</strong>
        <button className="button button--dark" type="button" onClick={() => addItem(dish)}>
          Add to order
        </button>
      </div>
    </article>
  )
}
