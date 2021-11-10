module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        full: "100%",
      },
      minWidth: {
        36: "9rem",
      },
      colors: {
        green: {
          DEFAULT: "#22A259",
          50: "#B9F0D1",
          100: "#A4ECC3",
          200: "#7AE3A7",
          300: "#50DA8B",
          400: "#2BCC70",
          500: "#22A259",
          600: "#197842",
          700: "#104E2B",
          800: "#072414",
          900: "#000000",
        },
      },
      fontFamily: {
        sans: ["Inter"],
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};
