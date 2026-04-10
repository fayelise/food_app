/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// tailwind.config.js
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         lobster: ['Lobster', 'cursive'], // just optional
//       },
//       letterSpacing: {
//         tightest: '-0.02em', // fine-tune like Figma
//         wider: '0.05em',     // fine-tune spacing
//       },
//     },
//   },
//   plugins: [],
// }