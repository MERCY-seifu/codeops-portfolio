import { TrackingScreen } from './TrackingScreen.jsx'
import { requireSession } from '../../lib/session-server.js'
import { getOrderStatus, listOwnedOrders } from '../../lib/demo-orders.js'

export const metadata = {
  title: 'Order tracking',
  description: 'View status updates for your Addis Eats demo orders.',
  robots: { index: false, follow: false },
}

export default async function TrackingPage() {
  const session = await requireSession()
  const [initialOrder] = listOwnedOrders(session.id).map(({ userId, ...order }) => order)
  const initialStatus = initialOrder ? getOrderStatus(initialOrder) : null
  return (
    <main className="page-shell">
      <TrackingScreen initialOrder={initialOrder || null} initialStatus={initialStatus} />
    </main>
  )
}
