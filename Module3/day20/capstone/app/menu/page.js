import { getDishes } from '../../lib/menu.js'
import { MenuContent } from './MenuContent.jsx'

export const metadata = {
  title: 'Menu',
}

export default async function MenuPage({ searchParams }) {
  const [dishes, params] = await Promise.all([getDishes(), searchParams])
  return <MenuContent dishes={dishes} requestedCategory={params?.category} searchQuery={params?.q} />
}
