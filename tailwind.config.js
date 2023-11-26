/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem'
        // lg: '13rem',
        // xl: '14rem',
        // '2xl': '15rem'
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
      },
      aspectRatio: {
        cover: '16 / 10'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
