import { ConfirmationScreen } from '../cart/OrderScreens.jsx'
import { requireSession } from '../../lib/session-server.js'

export const metadata = {
  title: 'Order confirmation',
  description: 'Review your Addis Eats demo order confirmation.',
  robots: { index: false, follow: false },
}

export default async function ConfirmationPage() {
  await requireSession()
  return (
    <main className="page-shell">
      <ConfirmationScreen />
    </main>
  )
}
