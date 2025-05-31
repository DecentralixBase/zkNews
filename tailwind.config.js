/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#2e026d',
        'gradient-end': '#0f172a',
        'glass': 'rgba(30, 41, 59, 0.6)',
        'glass-light': 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 8s ease-in-out infinite',
        'particle-float': 'particle-float 3s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}; 