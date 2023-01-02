/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize : {
        xxxs : "0.25rem",
        xxs : "0.5rem",
        xs : "0.75rem",
        sm : "0.875rem",
        base : "1rem",
        lg : "1.125rem",
        xl : "1.25rem",
        "2xl" : "1.5rem",
        "3xl" : "1.875rem",
        "4xl" : "2rem"
      },
      screens : {
        "phone" : "250px",
        "xs" :  "400px",
        "tablet" : "640px",
        "laptop" : "1024px",
        "desktop" : "1280px"
      }
    },
  },
  plugins: [plugin(function({ addUtilities, addComponents, e, prefix, config }) {
    const newUtilities = {
      '.horizontal-tb': {
        writingMode: 'horizontal-tb',
      },
      '.vertical-rl': {
        writingMode: 'vertical-rl'
      },
      '.vertical-lr': {
        writingMode: 'vertical-lr'
      }
    }
    addUtilities(newUtilities)
  })],
}
