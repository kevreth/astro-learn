import * as fs from 'fs'
import * as path from 'path'
import Handlebars from 'handlebars'
import {findFiles} from './directories'
import {load, type LocniData, queryLocality, queryRegion, queryLocni} from './locni_data'
import { join } from 'path'
//generate data.yml for region, locality, niche, and directory
//generate content.md for niche
export function readDirRecursive(dirPath: string): string[] {
    const filePaths: string[] = []
    for (const file of fs.readdirSync(dirPath)) {
        const fullPath = path.join(dirPath, file)
        if (fs.statSync(fullPath).isDirectory()) {
            filePaths.push(...readDirRecursive(fullPath))
        } else {
            filePaths.push(fullPath)
        }
    }
    return filePaths
}
export function processTemplates(templatesDir: string, data:any, outputDir: string): void {
    const files = readDirRecursive(templatesDir)
    for (const file of files) {
        if (file.endsWith('.hbs')) {
            const templateContent = fs.readFileSync(file, 'utf-8')
            const template = Handlebars.compile(templateContent)
            const result = template(data)
            const relativePath = path.relative(templatesDir, file)
            const outputFilePath = path.join(outputDir, relativePath.slice(0, -4))
            fs.mkdirSync(path.dirname(outputFilePath), { recursive: true })
            if (!fs.existsSync(outputFilePath)) {
                fs.writeFileSync(outputFilePath, result)
            }
        }
    }
}
export function generate_region(data_: LocniData, country: string, region: string, output: string, template: string) {
    const data = queryRegion(data_,country,region)
    const outputDir = join(...[output, country, region])
    processTemplates(template, data, outputDir)
}
export function generate_locality(data_: LocniData, country: string, region: string, locality: string, output: string, template: string) {
    const data = queryLocality(data_,country,region,locality)
    const outputDir = join(...[output, country, region, locality])
    processTemplates(template, data, outputDir)
}
export function generate_locni(data_: LocniData, country: string, region: string, locality: string, niche: string, output: string, template: string){
    const data = queryLocni(data_,country,region,locality, niche)
    const outputDir = join(...[output, country, region, locality, niche])
    processTemplates(template, data, outputDir)
}
export function processPaths(paths: string[]) {
    const countries = new Set<string>()
    const regions = new Set<string>()
    const localities = new Set<string>()
    const locnis = new Set<string>()
    paths.forEach(path => {
        //slice off 'sites/' and 'content.csv'
        const [country, region, locality, niche] = path.split('/').slice(1,5)
        countries.add(country)
        regions.add( country + '/' + region )
        localities.add( country + '/' + region + '/' + locality )
        locnis.add( country + '/' + region + '/' + locality + '/' + niche)
    })
    return {
        countries: Array.from(countries),
        regions: Array.from(regions),
        localities: Array.from(localities),
        locnis: Array.from(locnis)
    }
}
export function processAllTemplates(data:LocniData) {
    const template = 'data/template/'
    const output = 'sites'
    const files = findFiles('sites/us', 'content.csv')
    let result = processPaths(files)
    result.regions.forEach(file => {
        const pathComponents = file.split('/')
        const numComponents = pathComponents.length
        if (numComponents != 2) process.exit(-1)
        let template_ = template + 'region'
        const [country, region] = pathComponents
        generate_region(data, country, region, output, template_)
    })
    result.localities.forEach(file => {
        const pathComponents = file.split('/')
        const numComponents = pathComponents.length
        if (numComponents != 3) process.exit(-1)
        let template_ = template + 'locality'
        const [country, region, locality] = pathComponents
        generate_locality(data, country, region, locality, output, template_)
    })
    result.locnis.forEach(file => {
        const pathComponents = file.split('/')
        const numComponents = pathComponents.length
        if (numComponents != 4) process.exit(-1)
        let template_ = template + 'locni'
        const [country, region, locality, niche] = pathComponents
        generate_locni(data, country, region, locality, niche, output, template_)
    })
}
if (import.meta.url === `file://${process.argv[1]}`) {
    const data = load()
    processAllTemplates(data)
}
