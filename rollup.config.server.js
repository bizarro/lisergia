const autoprefixer = require('autoprefixer')
const browsersync = require('rollup-plugin-browsersync')
const commonjs = require('@rollup/plugin-commonjs')
const copy = require('rollup-plugin-copy')
const glslify = require('rollup-plugin-glslify')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('postcss')
const replace = require('@rollup/plugin-replace')
const scss = require('rollup-plugin-scss')
const svg = require('rollup-plugin-svg-icons')
const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')
const { visualizer } = require('rollup-plugin-visualizer')

const production = process.env.ROLLUP_WATCH === 'false'
const configuration = JSON.parse(process.env.configuration)

const path = require('path')

module.exports = {
  input: path.join(configuration.src, 'app/index.ts'),
  output: {
    file: path.join(configuration.build, 'bundle.js'),
    format: 'cjs',
    sourcemap: !production,
  },
  plugins: [
    replace({
      preventAssignment: true,

      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    }),

    commonjs(),

    copy({
      flatten: true,
      targets: [
        {
          dest: configuration.build,
          rename: (name, extension, fullPath) => fullPath.replace(path.join(configuration.src, 'shared'), ''),
          src: `${path.join(configuration.src, 'shared')}/**`,
        },
      ],
      verbose: true,
    }),

    glslify({
      compress: production,
    }),

    nodeResolve(),

    scss({
      fileName: 'bundle.css',
      outputStyle: 'compressed',
      processor: () => postcss([autoprefixer()]),
      silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'legacy-js-api', 'slash-div'],
      watch: path.join(configuration.src, 'styles'),
    }),

    svg({
      inputFolder: path.join(configuration.src, 'sprites'),
      output: path.join(configuration.build, 'bundle.svg'),
    }),

    typescript({
      compilerOptions: {
        lib: ['DOM', 'ESNext'],
        target: 'ESNext',
      },
    }),

    !production &&
      browsersync({
        port: configuration.browsersync?.port ?? 3030,
        proxy: configuration.browsersync?.proxy ?? 'localhost:3000',
        files: [
          {
            match: [`${path.join(configuration.root, 'views')}/**`],
            fn: function (event, file) {
              this.reload()
            },
          },
        ],
      }),

    production && terser(),

    visualizer(),
  ],
  preserveSymlinks: true,
}
