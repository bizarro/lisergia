#!/usr/bin/env node

import 'dotenv/config'

import * as fs from 'node:fs'
import * as path from 'node:path'

import autoprefixer from 'autoprefixer'
import { build, createServer } from 'vite'
import glsl from 'vite-plugin-glsl'

const [type] = process.argv.slice(2)

const root = path.resolve()

const silenceDeprecations = [
  'color-functions',
  'global-builtin',
  'if-function',
  'import',
  'legacy-js-api',
  'slash-div',
]

function svgSpritePlugin(spritesDir, outputName = 'bundle.svg') {
  return {
    name: 'svg-sprite',
    apply: 'build',
    generateBundle() {
      if (!fs.existsSync(spritesDir)) return

      const files = fs.readdirSync(spritesDir).filter((f) => f.endsWith('.svg'))
      const symbols = files.map((file) => {
        const content = fs.readFileSync(path.join(spritesDir, file), 'utf-8')
        const id = file.replace('.svg', '')
        const viewBoxMatch = content.match(/viewBox="([^"]*)"/)
        const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
        const viewBox = viewBoxMatch ? ` viewBox="${viewBoxMatch[1]}"` : ''
        const inner = innerMatch ? innerMatch[1] : ''
        return `<symbol id="${id}"${viewBox}>${inner}</symbol>`
      })

      const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('')}</svg>`

      this.emitFile({ type: 'asset', fileName: outputName, source: sprite })
    },
  }
}

function createViteConfig(production = false) {
  return {
    root: path.join(root, 'src'),
    publicDir: path.join(root, 'src', 'shared'),
    build: {
      outDir: path.join(root, 'build'),
      emptyOutDir: true,
      sourcemap: !production,
      rollupOptions: {
        input: path.join(root, 'src', 'app', 'index.ts'),
        output: {
          entryFileNames: 'bundle.js',
          chunkFileNames: 'bundle-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.css$/i.test(assetInfo.name ?? '')) return 'bundle.css'
            return '[name][extname]'
          },
        },
      },
    },
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
      preprocessorOptions: {
        scss: {
          silenceDeprecations,
        },
      },
    },
    plugins: [
      glsl({ compress: production }),
      svgSpritePlugin(path.join(root, 'src', 'sprites')),
    ],
    resolve: {
      preserveSymlinks: true,
    },
    server: {
      port: Number(process.env.VITE_PORT ?? process.env.BROWSERSYNC_PORT ?? 5173),
      cors: true,
      strictPort: true,
    },
  }
}

if (type === 'build') {
  await build(createViteConfig(true))
} else {
  const config = createViteConfig(false)

  const server = await createServer(config)
  await server.listen()

  server.printUrls()
}
