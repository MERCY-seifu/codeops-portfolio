import { Link, useLocation } from 'react-router-dom'

export function ConfirmationPage() {
  const { state } = useLocation()
  const order = state?.order

  return (
    <section className="confirmation-card">
      <div className="confirmation-mark" aria-hidden="true">✓</div>
      <p className="eyebrow">{order ? 'Order received' : 'Confirmation screen preview'}</p>
      <h1>{order ? 'Thank you for your order.' : 'Your table is waiting.'}</h1>
      {order ? (
        <>
          <p>
            Thanks, {order.customerName}. Your demo order is ready for the next step.
            No restaurant was contacted.
          </p>
          <div className="receipt">
            <div><span>Reference</span><strong>{order.reference}</strong></div>
            <div><span>Deliver to</span><strong>{order.address}</strong></div>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <span>{item.qty} × {item.name}</span>
                  <span>{item.qty * item.price} ETB</span>
                </li>
              ))}
            </ul>
            <div className="receipt__total"><span>Demo total</span><strong>{order.total} ETB</strong></div>
          </div>
        </>
      ) : (
        <p>Place an order from the cart to see a personalized demo receipt here.</p>
      )}
      <Link className="button button--primary" to="/">Back to the menu</Link>
    </section>
  )
}
