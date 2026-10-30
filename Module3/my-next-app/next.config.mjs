import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const nextConfig = {
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'live.staticflickr.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  outputFileTracingIncludes: {
    '/menu': ['./data/menu.json'],
  },
}

export default nextConfig
