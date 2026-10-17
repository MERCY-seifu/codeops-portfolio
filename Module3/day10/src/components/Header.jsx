import { NavLink } from 'react-router-dom'
import { useCart } from '../cart/useCart.js'

export function Header() {
  const { count } = useCart()

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Addis Eats home">
        <span className="brand__mark" aria-hidden="true">አ</span>
        <span>
          <strong className="brand__name">Addis Eats</strong>
          <span className="brand__tagline">Home kitchens of Addis</span>
        </span>
      </NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end>Menu</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink className="nav-cart" to="/cart">
          Your order <span className="cart-count">{count}</span>
        </NavLink>
      </nav>
    </header>
  )
}
