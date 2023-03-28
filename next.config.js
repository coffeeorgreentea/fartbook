/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["vkzhmwivieetdcbhmszr.supabase.co"] },
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
