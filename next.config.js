const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
