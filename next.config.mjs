/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => ([
    { source: '/api/:path*', destination: `${process.env.API_URL}/api/:path*` },
  ]),
};

export default nextConfig;
