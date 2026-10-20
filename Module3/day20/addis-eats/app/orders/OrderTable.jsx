import Link from 'next/link'

const currency = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

const dateTime = new Intl.DateTimeFormat('en-ET', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
})

const columns = [
  { key: 'id', label: 'Order' },
  { key: 'date', label: 'Date' },
  { key: 'area', label: 'Neighbourhood' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
]

function sortHref(key, currentKey, direction) {
  const nextDirection = key === currentKey
    ? direction === 'asc' ? 'desc' : 'asc'
    : key === 'date' || key === 'total' ? 'desc' : 'asc'
  return `/orders?sort=${key}&dir=${nextDirection}`
}

export function OrderTable({ orders, sortKey, direction, page, pageCount, total }) {
  return (
    <section className="orders-table-section" aria-label="Order history">
      <div className="orders-table-wrap">
        <table className="orders-table">
          <caption>{total} orders, sorted by {sortKey} {direction === 'asc' ? 'ascending' : 'descending'}</caption>
          <thead>
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  scope="col"
                  aria-sort={sortKey === key
                    ? direction === 'asc' ? 'ascending' : 'descending'
                    : undefined}
                  className={key === 'total' ? 'numeric' : undefined}
                >
                  <Link href={sortHref(key, sortKey, direction)}>{label}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <th scope="row">{order.id}</th>
                <td><time dateTime={order.createdAt}>{dateTime.format(new Date(order.createdAt))}</time></td>
                <td>{order.area}</td>
                <td className="numeric">{currency.format(order.total)}</td>
                <td><span className="order-status">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="pagination" aria-label="Order pages">
        <span>Page {page} of {pageCount}</span>
        <div>
          {page > 1 && <Link href={`/orders?page=${page - 1}&sort=${sortKey}&dir=${direction}`}>Previous</Link>}
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={`/orders?page=${pageNumber}&sort=${sortKey}&dir=${direction}`}
              aria-current={pageNumber === page ? 'page' : undefined}
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </Link>
          ))}
          {page < pageCount && <Link href={`/orders?page=${page + 1}&sort=${sortKey}&dir=${direction}`}>Next</Link>}
        </div>
      </nav>
    </section>
  )
}
