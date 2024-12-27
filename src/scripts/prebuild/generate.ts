import type { LocniData } from './locni_data'
import { Locality } from './locality'
import { US } from './us'
import { writeFile, loadTemplate } from './library'
import { Region } from './region'
const TEMPLATE = 'src/scripts/prebuild/${ENTITY}.md'
const ENTITIES = ['us','regions','locality']
const PROVIDERS = [new US(), new Region(), new Locality()]
export function get_path(entity: string): string {
    return TEMPLATE.replace('${ENTITY}',entity)
}
export function generate(outputPath: string, data:LocniData): void {
    const fileData: [string, string][] = [];
    for (let i=0; i<ENTITIES.length; i++) {
        const entity = ENTITIES[i]
        const path  = get_path(entity)
        const template = loadTemplate(path)
        const provider = PROVIDERS[i]
        const fileList = provider.createFileList(template, outputPath, data)
        fileData.push(...fileList)
    }
    fileData.forEach(([filename, content]: [string, string]) => {
        writeFile(filename, content)
    })
}
