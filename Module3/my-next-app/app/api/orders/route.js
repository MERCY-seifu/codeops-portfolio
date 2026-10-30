import { NextResponse } from 'next/server'
import { getSession } from '../../../lib/session-server.js'
import { listOwnedOrders } from '../../../lib/demo-orders.js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
  const orders = listOwnedOrders(session.id).map(({ userId, ...order }) => order)
  return NextResponse.json({ orders }, {
    headers: { 'Cache-Control': 'private, no-store' },
  })
}
