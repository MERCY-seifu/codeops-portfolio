'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { useCart } from '../cart/useCart.js'
import { jsonFetcher } from '../../lib/json-fetcher.js'

const steps = [
  { title: 'Confirmed', detail: 'Your order was accepted' },
  { title: 'Preparing', detail: 'The kitchen is cooking' },
  { title: 'On the way', detail: 'Your courier picked up your order' },
  { title: 'Delivered', detail: 'Enjoy your meal!' },
]

const statusIndexes = { confirmed: 0, preparing: 1, 'on-the-way': 2, delivered: 3 }

export function TrackingScreen({ initialOrder, initialStatus }) {
  const { lastOrder } = useCart()
  const order = initialOrder || lastOrder
  const { data: status, error: pollError } = useSWR(
    order?.reference ? `/api/orders/${encodeURIComponent(order.reference)}/status` : null,
    jsonFetcher,
    {
      fallbackData: initialStatus || undefined,
      refreshInterval: (data) => data?.status === 'delivered' ? 0 : 5000,
      refreshWhenHidden: false,
    },
  )
  const currentStep = statusIndexes[status?.status] ?? 0

  return (
    <section className="tracking-layout">
      <div className="tracking-main">
        <div className="tracking-heading">
          <div><p className="eyebrow">{order ? `Order ${order.reference}` : 'No active orders'}</p><h1>Order tracking</h1><p>{order ? `${order.restaurant} · Bole, Addis Ababa` : 'Place a demo order to see delivery updates.'}</p></div>
          {order && <span className="live-pill"><span aria-hidden="true">●</span> {status?.label || 'Loading status'}</span>}
        </div>
        {pollError && <p className="error" role="alert">Could not refresh order status: {pollError.message}</p>}
        {order && <><div className="tracking-status">
          <div><p>Estimated arrival</p><h2>25–35 min</h2><span>Demo status refreshes every five seconds.</span></div>
          <span className="tracking-time">{status?.label || 'Updating…'}</span>
        </div>
        <div className="tracking-map" role="img" aria-label="Illustrated route from restaurant to your home">
          <span className="map-road map-road--one" />
          <span className="map-road map-road--two" />
          <span className="map-route" />
          <span className="map-pin map-pin--restaurant" aria-label="Restaurant">♨</span>
          <span className="map-pin map-pin--home" aria-label="Delivery address">⌂</span>
          <span className="courier-pin" aria-label="Courier">➤</span>
        </div></>}
        <ol className="tracking-steps">
          {steps.map((step, index) => (
            <li className={`tracking-step${index < currentStep ? ' is-complete' : ''}${index === currentStep ? ' is-current' : ''}`} key={step.title}>
              <span className="tracking-step__marker">{index < currentStep ? '✓' : index + 1}</span>
              <span><strong>{step.title}</strong><small>{step.detail}</small></span>
              {index === currentStep && <small className="step-time">Now</small>}
            </li>
          ))}
        </ol>
        <div className="courier-card">
          <span className="courier-avatar">DT</span>
          <span><strong>Demo courier</strong><small>Status data is simulated for this assignment.</small></span>
          <a className="contact-chip" href="tel:+251911234567" aria-label="Call courier">☎</a>
          <a className="contact-chip contact-chip--message" href="sms:+251911234567" aria-label="Message courier">▤</a>
        </div>
      </div>
      <aside className="tracking-aside">
        <p className="eyebrow">Your order</p>
        <h2>{order?.reference || 'No order yet'}</h2>
        <p>{order?.address || 'Your order details will appear here.'}</p>
        {order?.items.map((item) => <div className="summary-line" key={item.id}><span>{item.qty} × {item.name}</span><strong>{item.qty * item.price} ETB</strong></div>)}
        {order && <div className="summary-total"><span>Total</span><strong>{order.total} ETB</strong></div>}
        <p className="demo-note">Demo order status is simulated; no restaurant or courier is contacted.</p>
        <Link className="button button--outline button--full" href="/profile">View profile</Link>
      </aside>
    </section>
  )
}
