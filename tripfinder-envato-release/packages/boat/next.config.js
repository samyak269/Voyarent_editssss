/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['randomuser.me', 'voyarentboats.s3.eu-central-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
