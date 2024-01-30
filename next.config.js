/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextConfig

module.exports = {
  async redirects() {
    return [
      {
        source: '/s',
        destination: '/',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/profile/information',
        permanent: true
      },
      {
        source: '/admin',
        destination: '/admin/new-product',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/category-:slug-apparel',
        destination: '/category/:slug/apparel',
      },
      {
        source: '/category-:slug',
        destination: '/category/:slug'
      },
    ]
  },
}