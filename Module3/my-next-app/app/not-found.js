import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="content-card">
        <p className="eyebrow">Page not found</p>
        <h1>We couldn&apos;t find that page.</h1>
        <p>Head back to the menu to find something delicious.</p>
        <Link className="button button--primary" href="/menu">Browse the menu</Link>
      </section>
    </main>
  )
}
