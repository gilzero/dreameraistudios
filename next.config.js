/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Add remote image domains here if needed in the future
      // Example:
      // { protocol: 'https', hostname: 'assets.example.com' },
    ],
  },
};

export default nextConfig;
