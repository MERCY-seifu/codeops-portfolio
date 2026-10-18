import Link from 'next/link'
import { CartIndicator } from './CartControls.jsx'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/menu" aria-label="Addis Eats home">
        <span className="brand__mark" aria-hidden="true">አ</span>
        <span>
          <strong className="brand__name">Addis Eats</strong>
          <span className="brand__tagline">Home kitchens of Addis</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/menu">Menu</Link>
        <Link href="/about">About</Link>
        <CartIndicator />
      </nav>
    </header>
  )
}
