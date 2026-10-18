import { notFound } from 'next/navigation'
import { getDishes } from '../../../lib/menu.js'
import { getRestaurant } from '../../../lib/restaurants.js'
import { DishDetail } from './DishDetail.jsx'

export async function generateMetadata({ params }) {
  const { id } = await params
  const dishes = await getDishes()
  const dish = dishes.find((item) => item.id === Number(id))
  return { title: dish ? dish.name : 'Dish details' }
}

export default async function DishPage({ params, searchParams }) {
  const [{ id }, query, dishes] = await Promise.all([params, searchParams, getDishes()])
  const dish = dishes.find((item) => item.id === Number(id))
  if (!dish) notFound()
  const restaurant = typeof query?.restaurant === 'string' ? getRestaurant(query.restaurant) : undefined

  return (
    <main className="page-shell dish-detail-shell">
      <DishDetail dish={dish} restaurant={restaurant} />
    </main>
  )
}
