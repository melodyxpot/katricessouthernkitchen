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
        hostname: "powerful-happiness-9b7bd959ea.media.strapiapp.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "powerful-happiness-9b7bd959ea.strapiapp.com",
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
