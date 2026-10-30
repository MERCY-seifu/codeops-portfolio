import { NextResponse } from 'next/server'
import { getSession } from '../../../../../lib/session-server.js'
import { getOrderStatus, getOwnedOrder } from '../../../../../lib/demo-orders.js'

export const dynamic = 'force-dynamic'

export async function GET(_request, { params }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
  const { reference } = await params
  const order = getOwnedOrder(session.id, reference)
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  return NextResponse.json(getOrderStatus(order), {
    headers: { 'Cache-Control': 'private, no-store' },
  })
}
