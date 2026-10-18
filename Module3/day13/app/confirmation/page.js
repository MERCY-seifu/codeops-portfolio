import { ConfirmationScreen } from '../cart/OrderScreens.jsx'

export const metadata = {
  title: 'Order confirmation',
}

export default function ConfirmationPage() {
  return (
    <main className="page-shell">
      <ConfirmationScreen />
    </main>
  )
}
