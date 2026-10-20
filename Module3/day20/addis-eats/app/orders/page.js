import Link from 'next/link'
import { OrderTable } from './OrderTable.jsx'
import { orders as allOrders } from '../../lib/orders.js'

export const metadata = {
  title: 'Orders',
}

const pageSize = 8
const sortKeys = ['id', 'date', 'area', 'total', 'status']

function firstParam(value) {
  return Array.isArray(value) ? value[0] : value
}

function sortValue(order, key) {
  return key === 'date' ? order.createdAt : order[key]
}

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams
  const demo = firstParam(params?.demo)

  if (demo === 'loading') {
    await new Promise((resolve) => setTimeout(resolve, 1200))
  }
  if (demo === 'error') {
    throw new Error('The order service is unavailable.')
  }

  const sortKeyParam = firstParam(params?.sort)
  const sortKey = sortKeys.includes(sortKeyParam) ? sortKeyParam : 'date'
  const requestedDirection = firstParam(params?.dir)
  const direction = requestedDirection === 'asc' ? 'asc' : 'desc'
  const requestedPage = Number(firstParam(params?.page) ?? 1)
  const filteredOrders = demo === 'empty' ? [] : [...allOrders]

  filteredOrders.sort((a, b) => {
    const left = sortValue(a, sortKey)
    const right = sortValue(b, sortKey)
    const comparison = typeof left === 'number'
      ? left - right
      : String(left).localeCompare(String(right))
    return direction === 'asc' ? comparison : -comparison
  })

  const pageCount = Math.ceil(filteredOrders.length / pageSize)
  const page = pageCount === 0
    ? 1
    : Math.min(Math.max(Number.isInteger(requestedPage) ? requestedPage : 1, 1), pageCount)
  const visibleOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main className="page-shell">
      <section className="orders-heading">
        <div>
          <p className="eyebrow">June 2026 · Addis Ababa</p>
          <h1>Orders</h1>
          <p>Sort a column or use the page links; both are saved in the URL.</p>
        </div>
        <Link className="button" href="/dashboard">Back to dashboard</Link>
      </section>

      {visibleOrders.length === 0 ? (
        <section className="empty-state" aria-labelledby="orders-empty-title">
          <p className="eyebrow">A fresh start</p>
          <h2 id="orders-empty-title">No orders yet</h2>
          <p>Browse the menu and place your first order to see it here.</p>
          <Link className="button button--primary" href="/menu">Browse the menu</Link>
        </section>
      ) : (
        <OrderTable
          orders={visibleOrders}
          sortKey={sortKey}
          direction={direction}
          page={page}
          pageCount={pageCount}
          total={filteredOrders.length}
        />
      )}

      <nav className="state-previews state-previews--compact" aria-label="Order state previews">
        <span>Preview states:</span>
        <Link href="/orders?demo=empty">Empty</Link>
        <Link href="/orders?demo=loading">Loading</Link>
        <Link href="/orders?demo=error">Error</Link>
      </nav>
    </main>
  )
}
