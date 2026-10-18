'use client'

import Link from 'next/link'
import { useCart } from '../cart/useCart.js'

export function CartIndicator({ mobile = false }) {
  const { count } = useCart()

  if (mobile) {
    return (
      <Link className="mobile-nav__cart" href="/cart" aria-label={`Cart, ${count} items`}>
        <span className="mobile-nav__icon" aria-hidden="true">
          ▣<span className="cart-count">{count}</span>
        </span>
        <span>Cart</span>
      </Link>
    )
  }

  return (
    <Link href="/cart" aria-label={`Your order, ${count} items`}>
      Orders <span className="cart-count">{count}</span>
    </Link>
  )
}

export function AddToCartButton({ dish, quantity = 1, onAdded, children = 'Add to order' }) {
  const { addItem } = useCart()

  function handleAdd() {
    addItem(dish, quantity)
    onAdded?.()
  }

  return (
    <button className="button" type="button" onClick={handleAdd}>
      {children}
    </button>
  )
}
