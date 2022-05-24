/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','localhost']
  },
  env: {
    HOST: process.env.HOST,
  }
}


module.exports = nextConfig
