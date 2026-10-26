/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#14919B',
          navy: '#0A2540',
          gold: '#E9B949',
          coral: '#FF6B5B',
        },
      },
      fontFamily: {
        display: [
          'var(--font-anton)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-jetbrains-mono)',
          'ui-monospace',
          'monospace',
        ],
      },
    },
  },
}
