export function MenuLoading() {
  return (
    <div className="menu-status" role="status">
      <div className="menu-status__spinner" aria-hidden="true" />
      <p>Setting the table…</p>
    </div>
  )
}

export function MenuError({ message }) {
  return (
    <div className="menu-status menu-status--error" role="alert">
      <p>The menu didn't load: {message}</p>
      <p>Check your connection and refresh the page.</p>
    </div>
  )
}
