const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com", "unsplash.com"],
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
