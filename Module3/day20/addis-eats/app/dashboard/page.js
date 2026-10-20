import Link from 'next/link'
import { orders as allOrders } from '../../lib/orders.js'
import { RevenueChart } from './RevenueChart.jsx'

export const metadata = {
  title: 'Dashboard',
}

const currency = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams
  const demo = params?.demo

  if (demo === 'loading') {
    await new Promise((resolve) => setTimeout(resolve, 1200))
  }

  const selectedOrders = demo === 'empty' ? [] : allOrders
  const areaTotals = new Map()
  const dailyOrders = new Map()

  for (const order of selectedOrders) {
    areaTotals.set(order.area, (areaTotals.get(order.area) ?? 0) + order.total)
    const day = order.createdAt.slice(0, 10)
    dailyOrders.set(day, (dailyOrders.get(day) ?? 0) + 1)
  }

  const revenueByArea = [...areaTotals]
    .map(([area, revenue]) => ({ area, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
  const ordersByDay = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 5, index + 1)).toISOString().slice(0, 10)
    return { date, orders: dailyOrders.get(date) ?? 0 }
  })
  const revenue = selectedOrders.reduce((sum, order) => sum + order.total, 0)

  return (
    <main className="page-shell">
      <section className="dashboard-heading">
        <div>
          <p className="eyebrow">Addis Eats · June 2026</p>
          <h1>Kitchen performance</h1>
          <p>Revenue by neighbourhood and order activity across the last 14 days.</p>
        </div>
        <Link className="button button--primary" href="/orders">View orders</Link>
      </section>

      <section className="dashboard-metrics" aria-label="June summary">
        <article className="metric-card">
          <p>Total revenue</p>
          <strong>{currency.format(revenue)}</strong>
        </article>
        <article className="metric-card">
          <p>Orders</p>
          <strong>{selectedOrders.length}</strong>
        </article>
        <article className="metric-card">
          <p>Neighbourhoods</p>
          <strong>{revenueByArea.length}</strong>
        </article>
      </section>

      {selectedOrders.length === 0 ? (
        <section className="empty-state" aria-labelledby="dashboard-empty-title">
          <p className="eyebrow">Nothing to report</p>
          <h2 id="dashboard-empty-title">No orders in this date range yet.</h2>
          <p>Once customers place orders, the neighbourhood and daily summaries will appear here.</p>
          <Link className="button" href="/dashboard">Return to the live dashboard</Link>
        </section>
      ) : (
        <RevenueChart data={revenueByArea} ordersByDay={ordersByDay} />
      )}

      <section className="state-previews" aria-labelledby="state-previews-title">
        <div>
          <p className="eyebrow">For demonstration</p>
          <h2 id="state-previews-title">Preview each screen state</h2>
          <p>Open the empty, loading, and retryable error experiences.</p>
        </div>
        <div className="state-previews__links">
          <Link href="/orders?demo=empty">Empty</Link>
          <Link href="/orders?demo=loading">Loading</Link>
          <Link href="/orders?demo=error">Error</Link>
        </div>
      </section>
    </main>
  )
}
