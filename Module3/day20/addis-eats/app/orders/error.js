'use client'

import Link from 'next/link'

export default function OrdersError({ reset }) {
  return (
    <main className="page-shell">
      <section className="empty-state" role="alert">
        <p className="eyebrow">Orders unavailable</p>
        <h1>We couldn&apos;t load the order history.</h1>
        <p>Please try again. Your dashboard and menu are still available.</p>
        <div className="error-actions">
          <button className="button button--primary" type="button" onClick={reset}>Try again</button>
          <Link className="button" href="/dashboard">Go to dashboard</Link>
        </div>
      </section>
    </main>
  )
}
