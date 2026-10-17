import { useCart } from '../cart/useCart.js'

export function Header({ onToggleCheckout, checkoutOpen }) {
  const { count } = useCart()

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <span className="site-header__mark">አ</span>
        <div>
          <p className="site-header__name">Addis Eats</p>
          <p className="site-header__tag">Home kitchens of Addis, delivered</p>
        </div>
      </div>
      <button
        type="button"
        className="cart-badge"
        onClick={onToggleCheckout}
        aria-expanded={checkoutOpen}
      >
        Cart
        <span className="cart-badge__count">{count}</span>
      </button>
    </header>
  )
}
