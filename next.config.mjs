/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "admin.katricessouthernkitchen.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "katricessouthernkitchen.com",
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
