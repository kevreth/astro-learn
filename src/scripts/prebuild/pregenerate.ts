import {generate} from './generate'
import {directory} from './directories'
import {processAllTemplates} from './processAllTemplates'
import { join } from 'path'
import fs from 'fs-extra'
import { load, type LocniData } from './locni_data'
import {make_data_json} from './mkdatajson'
import { walkSync } from './library'
import {buildSites} from './buildSites'
import {createDevCsvs} from './createDevCsvs'
import { createCustomCsvs } from './createCustomCsvs'
export interface FileCommand {
  targetFile: string
  exists: boolean
}
export function copyFileCommand(subDir: string): FileCommand {
  const targetFile = join(subDir, 'index.vue')
  const exists = fs.existsSync(targetFile)
  return { targetFile, exists }
}
export function copyFileCommands(dir: string) {
  const entries = walkSync(dir)
  const fileCommands: FileCommand[] = entries.map((subDir) => copyFileCommand(subDir))
  return fileCommands
}
export function copyFiles(fileCommands: FileCommand[], indexFile: string) {
  fileCommands.forEach(({ targetFile, exists }) => {
    if (!exists) fs.copyFileSync(indexFile, targetFile)
  })
}
export function copyIndexVueToSubdirectories(dir: string, indexFile: string) {
  const fileCommands: FileCommand[] = copyFileCommands(dir)
  copyFiles(fileCommands, indexFile)
}
export function recreatePagesDirectory() {
  fs.removeSync('./pages')
  fs.mkdirSync('./pages')
  fs.copySync('./sites', './pages', { dereference: true })
}
function createDevInSites(): LocniData {
  //load must be called twice because it depends on the content of sites/
  let data: LocniData = load() //requires buildSites
  createDevCsvs(data) //requires the first load()
  createCustomCsvs(data)
  data = load() //requires createDevCsvs
  return data
}
export function main(baseUrl: string, indexFile:string, target:string) {
  buildSites()
  const data: LocniData = createDevInSites()
  recreatePagesDirectory()
  directory(data)
  generate(target + 'us', data)
  processAllTemplates(data)
  copyIndexVueToSubdirectories(target, indexFile)
  make_data_json(baseUrl, target)
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2]
  if (!baseUrl) {
    console.error('Error: REQUIRED_VARIABLE is not set.')
    process.exit(1)
  }
  else {
    const target = 'pages/'
    const indexFile = join(target, 'index.vue')
    main(baseUrl, indexFile, target)
  }
}