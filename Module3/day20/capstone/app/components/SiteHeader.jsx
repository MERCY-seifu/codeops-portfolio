import Link from 'next/link'
import { CartIndicator } from './CartControls.jsx'

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Addis Eats home">
          <span className="brand__mark" aria-hidden="true">♨</span>
          <span>
            <strong className="brand__name">Addis Eats</strong>
            <span className="brand__tagline">Home kitchens of Addis</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/restaurants">Restaurants</Link>
          <Link href="/tracking">Orders</Link>
          <Link href="/profile">Profile</Link>
          <CartIndicator />
        </nav>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link href="/" aria-label="Home">
          <span className="mobile-nav__icon" aria-hidden="true">⌂</span>
          <span>Home</span>
        </Link>
        <Link href="/restaurants" aria-label="Search restaurants">
          <span className="mobile-nav__icon" aria-hidden="true">⌕</span>
          <span>Search</span>
        </Link>
        <Link href="/tracking" aria-label="Orders">
          <span className="mobile-nav__icon" aria-hidden="true">▤</span>
          <span>Orders</span>
        </Link>
        <CartIndicator mobile />
        <Link href="/profile" aria-label="Profile">
          <span className="mobile-nav__icon" aria-hidden="true">◎</span>
          <span>Profile</span>
        </Link>
      </nav>
    </>
  )
}
