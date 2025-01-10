import preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [preact(), UnoCSS()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
    minify: true,
    sourcemap: false,
  },
})
