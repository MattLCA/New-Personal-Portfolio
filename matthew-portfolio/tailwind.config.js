// Colours come from CSS variables in src/style.css (light + dark tokens).
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: { paper: 'var(--paper)', ink: 'var(--ink)', crimson: 'var(--crimson)' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  }
}
