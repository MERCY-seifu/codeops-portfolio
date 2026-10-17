import { useCart } from '../cart/useCart.js'

export function CheckoutPanel({ open, onClose }) {
  const { items, total, removeItem, clearCart } = useCart()

  if (!open) return null

  return (
    <aside className="checkout-panel" aria-label="Checkout">
      <div className="checkout-panel__head">
        <h2>Your order</h2>
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          Close
        </button>
      </div>

      {items.length === 0 ? (
        <p className="checkout-panel__empty">Nothing here yet — add a dish to start an order.</p>
      ) : (
        <>
          <ul className="checkout-panel__list">
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.qty} × {item.name}
                </span>
                <span className="checkout-panel__line-total">
                  {item.price * item.qty} ETB
                </span>
                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove one ${item.name}`}
                >
                  −
                </button>
              </li>
            ))}
          </ul>
          <div className="checkout-panel__total">
            <span>Total</span>
            <span>{total} ETB</span>
          </div>
          <button type="button" className="btn btn--primary" onClick={clearCart}>
            Clear order
          </button>
        </>
      )}
    </aside>
  )
}
