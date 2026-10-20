import { useContext } from 'react'
import { CartContext } from './CartContext.js'

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) {
    throw new Error('useCart must be used inside the cart Providers.')
  }
  return cart
}
