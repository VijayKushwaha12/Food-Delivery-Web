/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        'x-6': 'rotateX(6deg)',
        'y-6': 'rotateY(6deg)',
      },
    },
  },
  plugins: [],
};
