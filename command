#!/usr/bin/env node

const fs = require('fs-extra')

const path = require('path')
const rollup = require('rollup')

const [type] = process.argv.slice(2)

const root = path.resolve()

const copy = ['.editorconfig', '.prettierignore', '.prettierrc', 'eslintrc.config.js']

fs.copy(path.join(__dirname, '.vscode'), path.join(root, '.vscode'))

copy.forEach((file) => {
  fs.copyFileSync(path.join(__dirname, file), path.join(root, file))
})

const configurationFile = path.join(root, 'lisergia.config.js')
const configuration = require(configurationFile)

process.env.configuration = JSON.stringify({
  root: path.join(root),
  src: path.join(root, 'src'),
  build: path.join(root, 'build'),
  browsersync: configuration.browsersync,
})

if (type === 'dev') {
  process.env.ROLLUP_WATCH = true

  const config = require('./rollup.config.server.js')
  const watcher = rollup.watch(config)

  watcher.on('event', ({ result }) => {
    if (result) {
      result.close()
    }
  })

  watcher.on('change', (id) => {
    console.log('File refreshed', id)
  })

  return
}

if (type === 'build') {
  process.env.ROLLUP_WATCH = false

  return new Promise(async (resolve) => {
    const config = require('./rollup.config.server.js')
    const bundle = await rollup.rollup(config)

    await bundle.write({
      file: config.output.file,
    })

    resolve()
  })
}
