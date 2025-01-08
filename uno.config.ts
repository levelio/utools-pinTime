import { blackA, mauve, violet } from '@radix-ui/colors'
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
  ],
  theme: {
    colors: {
      ...blackA,
      ...mauve,
      ...violet,
    },
  },
})
