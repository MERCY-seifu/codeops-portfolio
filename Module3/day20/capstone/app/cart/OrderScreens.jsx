'use client'

import Link from 'next/link'
import { useCart } from './useCart.js'

export function CartScreen() {
  const { items, total, addItem, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart__icon" aria-hidden="true">♨</div>
        <p className="eyebrow">Your cart</p>
        <h1>Your cart is empty</h1>
        <p>Add dishes from nearby restaurants and they&apos;ll show up here, ready to order.</p>
        <div className="empty-cart__suggestions">
          <Link href="/dish/1?restaurant=yod-abyssinia"><strong>Doro Wat</strong><span>240 ETB</span></Link>
          <Link href="/dish/27?restaurant=tsome-bet"><strong>Yetsom Beyaynetu</strong><span>190 ETB</span></Link>
        </div>
        <Link className="button button--primary button--full" href="/">Explore restaurants</Link>
        <Link className="button button--outline button--full" href="/menu">See today&apos;s menu</Link>
      </section>
    )
  }

  return (
    <section className="cart-layout">
      <div className="cart-main">
        <Link className="back-link" href="/menu">← Continue browsing</Link>
        <p className="eyebrow">Almost there</p>
        <h1>Your cart</h1>
        <p className="cart-subtitle">{items.length} different {items.length === 1 ? 'item' : 'items'} ready for delivery</p>
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item__thumb" aria-hidden="true">♨</div>
              <div className="cart-item__detail">
                <h2>{item.name}</h2>
                <p>Made fresh · {item.restaurant || 'Yod Abyssinia'}</p>
                <strong>{item.price} ETB</strong>
              </div>
              <div className="quantity-control" aria-label={`${item.name} quantity`}>
                <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => removeItem(item.id)}>−</button>
                <span>{item.qty}</span>
                <button type="button" aria-label={`Add one ${item.name}`} onClick={() => addItem(item)}>+</button>
              </div>
            </article>
          ))}
          <Link className="add-more-link" href="/menu">＋ Add more items</Link>
        </div>
      </div>
      <aside className="cart-summary">
        <h2>Order summary</h2>
        <div className="summary-line"><span>Subtotal ({items.reduce((count, item) => count + item.qty, 0)} items)</span><strong>{total} ETB</strong></div>
        <div className="summary-line"><span>Delivery fee</span><strong>{total >= 300 ? 'Free' : '40 ETB'}</strong></div>
        <div className="summary-note">✦ <span>ADDIS20 discount applied at checkout</span></div>
        <div className="summary-total"><span>Total before discount</span><strong>{total + (total >= 300 ? 0 : 40)} ETB</strong></div>
        <Link className="button button--primary button--full" href="/checkout">Go to checkout <span aria-hidden="true">→</span></Link>
        <button className="clear-cart-button" type="button" onClick={clearCart}>Clear cart</button>
        <p className="demo-note">Demo checkout only · No payment is processed.</p>
      </aside>
    </section>
  )
}

export function ConfirmationScreen() {
  const { lastOrder } = useCart()

  return (
    <section className="confirmation-screen">
      <div className="confirmation-check" aria-hidden="true">✓</div>
      <p className="eyebrow">{lastOrder ? 'Order placed' : 'Confirmation preview'}</p>
      <h1>{lastOrder ? `Thank you, ${lastOrder.name}!` : 'Your table is waiting.'}</h1>
      <p className="confirmation-copy">
        {lastOrder
          ? 'Your order is confirmed. The kitchen is getting started on something delicious.'
          : 'Place a demo order to see your confirmation and follow its progress here.'}
      </p>
      {lastOrder && (
        <>
          <div className="arrival-card">
            <div><span>Estimated arrival</span><strong>7:45 PM</strong></div>
            <span className="delivery-chip">◷ {lastOrder.deliveryTime || '25–35 min'}</span>
          </div>
          <div className="receipt receipt--compact">
            <p>Order <strong>{lastOrder.reference}</strong> · {lastOrder.restaurant || 'Yod Abyssinia'}</p>
            {lastOrder.items.map((item) => <p className="summary-line" key={item.id}><span>{item.qty} × {item.name}</span><strong>{item.qty * item.price} ETB</strong></p>)}
            <p className="receipt-total"><span>Paid with {lastOrder.paymentMethod || 'Cash on delivery'}</span><strong>{lastOrder.total} ETB</strong></p>
          </div>
        </>
      )}
      <Link className="button button--primary button--full" href={lastOrder ? '/tracking' : '/menu'}>{lastOrder ? 'Track your order' : 'Browse the menu'}</Link>
      <Link className="button button--outline button--full" href="/">Back to home</Link>
      {lastOrder && <p className="demo-note">We&apos;ll notify you when the courier is nearby. Prototype only; no restaurant was contacted.</p>}
    </section>
  )
}
