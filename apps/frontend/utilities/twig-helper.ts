import path from 'path'
import Twig from 'twig'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const viewsDir = path.join(__dirname, '../views')

export function renderTwig(templatePath: string, data: Record<string, any>): string {
  const fullPath = path.join(viewsDir, `${templatePath}.twig`)

  try {
    const template = Twig.twig({
      path: fullPath,
      async: false,
    })
    return template.render(data)
  } catch (error) {
    console.error(`Error rendering template ${fullPath}:`, error)
    throw error
  }
}
