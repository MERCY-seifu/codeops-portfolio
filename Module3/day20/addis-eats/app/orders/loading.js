export default function OrdersLoading() {
  return (
    <main className="page-shell" aria-busy="true">
      <p className="eyebrow">Please wait</p>
      <h1>Loading orders</h1>
      <div className="orders-table-wrap orders-skeleton" role="status" aria-label="Loading five order rows">
        <table className="orders-table">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Date</th>
              <th scope="col">Neighbourhood</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, index) => (
              <tr key={index} aria-hidden="true">
                {Array.from({ length: 5 }, (_, cell) => (
                  <td key={cell}><span className="skeleton-block" /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
