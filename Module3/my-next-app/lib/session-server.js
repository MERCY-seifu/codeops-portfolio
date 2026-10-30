import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDemoUser } from './demo-users.js'
import { SESSION_COOKIE, verifySessionToken } from './auth.js'

export async function getSession() {
  const cookieStore = await cookies()
  const session = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
  if (!session || !getDemoUser(session.id)) return null
  return session
}

export async function requireSession() {
  const session = await getSession()
  if (!session) redirect('/signin')
  return session
}
