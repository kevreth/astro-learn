import {generate} from './generate'
import {directory} from './directories'
import {processAllTemplates} from './processAllTemplates'
import { join } from 'path'
import fs from 'fs-extra'
import { load, type LocniData } from './locni_data'
import {make_data_json} from './mkdatajson'
import { walkSync } from './library'
import {  createSitesDir,  buildCustomSites, buildProdSites} from './buildSites'
import {createDevCsvs} from './createDevCsvs'
import { createCustomCsvs } from './createCustomCsvs'
import { createProdCsvs } from './createProdCsvs'
import { cpSync } from 'fs'
export interface FileCommand {
  targetFile: string
  exists: boolean
}
export function copyFileCommand(subDir: string): FileCommand {
  const targetFile = join(subDir, 'index.astro')
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
export function copyIndexAstroToSubdirectories(dir: string, indexFile: string) {
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
export function main(baseUrl: string, indexFile:string, target:string, data:LocniData) {
  recreatePagesDirectory()
  directory(data)
  generate(target + 'us', data)
  processAllTemplates(data)
  copyIndexAstroToSubdirectories(target, indexFile)
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
    const indexFile = join(target, 'index.astro')
    createSitesDir()
    //TODO: testing the baseUrl is hackish and requires a more robust solution
    if(baseUrl == 'http://inquirita.com') {
      console.log("PRODUCTION: " + baseUrl)
      let data: LocniData = load()
      // createProdCsvs(data)
      // buildProdSites()
      cpSync('build/us', 'sites/us', { recursive: true })
      cpSync('sites/us', 'pages/us', { recursive: true })
      cpSync('pages/us', 'src/astro/pages/us', { recursive: true })
      main(baseUrl, indexFile, 'src/astro/pages/', data)
    }
    else {
      // buildCustomSites()
      // const data: LocniData = createDevInSites()
      // main(baseUrl, indexFile, target, data)
    }
  }
}