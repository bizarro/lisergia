const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const typescript = require('rollup-plugin-typescript2')

const production = !process.env.ROLLUP_WATCH

module.exports = {
  input: 'scripts/index.ts',
  output: {
    file: 'index.js',
    sourcemap: !production,
  },
  external: ['auto-bind', 'lenis', 'mobx', 'nanoevents', 'normalize-wheel'],
  plugins: [
    replace({
      preventAssignment: true,

      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    }),

    commonjs(),

    nodeResolve(),

    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
  preserveSymlinks: true,
}
