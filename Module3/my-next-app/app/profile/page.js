import { ProfileScreen } from './ProfileScreen.jsx'
import { requireSession } from '../../lib/session-server.js'
import { listOwnedOrders } from '../../lib/demo-orders.js'

export const metadata = {
  title: 'Your profile',
  description: 'Manage your Addis Eats demo account, saved addresses, and order history.',
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const session = await requireSession()
  const orders = listOwnedOrders(session.id).map(({ userId, ...order }) => order)
  return (
    <main className="page-shell">
      <ProfileScreen user={session} orders={orders} />
    </main>
  )
}
