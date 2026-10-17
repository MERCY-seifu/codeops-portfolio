export const initialCartState = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const dish = action.payload
      const existing = state.items.find((item) => item.id === dish.id)

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          { id: dish.id, name: dish.name, price: dish.price, qty: 1 },
        ],
      }
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload)
      if (!existing) return state
      if (existing.qty === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty - 1 } : item,
        ),
      }
    }
    case 'CLEAR_CART':
      return initialCartState
    default:
      return state
  }
}
