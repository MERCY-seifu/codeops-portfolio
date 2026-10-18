'use client'

import Link from 'next/link'
import { useCart } from '../cart/useCart.js'

export function CartIndicator() {
  const { count } = useCart()

  return (
    <Link href="/cart" aria-label={`Your order, ${count} items`}>
      Your order <span className="cart-count">{count}</span>
    </Link>
  )
}

export function AddToCartButton({ dish }) {
  const { addItem } = useCart()

  return (
    <button className="button" type="button" onClick={() => addItem(dish)}>
      Add to order
    </button>
  )
}
