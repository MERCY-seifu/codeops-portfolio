import 'server-only'

import { getDishes } from './menu.js'

const statusSteps = ['confirmed', 'preparing', 'on-the-way', 'delivered']
const statusNames = {
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  'on-the-way': 'On the way',
  delivered: 'Delivered',
}

const demoOrders = globalThis.demoAddisOrders || new Map()
globalThis.demoAddisOrders = demoOrders

export function getOwnedOrder(userId, reference) {
  const order = demoOrders.get(reference)
  return order?.userId === userId ? order : null
}

export function listOwnedOrders(userId) {
  return [...demoOrders.values()]
    .filter((order) => order.userId === userId)
    .sort((left, right) => right.createdAt - left.createdAt)
}

export function getOrderStatus(order) {
  const elapsedSeconds = Math.floor((Date.now() - order.createdAt) / 1000)
  const index = Math.min(Math.floor(elapsedSeconds / 20), statusSteps.length - 1)
  return {
    reference: order.reference,
    status: statusSteps[index],
    label: statusNames[statusSteps[index]],
    updatedAt: new Date().toISOString(),
  }
}

export async function createDemoOrder(input) {
  const { userId, name, phone, address, paymentMethod, promoApplied, items } = input
  if (!name || name.length > 80 || !/^\+?[0-9 ]{7,18}$/.test(phone)) {
    return { ok: false, error: 'Enter a valid name and phone number.' }
  }
  if (!address || address.length > 160) return { ok: false, error: 'Enter a valid delivery address.' }
  const allowedPayments = ['Telebirr', 'Cash on delivery', 'Debit or credit card']
  if (!allowedPayments.includes(paymentMethod)) return { ok: false, error: 'Choose a valid demo payment method.' }

  const dishes = await getDishes()
  const normalizedItems = []
  for (const item of items) {
    const dish = dishes.find((candidate) => candidate.id === Number(item?.productId ?? item?.id))
    const qty = Number(item?.qty)
    if (!dish || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return { ok: false, error: 'Your cart contains an invalid dish or quantity.' }
    }
    const size = item?.size
    const sizeExtra = size === 'Regular' ? 0 : size === 'Large' ? 70 : null
    const extras = item?.extras
    const extrasPrices = { 'Extra injera': 25, 'Ayib cheese': 40 }
    if (
      sizeExtra === null
      || !Array.isArray(extras)
      || extras.length > 2
      || extras.some((extra) => !Object.hasOwn(extrasPrices, extra))
      || !['Mild', 'Medium', 'Hot'].includes(item?.spice)
    ) return { ok: false, error: 'Your cart contains invalid dish options.' }
    const extraPrice = extras.reduce((sum, extra) => sum + extrasPrices[extra], 0)
    const price = dish.price + sizeExtra + extraPrice
    const selectedName = `${dish.name} · ${size}${extras.length ? ` · ${extras.join(', ')}` : ''}`
    normalizedItems.push({ id: dish.id, name: selectedName, price, qty })
  }

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryFee = subtotal >= 300 ? 0 : 40
  const discount = promoApplied && subtotal >= 150 ? Math.round(subtotal * 0.2) : 0
  const reference = `AE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  const order = {
    reference,
    userId,
    name,
    phone,
    address,
    paymentMethod,
    items: normalizedItems,
    subtotal,
    deliveryFee,
    discount,
    total: subtotal + deliveryFee - discount,
    restaurant: 'Yod Abyssinia',
    createdAt: Date.now(),
  }
  demoOrders.set(reference, order)
  return { ok: true, order }
}
