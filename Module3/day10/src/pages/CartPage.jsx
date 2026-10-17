import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/useCart.js'

export function CartPage() {
  const { items, total, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  function handleCheckout(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const order = {
      reference: `AE-${Date.now().toString(36).toUpperCase()}`,
      customerName: formData.get('customerName').trim(),
      address: formData.get('address').trim(),
      items: items.map((item) => ({ ...item })),
      total,
    }
    clearCart()
    navigate('/confirmation', { state: { order } })
  }

  return (
    <section className="page-section">
      <p className="eyebrow">Almost there</p>
      <h1>Your order</h1>
      {items.length === 0 ? (
        <div className="message-card">
          <h2>Your cart is ready for something delicious.</h2>
          <p>Add a dish from the menu to start an order.</p>
          <Link className="button button--primary" to="/">Browse the menu</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <section className="order-card" aria-labelledby="items-title">
            <h2 id="items-title">Order summary</h2>
            <ul className="order-list">
              {items.map((item) => (
                <li className="order-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.qty} × {item.price} ETB</span>
                  </div>
                  <strong>{item.qty * item.price} ETB</strong>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove one ${item.name}`}
                  >
                    Remove one
                  </button>
                </li>
              ))}
            </ul>
            <div className="order-total"><span>Total</span><strong>{total} ETB</strong></div>
            <button className="text-button" type="button" onClick={clearCart}>
              Clear order
            </button>
          </section>

          <form className="order-card checkout-form" onSubmit={handleCheckout}>
            <h2>Delivery details</h2>
            <p>We&apos;ll use these details for this demo checkout only.</p>
            <label>
              Full name
              <input name="customerName" autoComplete="name" required maxLength={80} />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="[+]?[0-9 ]{7,18}"
                title="Enter 7 to 18 digits, optionally preceded by +."
              />
            </label>
            <label>
              Delivery address
              <textarea name="address" autoComplete="street-address" required maxLength={240} rows={3} />
            </label>
            <button className="button button--primary" type="submit">
              Place demo order · {total} ETB
            </button>
            <p className="form-note">No payment is taken and no details are sent to a server.</p>
          </form>
        </div>
      )}
      <p className="preview-link">
        <Link to="/confirmation">Preview the confirmation screen</Link>
      </p>
    </section>
  )
}
