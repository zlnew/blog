/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '6rem',
        lg: '13rem',
        xl: '14rem',
        '2xl': '15rem'
      }
    },
    extend: {
      colors: {
        light: '#f8fafc',
        dark: '#030712',
        accent: {
          DEFAULT: '#030712',
          light: '#1f2937'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
