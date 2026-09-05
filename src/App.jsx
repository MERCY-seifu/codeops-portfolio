import { useState } from 'react'
import { CartProvider } from './cart/CartProvider.jsx'
import { Header } from './components/Header.jsx'
import { CheckoutPanel } from './components/CheckoutPanel.jsx'
import { Menu } from './Menu.jsx'
import './App.css'

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <CartProvider>
      <div className="app">
        <Header
          checkoutOpen={checkoutOpen}
          onToggleCheckout={() => setCheckoutOpen((open) => !open)}
        />
        <main className="app__main">
          <Menu />
        </main>
        <CheckoutPanel open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </div>
    </CartProvider>
  )
}
