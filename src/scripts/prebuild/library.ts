import * as path from "path"
import { JSDOM } from "jsdom"
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync} from "fs"
import { join } from 'path'
export function ensureDirectory(filePath: string): void {
    const directory = path.dirname(filePath)
    if (directory && !existsSync(directory)) {
        mkdirSync(directory, { recursive: true })
    }
}
export function writeFile(filePath: string, content: string): void {
    ensureDirectory(filePath)
    writeFileSync(filePath, content, { encoding: "utf-8" })
}
export function loadTemplate(templatePath: string): string {
    return readFileSync(templatePath, { encoding: "utf-8" })
}
export function updateActive(activeStates: string[], htmlContent: string): string {
    const dom = new JSDOM(htmlContent)
    const document = dom.window.document
    document.querySelectorAll("a.inactive").forEach(link => {
      const stateId = link.getAttribute("id")
      if (stateId && activeStates.includes(stateId)) {
        link.className = "active"
      } else {
        link.setAttribute("href", "#")
      }
    })
    return dom.serialize()
  }
export function soupFile(content: string): Document {
    const dom = new JSDOM(content)
    return dom.window.document
}
export function walkSync(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true })
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(dir, entry.name))
  return directories.concat(directories.flatMap(walkSync))
}