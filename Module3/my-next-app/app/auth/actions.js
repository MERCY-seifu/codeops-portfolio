'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authenticateDemoUser, getDemoUser } from '../../lib/demo-users.js'
import { createSessionToken, SESSION_COOKIE } from '../../lib/auth.js'
import { getSession } from '../../lib/session-server.js'
import { createDemoOrder, restartDemoTracking } from '../../lib/demo-orders.js'

export async function signIn(formData) {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const user = authenticateDemoUser(email, password)
  if (!user) redirect('/signin?error=credentials')
  restartDemoTracking(user.id)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, await createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  const requestedNext = String(formData.get('next') || '/profile')
  const next = requestedNext.startsWith('/')
    && !requestedNext.startsWith('//')
    && !requestedNext.includes('\\')
    ? requestedNext
    : '/profile'
  redirect(next)
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/')
}

export async function placeDemoOrder(formData) {
  const session = await getSession()
  if (!session || !getDemoUser(session.id)) {
    return { error: 'Please sign in before placing an order.' }
  }

  let items
  try {
    items = JSON.parse(String(formData.get('items') || ''))
  } catch {
    return { error: 'Your cart could not be read. Please review it and try again.' }
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
    return { error: 'Your cart is empty or invalid.' }
  }

  const result = await createDemoOrder({
    userId: session.id,
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    address: String(formData.get('address') || '').trim(),
    paymentMethod: String(formData.get('paymentMethod') || ''),
    promoApplied: formData.get('promoApplied') === 'true',
    items,
  })
  if (!result.ok) return { error: result.error }
  const { userId, ...order } = result.order
  return { order }
}
