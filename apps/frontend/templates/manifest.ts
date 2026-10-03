import manifest from 'lisergia:manifest'

const ENTRY = 'app/index.ts'

// Async datasets follow a naming convention shared with `src/app/index.ts`:
// `datasets/Parallax` hydrates `[data-parallax]`, `datasets/sections/Hero`
// hydrates `.hero`. Datasets outside the convention still load, just without
// a preload hint.
const DATASET = /^app\/datasets\/(?:(sections)\/)?([A-Za-z]+)\./

function kebabCase(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function getPattern(source: string) {
  const match = source.match(DATASET)

  if (!match) return undefined

  const [, section, name] = match
  const token = kebabCase(name!)

  return section
    ? new RegExp(`\\sclass="(?:[^"]*\\s)?${token}(?:\\s[^"]*)?"`)
    : new RegExp(`\\sdata-${token}(?:[\\s=>/]|$)`)
}

// Chunk file plus every chunk it statically imports, minus the entry itself.
function getFiles(source: string, files: Set<string> = new Set()) {
  const chunk = manifest[source]

  if (!chunk || source === ENTRY || files.has(chunk.file)) return files

  files.add(chunk.file)

  chunk.imports?.forEach((dependency) => {
    getFiles(dependency, files)
  })

  return files
}

const entry = manifest[ENTRY]!

const datasets = (entry.dynamicImports ?? []).flatMap((source) => {
  const pattern = getPattern(source)

  return pattern ? [{ files: getFiles(source), pattern }] : []
})

export const bundle = {
  css: (entry.css ?? []).map((file) => `/${file}`),
  js: `/${entry.file}`,
}

// Self-hosted fonts from `src/styles/base/fonts.scss`. Otherwise they are only
// discovered after the stylesheet downloads and parses.
export const fonts = ['/fonts/neue-montreal.woff2', '/fonts/editorial-new.woff2', '/fonts/anonymous-pro.woff2']

// Also sent as a `Link` header, so the browser (and Cloudflare Early Hints, when
// enabled on the zone) can start fetching them before the HTML is parsed.
export const preloadHeader = [
  ...bundle.css.map((href) => `<${href}>; rel=preload; as=style`),
  ...fonts.map((href) => `<${href}>; rel=preload; as=font; type="font/woff2"; crossorigin`),
].join(', ')

// Rendered pages only know which datasets they need once rendered, so the hints
// are injected into the `<head>` afterwards. This lets the browser fetch dataset
// chunks in parallel with the entry instead of after it runs.
export function injectModulePreloads(html: string) {
  const files = new Set<string>([entry.file])

  datasets.forEach(({ files: datasetFiles, pattern }) => {
    if (pattern.test(html)) {
      datasetFiles.forEach((file) => {
        files.add(file)
      })
    }
  })

  const links = Array.from(files)
    .map((file) => `<link rel="modulepreload" href="/${file}">`)
    .join('')

  return html.replace('</head>', `${links}</head>`)
}
