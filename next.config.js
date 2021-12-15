const path = require("path");

module.exports = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  images: {
    domains: ["images.unsplash.com", "tailwindui.com", "unsplash.com"],
    loader: "imgix",
    path: "https://noop/",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  api: {
    externalResolver: true,
  },
  env: {
    API_URL: process.env.API_URL,
    CLIENT_ID: process.env.CLIENT_ID,
  },
};
