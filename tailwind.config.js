/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        paper: {
          DEFAULT: '#faf8f5',
          light: '#ffffff',
          muted: '#f2efe9',
          border: '#e8e4dc',
          borderDark: '#d8d2c4',
        },
        ink: {
          DEFAULT: '#141414',
          light: '#2e2e2e',
          muted: '#5e5a54',
          faint: '#8c867c',
        },
        seal: {
          red: '#b91c1c',
          dark: '#991b1b',
        },
      },
    },
  },
  plugins: [],
}
