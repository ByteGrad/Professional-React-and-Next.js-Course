/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  turbopack: { root: __dirname },
  images: {
    qualities: [50, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
    ],
  },
};

module.exports = nextConfig;
