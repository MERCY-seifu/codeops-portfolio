import 'server-only'

import { redirect } from 'next/navigation'
import { getSupabaseConfig } from './supabase/config.js'
import { createClient } from './supabase/server.js'

export async function getSession() {
  if (!getSupabaseConfig()) return null

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user?.email) return null

  const metadataName = user.user_metadata?.name
  const name = typeof metadataName === 'string' && metadataName.trim()
    ? metadataName.trim().slice(0, 80)
    : user.email.split('@')[0]

  return { id: user.id, name, email: user.email }
}

export async function requireSession() {
  const session = await getSession()
  if (!session) redirect('/signin?next=%2Fprofile')
  return session
}
