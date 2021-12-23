module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "focus-within-pseudo-class": false,
      },
    },
  },
};
