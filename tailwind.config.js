/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'galFold':'280px',
        'galS8':'360px',
        'ipnSE':'375px',
        'iphn12':'390px',
        'pixL5':'393px',
        'galS20':'412px',
        'iphnXR':'414px',
        'surfDuo':'540px',
        'galTab':'712',
        'ipadMin':'768px',
        'ipadAir':'820px',
        'surfPro':'912px',
      }
    },
  },
  plugins: [],
}

