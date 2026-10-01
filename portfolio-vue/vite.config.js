import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base './' lets the built site work on GitHub Pages from any repo name
export default defineConfig({ base: './', plugins: [vue()] })
