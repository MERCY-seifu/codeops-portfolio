'use server'

import { redirect } from 'next/navigation'
import { getSupabaseConfig } from '../../lib/supabase/config.js'
import { createClient } from '../../lib/supabase/server.js'
import { getSession } from '../../lib/session-server.js'
import { createDemoOrder } from '../../lib/demo-orders.js'

function getSafeNextPath(value) {
  if (
    typeof value !== 'string'
    || !value.startsWith('/')
    || value.startsWith('//')
    || value.includes('\\')
  ) return '/profile'

  const destination = new URL(value, 'https://addis-eats.invalid')
  return destination.origin === 'https://addis-eats.invalid'
    ? `${destination.pathname}${destination.search}${destination.hash}`
    : '/profile'
}

export async function signIn(formData) {
  if (!getSupabaseConfig()) redirect('/signin?error=configuration')
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  if (!email || email.length > 254 || !password || password.length > 128) {
    redirect('/signin?error=credentials')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/signin?error=credentials')
  redirect(getSafeNextPath(String(formData.get('next') || '/profile')))
}

export async function signUp(formData) {
  if (!getSupabaseConfig()) redirect('/signup?error=configuration')

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  if (
    !name
    || name.length > 80
    || email.length > 254
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || password.length < 12
    || password.length > 128
  ) {
    redirect('/signup?error=validation')
  }

  const siteUrl = process.env.SITE_URL
  if (!siteUrl) throw new Error('Set SITE_URL to enable email confirmation links.')

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: new URL('/auth/callback', siteUrl).toString(),
    },
  })
  if (error) redirect('/signup?error=registration')
  if (data.session) redirect('/profile')
  redirect('/signin?notice=check-email')
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error('Unable to sign out. Please try again.')
  redirect('/')
}

export async function placeDemoOrder(formData) {
  const session = await getSession()
  if (!session) {
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
