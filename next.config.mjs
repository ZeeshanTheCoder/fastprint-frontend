/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // During builds, ESLint errors will not block production
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
