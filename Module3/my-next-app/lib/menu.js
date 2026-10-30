import 'server-only'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function getDishes() {
  const filePath = path.join(process.cwd(), 'data', 'menu.json')
  const file = await readFile(filePath, 'utf8')
  const dishes = JSON.parse(file)

  if (
    !Array.isArray(dishes) ||
    dishes.some(
      (dish) =>
        !Number.isInteger(dish.id) ||
        typeof dish.name !== 'string' ||
        typeof dish.category !== 'string' ||
        !Number.isFinite(dish.price) ||
        typeof dish.spicy !== 'boolean' ||
        typeof dish.description !== 'string' ||
        typeof dish.image !== 'string' ||
        !dish.image.startsWith('https://'),
    )
  ) {
    throw new Error('Menu data must be an array of valid dishes.')
  }

  return dishes
}
