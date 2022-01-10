const path = require('path');
const env = process.env.NODE_ENV;

module.exports = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  target: 'serverless',

  images: {
    domains: ['images.unsplash.com', 'tailwindui.com', 'unsplash.com'],
    loader: 'akamai',
    path: '',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  api: {
    externalResolver: true,
  },
  env: {
    API_URL: process.env.API_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    SEARCH_URL: process.env.SEARCH_URL,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    IPSTACK_ACCESS_KEY: process.env.IPSTACK_ACCESS_KEY,
    IPSTACK_API_URL: process.env.IPSTACK_API_URL,
  },
};
