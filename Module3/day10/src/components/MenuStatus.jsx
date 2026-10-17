export function MenuLoading() {
  return (
    <div className="menu-status" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>Setting the table…</p>
    </div>
  )
}

export function MenuError({ message }) {
  return (
    <div className="message-card message-card--error" role="alert">
      <h2>The menu could not be loaded.</h2>
      <p>{message}</p>
      <p>Please check the connection and refresh the page.</p>
    </div>
  )
}
