/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        interFont: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        'myGrid': 'repeat(auto-fill, minmax(280px,1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
