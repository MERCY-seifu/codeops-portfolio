'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '../cart/useCart.js'

const addresses = [
  { name: 'Home · Bole', detail: 'Bole Road, Addis Ababa · 3rd floor' },
  { name: 'Work · Kazanchis', detail: 'Kazanchis Business Center, 5th floor' },
]

const paymentMethods = [
  { name: 'Telebirr', detail: 'Pay with your Telebirr wallet', icon: '▣', badge: 'Popular' },
  { name: 'Cash on delivery', detail: 'Pay the courier when it arrives', icon: '◈' },
  { name: 'Debit or credit card', detail: 'Visa, Mastercard, Amex', icon: '▤' },
]

export function CheckoutScreen() {
  const { items, total, placeOrder } = useCart()
  const [addressIndex, setAddressIndex] = useState(0)
  const [addressEditor, setAddressEditor] = useState(false)
  const [customAddress, setCustomAddress] = useState('')
  const [payment, setPayment] = useState(paymentMethods[0].name)
  const [promo, setPromo] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const delivery = total >= 300 || total === 0 ? 0 : 40
  const discount = promo && total >= 150 ? Math.round(total * 0.2) : 0
  const orderTotal = Math.max(0, total + delivery - discount)

  function submitOrder(event) {
    event.preventDefault()
    if (items.length === 0) {
      setError('Your cart is empty. Add a dish before checking out.')
      return
    }
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    if (!name || !phone) {
      setError('Enter your name and phone number to place this order.')
      return
    }
    placeOrder({
      reference: `AE-${Date.now().toString(36).toUpperCase()}`,
      name,
      phone,
      address: addressIndex === 2 ? customAddress : addresses[addressIndex].detail,
      paymentMethod: payment,
      subtotal: total,
      deliveryFee: delivery,
      discount,
      items: items.map((item) => ({ ...item })),
      total: orderTotal,
      restaurant: items.every((item) => item.restaurant === items[0].restaurant)
        ? items[0].restaurant
        : 'Multiple restaurants',
      deliveryTime: '25–35 min',
    })
    router.push('/confirmation')
  }

  if (items.length === 0) {
    return (
      <section className="content-card">
        <p className="eyebrow">Checkout</p>
        <h1>Your cart is empty</h1>
        <p>Add something delicious before choosing delivery and payment.</p>
        <Link className="button button--primary" href="/menu">Browse the menu</Link>
      </section>
    )
  }

  return (
    <form className="checkout-layout" onSubmit={submitOrder}>
      <div className="checkout-main">
        <Link className="back-link" href="/cart">← Back to cart</Link>
        <p className="eyebrow">One last step</p>
        <h1>Checkout</h1>
        <p className="checkout-step">Step 2 of 3 · Address and payment</p>
        <section className="checkout-section">
          <div className="section-head section-head--compact"><h2>Delivery address</h2><button className="inline-action" type="button" aria-expanded={addressEditor} onClick={() => setAddressEditor((value) => !value)}>＋ Add new</button></div>
          {addresses.map((address, index) => (
            <button className={`selection-card${addressIndex === index ? ' is-selected' : ''}`} type="button" key={address.name} aria-pressed={addressIndex === index} onClick={() => setAddressIndex(index)}>
              <span className="selection-icon" aria-hidden="true">{index === 0 ? '⌂' : '▤'}</span>
              <span className="selection-copy"><strong>{address.name}</strong><small>{address.detail}</small></span>
              <span className="selection-check" aria-hidden="true">{addressIndex === index ? '✓' : ''}</span>
            </button>
          ))}
          {customAddress && (
            <button className={`selection-card${addressIndex === 2 ? ' is-selected' : ''}`} type="button" aria-pressed={addressIndex === 2} onClick={() => setAddressIndex(2)}>
              <span className="selection-icon" aria-hidden="true">⌖</span>
              <span className="selection-copy"><strong>New address</strong><small>{customAddress}</small></span>
              <span className="selection-check" aria-hidden="true">{addressIndex === 2 ? '✓' : ''}</span>
            </button>
          )}
          {addressEditor && (
            <div className="new-address-editor">
              <label className="checkout-label" htmlFor="new-address">Street, area, and building</label>
              <div className="new-address-row">
                <input id="new-address" value={customAddress} onChange={(event) => setCustomAddress(event.target.value)} maxLength={160} placeholder="e.g. Bole Road, Blue Tower" />
                <button className="button button--primary" type="button" disabled={!customAddress.trim()} onClick={() => { setAddressIndex(2); setAddressEditor(false) }}>Save</button>
              </div>
            </div>
          )}
          <label className="checkout-label">Full name<input name="name" autoComplete="name" required maxLength={80} placeholder="Your name" /></label>
          <label className="checkout-label">Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9 ]{7,18}" title="Enter 7 to 18 digits, optionally preceded by +." placeholder="+251 91 234 5678" /></label>
        </section>
        <section className="checkout-section">
          <div className="section-head section-head--compact"><h2>Payment method</h2><span className="secure-label">● Secure</span></div>
          {paymentMethods.map((method) => (
            <button className={`selection-card${payment === method.name ? ' is-selected' : ''}`} type="button" key={method.name} aria-pressed={payment === method.name} onClick={() => setPayment(method.name)}>
              <span className="selection-icon" aria-hidden="true">{method.icon}</span>
              <span className="selection-copy"><strong>{method.name} {method.badge && <small className="popular-badge">{method.badge}</small>}</strong><small>{method.detail}</small></span>
              <span className="selection-check" aria-hidden="true">{payment === method.name ? '✓' : ''}</span>
            </button>
          ))}
          <p className="demo-note">Payment choices are for this prototype only. No payment is processed.</p>
        </section>
      </div>
      <aside className="checkout-summary">
        <h2>Order summary</h2>
        {items.map((item) => <div className="summary-line" key={item.id}><span>{item.qty} × {item.name}</span><strong>{item.qty * item.price} ETB</strong></div>)}
        <div className="summary-divider" />
        <div className="summary-line"><span>Subtotal ({items.reduce((count, item) => count + item.qty, 0)} items)</span><strong>{total} ETB</strong></div>
        <div className="summary-line"><span>Delivery fee</span><strong>{delivery ? `${delivery} ETB` : 'Free'}</strong></div>
        <button className={`promo-card${promo ? ' is-applied' : ''}`} type="button" onClick={() => setPromo((value) => !value)}>
          <span><strong>◇ ADDIS20 {promo ? 'applied' : 'available'}</strong><small>{promo ? 'Tap to remove your discount' : 'Tap to apply 20% off'}</small></span>
          <strong>{discount ? `−${discount} ETB` : 'Apply'}</strong>
        </button>
        <div className="summary-total"><span>Total</span><strong>{orderTotal} ETB</strong></div>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="button button--primary button--full checkout-submit" type="submit">Confirm &amp; pay · {orderTotal} ETB</button>
        <p className="demo-note">You&apos;ll confirm your demo order. No charge is made.</p>
      </aside>
    </form>
  )
}
