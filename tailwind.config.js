const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
    './src/helpers/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      tablet: '640px',
      desktop: '1024px',
    },
    textIndent: (theme, { negative }) => ({
      ...{
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
      },
      ...negative({
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
      }),
    }),
    extend: {
      gridTemplateColumns: {
        carousel: 'repeat(12, 200px)',
      },
      gridTemplateRows: {
        carousel: '200px',
      },
      spacing: {
        25: '6.5rem',
      },
      padding: {
        full: '100%',
      },
      minWidth: {
        36: '9rem',
      },
      colors: {
        green: {
          DEFAULT: '#2F603D',
          50: '#E8F1EB',
          100: '#D6E5DA',
          200: '#5BAF73',
          300: '#4A9760',
          400: '#3C7B4E',
          500: '#2F603D',
          600: '#2E5539',
          700: '#0A150D',
          800: '#000000',
          900: '#000000',
        },
        og: {
          50: '#42ebb3',
          100: '#38e1a9',
          200: '#2ed79f',
          300: '#24cd95',
          400: '#1ac38b',
          500: '#10b981',
          600: '#06af77',
          700: '#00a56d',
          800: '#009b63',
          900: '#009159',
        },
        orange: {
          DEFAULT: '#EA580C',
          50: '#FBCBB3',
          100: '#FABE9F',
          200: '#F8A478',
          300: '#F68A51',
          400: '#F4702B',
          500: '#EA580C',
          600: '#B54409',
          700: '#7F3007',
          800: '#4A1C04',
          900: '#150801',
        },
      },
      fontFamily: {
        sans: ['Inter'],
        serif: ['Corben'],
      },
    },
  },
  variants: {
    // all the following default to ['responsive']
    textIndent: ['responsive'],
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tailwindcss-text-indent')(),
  ],
};
