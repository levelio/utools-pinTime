import preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [preact(), UnoCSS()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        preload: 'src/preload/index.ts',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'preload' ? 'preload/index.js' : '[name].js'
        },
        format: 'commonjs',
        preserveModules: false,
      },
    },
    minify: false,
    sourcemap: false,
  },
})
