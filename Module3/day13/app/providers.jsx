'use client'

import { CartProvider } from './cart/CartProvider.jsx'

export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>
}
