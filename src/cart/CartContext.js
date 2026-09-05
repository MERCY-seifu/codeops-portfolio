import { createContext } from 'react'

// Shape: { items, total, count, addItem(dish), removeItem(id), clearCart() }
export const CartContext = createContext(null)
