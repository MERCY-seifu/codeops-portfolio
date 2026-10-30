import { notFound } from 'next/navigation'
import { getDishes } from '../../../lib/menu.js'
import { getRestaurant } from '../../../lib/restaurants.js'
import { DishDetail } from './DishDetail.jsx'

export async function generateMetadata({ params }) {
  const { id } = await params
  const dishes = await getDishes()
  const dish = dishes.find((item) => item.id === Number(id))
  return {
    title: dish ? dish.name : 'Dish details',
    description: dish
      ? `${dish.description} View ingredients, options, and price on Addis Eats.`
      : 'Explore Ethiopian dishes on the Addis Eats menu.',
    openGraph: {
      title: dish?.name || 'Ethiopian dish details',
      description: dish?.description || 'Explore Ethiopian dishes on Addis Eats.',
      ...(dish?.image ? { images: [{ url: dish.image, alt: dish.name }] } : {}),
    },
  }
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
