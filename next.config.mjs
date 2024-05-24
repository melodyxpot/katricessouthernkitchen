/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'powerful-happiness-9b7bd959ea.strapiapp.com',
        port: '',
        pathname: '/uploads/**',
      }
    ]
  }
};

export default nextConfig;
