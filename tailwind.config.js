/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        read: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        mute: 'rgb(var(--c-mute) / <alpha-value>)',
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        sunk: 'rgb(var(--c-sunk) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        brand: 'rgb(var(--c-brand) / <alpha-value>)',
        cyan2: 'rgb(var(--c-cyan) / <alpha-value>)',
        navy: 'rgb(var(--c-navy) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--c-shadow) / .06), 0 8px 24px -12px rgb(var(--c-shadow) / .18)',
        lift: '0 2px 4px rgb(var(--c-shadow) / .08), 0 18px 40px -16px rgb(var(--c-shadow) / .28)',
      },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'none' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        rise: 'rise .45s cubic-bezier(.2,.7,.2,1) both',
        floaty: 'floaty 7s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
