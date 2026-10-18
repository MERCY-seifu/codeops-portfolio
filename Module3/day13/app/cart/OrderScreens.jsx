'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from './useCart.js'

export function CartScreen() {
  const { items, total, removeItem, clearCart, placeOrder } = useCart()
  const router = useRouter()

  function submitOrder(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    placeOrder({
      reference: `AE-${Date.now().toString(36).toUpperCase()}`,
      name: form.get('name').trim(),
      address: form.get('address').trim(),
      items: items.map((item) => ({ ...item })),
      total,
    })
    router.push('/confirmation')
  }

  if (items.length === 0) {
    return (
      <section className="content-card">
        <p className="eyebrow">Your order</p>
        <h1>Your cart is ready for something delicious.</h1>
        <p>Add a dish from the menu to get started.</p>
        <Link className="button button--primary" href="/menu">Browse the menu</Link>
      </section>
    )
  }

  return (
    <section className="content-card">
      <p className="eyebrow">Almost there</p>
      <h1>Your order</h1>
      <h2>Order summary</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li className="cart-row" key={item.id}>
            <span>{item.qty} × {item.name}</span>
            <strong>{item.qty * item.price} ETB</strong>
            <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove one ${item.name}`}>Remove one</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: {total} ETB</strong></p>
      <button className="button" type="button" onClick={clearCart}>Clear order</button>
      <form className="checkout-form" onSubmit={submitOrder}>
        <h2>Delivery details</h2>
        <label>Full name<input name="name" autoComplete="name" required maxLength={80} /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9 ]{7,18}" title="Enter 7 to 18 digits, optionally preceded by +." /></label>
        <label>Delivery address<textarea name="address" autoComplete="street-address" required maxLength={240} rows={3} /></label>
        <button className="button button--primary" type="submit">Place demo order</button>
        <p>Demo only — no payment is taken and no details are sent to a server.</p>
      </form>
    </section>
  )
}

export function ConfirmationScreen() {
  const { lastOrder } = useCart()

  return (
    <section className="content-card">
      <p className="eyebrow">{lastOrder ? 'Order received' : 'Confirmation preview'}</p>
      <h1>{lastOrder ? `Thank you, ${lastOrder.name}.` : 'Your table is waiting.'}</h1>
      <p>
        {lastOrder
          ? 'Your demo order is ready for the next step. No restaurant was contacted.'
          : 'Add dishes and complete the demo checkout to see your order receipt.'}
      </p>
      {lastOrder && (
        <div className="receipt">
          <p>Reference: <strong>{lastOrder.reference}</strong></p>
          <p>Delivery address: <strong>{lastOrder.address}</strong></p>
          <ul>
            {lastOrder.items.map((item) => (
              <li key={item.id}>
                <span>{item.qty} × {item.name}</span>
                <span>{item.qty * item.price} ETB</span>
              </li>
            ))}
          </ul>
          <p className="receipt-total"><span>Demo total</span><span>{lastOrder.total} ETB</span></p>
        </div>
      )}
      <Link className="button button--primary" href="/menu">Back to menu</Link>
    </section>
  )
}
