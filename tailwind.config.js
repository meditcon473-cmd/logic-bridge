/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0f111a',
        'klein-blue': '#002fa7',
        'neon-cyan': '#00ffff',
        'terminal-bg': '#0a0e17',
        'card-dark': '#161b25',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}