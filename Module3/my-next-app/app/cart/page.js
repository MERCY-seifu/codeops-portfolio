import { CartScreen } from './OrderScreens.jsx'

export const metadata = {
  title: 'Your order',
  description: 'Review dishes in your Addis Eats cart before checkout.',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return (
    <main className="page-shell">
      <CartScreen />
    </main>
  )
}
