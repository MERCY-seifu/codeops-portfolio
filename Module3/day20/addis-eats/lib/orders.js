const areas = ['Bole', 'Kazanchis', 'Megenagna', 'Piazza']
const totals = [
  480, 720, 560, 930, 650, 410, 1180, 790, 540, 860, 670, 490,
  990, 610, 740, 450, 1280, 830, 580, 920, 690, 520, 1060, 760,
]

export const orders = totals.map((total, index) => {
  const day = (index % 14) + 1
  const hour = 9 + (index % 10)

  return {
    id: `AE-2606-${String(1048 - index).padStart(4, '0')}`,
    area: areas[index % areas.length],
    total,
    status: ['Delivered', 'Preparing', 'Delivered', 'Ready'][index % 4],
    createdAt: new Date(Date.UTC(2026, 5, day, hour)).toISOString(),
  }
})
