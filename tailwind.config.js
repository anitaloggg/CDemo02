/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#0A84FF',
        'brand-accent': '#5E5CE6',
        'brand-teal': '#32D4C8',
        'bg-page': '#EFF3FF',
        'surface-glass': 'rgba(255,255,255,0.72)',
        'surface-strong': 'rgba(255,255,255,0.88)',
        'surface-subtle': 'rgba(255,255,255,0.45)',
        'glass-border': 'rgba(255,255,255,0.60)',
        'text-base': '#1C1C1E',
        'text-muted': '#6E6E73',
        'text-subtle': '#AEAEB2',
      },
      boxShadow: {
        'glass': '0 4px 24px 0 rgba(0,0,0,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.04)',
        'glass-lg': '0 8px 40px 0 rgba(0,0,0,0.12), 0 2px 10px 0 rgba(0,0,0,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'sans-serif'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
