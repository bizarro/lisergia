import { cloudflare } from '@cloudflare/vite-plugin'
import path from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'

export default defineConfig({
  resolve: {
    alias: {
      '@utilities': path.resolve(__dirname, './utilities'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'legacy-js-api', 'slash-div'],
      },
    },
  },
  environments: {
    client: {
      build: {
        rollupOptions: {
          input: {
            app: './src/app/index.ts',
          },
          output: {
            entryFileNames: 'bundle.js',
            chunkFileNames: 'chunk.js',
            assetFileNames: '[name][extname]',
          },
        },
      },
    },
  },
  plugins: [
    cloudflare(),
    iconsSpritesheet({
      cwd: process.cwd(),
      formatter: 'prettier',
      inputDir: './src/sprites',
      outputDir: 'public',
      fileName: 'bundle.svg',
      typesOutputFile: './src/app/icons.ts',
      iconNameTransformer: (name: string) => `icon-${name.toLocaleLowerCase()}`,
      withTypes: true,
    }),
    glsl(),
  ],
})
