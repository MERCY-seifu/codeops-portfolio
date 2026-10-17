import { useCallback, useMemo, useReducer } from 'react'
import { CartContext } from './CartContext.js'
import { cartReducer, initialCartState } from './cartReducer.js'

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const addItem = useCallback((dish) => {
    dispatch({ type: 'ADD_ITEM', payload: dish })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const total = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [state.items],
  )
  const count = useMemo(
    () => state.items.reduce((sum, item) => sum + item.qty, 0),
    [state.items],
  )
  const value = useMemo(
    () => ({ items: state.items, total, count, addItem, removeItem, clearCart }),
    [state.items, total, count, addItem, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
