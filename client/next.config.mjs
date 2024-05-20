/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'my-secret-todo-client'
  },
  publicRuntimeConfig: {
    DOMAIN: process.env.DOMAIN,
    PROTOCOL: process.env.PROTOCOL,
    PORT: process.env.PORT,
    API_PORT: process.env.API_PORT,

    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
