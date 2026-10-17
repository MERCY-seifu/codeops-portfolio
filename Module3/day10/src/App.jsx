import { Link, Route, Routes } from 'react-router-dom'
import { CartProvider } from './cart/CartProvider.jsx'
import { Header } from './components/Header.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { ConfirmationPage } from './pages/ConfirmationPage.jsx'
import { MenuPage } from './pages/MenuPage.jsx'
import './App.css'

function NotFoundPage() {
  return (
    <section className="message-card">
      <p className="eyebrow">Page not found</p>
      <h1>We couldn&apos;t find that page.</h1>
      <p>Head back to the menu to find something delicious.</p>
      <Link className="button button--primary" to="/">
        Browse the menu
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>Made with care in Addis Ababa</span>
          <Link to="/about">About Addis Eats</Link>
        </footer>
      </div>
    </CartProvider>
  )
}
