export const SESSION_COOKIE = 'addis_eats_session'
const SESSION_LIFETIME_SECONDS = 60 * 60 * 24 * 7

function encodeBase64Url(value) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function decodeBase64Url(value) {
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

async function getSigningKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret || new TextEncoder().encode(secret).length < 32) {
    throw new Error('SESSION_SECRET must be set to a value of at least 32 bytes.')
  }

  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function createSessionToken(user) {
  const payload = encodeBase64Url(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS,
  }))
  const signature = await crypto.subtle.sign(
    'HMAC',
    await getSigningKey(),
    new TextEncoder().encode(payload),
  )

  return `${payload}.${encodeBase64Url(new Uint8Array(signature))}`
}

export async function verifySessionToken(token) {
  if (typeof token !== 'string') return null
  const [payload, signature, extra] = token.split('.')
  if (!payload || !signature || extra) return null

  try {
    const signingKey = await getSigningKey()
    const valid = await crypto.subtle.verify(
      'HMAC',
      signingKey,
      decodeBase64Url(signature),
      new TextEncoder().encode(payload),
    )
    if (!valid) return null

    const session = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload)))
    if (
      typeof session.sub !== 'string'
      || typeof session.email !== 'string'
      || typeof session.name !== 'string'
      || !Number.isInteger(session.exp)
      || session.exp <= Math.floor(Date.now() / 1000)
    ) return null

    return { id: session.sub, email: session.email, name: session.name }
  } catch {
    return null
  }
}
