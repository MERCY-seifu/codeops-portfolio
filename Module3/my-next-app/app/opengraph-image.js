import { ImageResponse } from 'next/og'

export const alt = 'Addis Eats — Ethiopian home-kitchen food in Addis Ababa'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fff9f1 0%, #f5dfc7 100%)',
        color: '#30211b',
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', padding: 72 }}>
        <span style={{ color: '#ed542e', fontSize: 28 }}>ETHIOPIAN FOOD · ADDIS ABABA</span>
        <span style={{ marginTop: 24 }}>Addis Eats</span>
        <span style={{ marginTop: 16, fontSize: 34, fontWeight: 400 }}>A taste of home, made in Addis.</span>
      </div>
    </div>,
    size,
  )
}
