import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: true,
  entry: ['./index.ts'],
  format: 'esm',
  outDir: '.',
  minify: true,
  noExternal: ['@lisergia'],
  sourcemap: true,
  splitting: false,
})
