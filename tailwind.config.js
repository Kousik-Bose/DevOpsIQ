/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#0b0b12',
        acid: '#b8f23a',
        violet: '#805dff'
      },
      boxShadow: {
        glow: '0 0 60px rgba(128,93,255,.22)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 16s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite'
      },
      keyframes: {
        float: {'0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-12px)'}},
        drift: {'0%': {transform:'translateX(-20%)'}, '100%': {transform:'translateX(120%)'}},
        'pulse-slow': {'0%,100%': {opacity:0.7, transform:'scale(1)'}, '50%': {opacity:1, transform:'scale(1.02)'}}
      }
    }
  },
  plugins: []
}
