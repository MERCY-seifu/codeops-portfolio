'use client'

import Link from 'next/link'
import { useCart } from '../cart/useCart.js'

const steps = [
  { title: 'Confirmed', detail: 'Your order was accepted' },
  { title: 'Preparing', detail: 'The kitchen is cooking' },
  { title: 'On the way', detail: 'Your courier picked up your order' },
  { title: 'Delivered', detail: 'Enjoy your meal!' },
]

export function TrackingScreen() {
  const { lastOrder } = useCart()
  const currentStep = lastOrder ? 1 : 0

  return (
    <section className="tracking-layout">
      <div className="tracking-main">
        <div className="tracking-heading">
          <div><p className="eyebrow">Order {lastOrder?.reference || 'AE-24815'}</p><h1>Order tracking</h1><p>{lastOrder?.restaurant || 'Yod Abyssinia'} · Bole, Addis Ababa</p></div>
          <span className="live-pill"><span aria-hidden="true">●</span> PREPARING</span>
        </div>
        <div className="tracking-status">
          <div><p>Estimated arrival</p><h2>{lastOrder ? '7:45 PM' : 'Arriving in 18 min'}</h2><span>Estimated 7:45 PM · Bole, Addis Ababa</span></div>
          <span className="tracking-time">25–35 min</span>
        </div>
        <div className="tracking-map" role="img" aria-label="Illustrated route from restaurant to your home">
          <span className="map-road map-road--one" />
          <span className="map-road map-road--two" />
          <span className="map-route" />
          <span className="map-pin map-pin--restaurant" aria-label="Restaurant">♨</span>
          <span className="map-pin map-pin--home" aria-label="Delivery address">⌂</span>
          <span className="courier-pin" aria-label="Courier">➤</span>
        </div>
        <ol className="tracking-steps">
          {steps.map((step, index) => (
            <li className={`tracking-step${index < currentStep ? ' is-complete' : ''}${index === currentStep ? ' is-current' : ''}`} key={step.title}>
              <span className="tracking-step__marker">{index < currentStep ? '✓' : index + 1}</span>
              <span><strong>{step.title}</strong><small>{lastOrder && index === 0 ? 'Order received just now' : step.detail}</small></span>
              {index === currentStep && <small className="step-time">Now</small>}
            </li>
          ))}
        </ol>
        <div className="courier-card">
          <span className="courier-avatar">DT</span>
          <span><strong>Dawit Tadesse</strong><small>Your courier · ★ 4.9</small></span>
          <a className="contact-chip" href="tel:+251911234567" aria-label="Call courier">☎</a>
          <a className="contact-chip contact-chip--message" href="sms:+251911234567" aria-label="Message courier">▤</a>
        </div>
      </div>
      <aside className="tracking-aside">
        <p className="eyebrow">Your order</p>
        <h2>{lastOrder ? lastOrder.reference : 'On its way to you'}</h2>
        <p>{lastOrder?.address || 'Bole Road, Addis Ababa · 3rd floor'}</p>
        {lastOrder?.items.map((item) => <div className="summary-line" key={item.id}><span>{item.qty} × {item.name}</span><strong>{item.qty * item.price} ETB</strong></div>)}
        <div className="summary-total"><span>Total</span><strong>{lastOrder ? `${lastOrder.total} ETB` : '540 ETB'}</strong></div>
        <p className="demo-note">Live courier details are a visual prototype. This app does not contact a restaurant or courier.</p>
        <Link className="button button--outline button--full" href="/profile">View profile</Link>
      </aside>
    </section>
  )
}
