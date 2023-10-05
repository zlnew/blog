/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        light: '#f8fafc',
        dark: '#030712',
        accent: {
          DEFAULT: '#030712',
          light: '#1f2937'
        },
        info: {
          DEFAULT: '#1d4ed8',
          light: '#3b82f6'
        },
        warning: {
          DEFAULT: '#facc15',
          light: '#fde047'
        },
        danger: {
          DEFAULT: '#b91c1c',
          light: '#ef4444'
        },
        success: {
          DEFAULT: '#16a34a',
          light: '#22c55e'
        }
      }
    }
  },
  plugins: []
}
