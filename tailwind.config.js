/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'emerald-green': '#50C878',
        'golden-yellow': '#FFD700',
      },
      // Menghapus keyframes dan animasi kustom 'fadeInUp'
      keyframes: {
        // fadeInUp: {
        //   '0%': {
        //     opacity: '0',
        //     transform: 'translateY(20px)',
        //   },
        //   '100%': {
        //     opacity: '1',
        //     transform: 'translateY(0)',
        //   },
        // },
      },
      animation: {
        // fadeInUp: 'fadeInUp 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}