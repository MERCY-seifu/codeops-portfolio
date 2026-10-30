import { CheckoutScreen } from './CheckoutScreen.jsx'
import { requireSession } from '../../lib/session-server.js'

export const metadata = {
  title: 'Checkout',
  description: 'Review your Addis Eats demo order and delivery details.',
  robots: { index: false, follow: false },
}

export default async function CheckoutPage() {
  await requireSession()
  return (
    <main className="page-shell">
      <CheckoutScreen />
    </main>
  )
}
