import { Location } from './location'
import type { Localities } from './locni_data'
export function iteration(region: string, locality: string, localityProper: string, active: boolean): string {
    const className = active ? "active" : "inactive"
    const hrefValue = active ? `/us/${region}/${locality}` : "#"
    const entry = `            <li><a class="${className}" id="${locality}" href="${hrefValue}">${localityProper}</a></li>\n`
    return entry
}
export function isActive(localities: Localities, locality: string): boolean {
    const niches = localities[locality]['niches']
    return Array.isArray(niches) && niches.length > 0
}
export function localityEntries(region: string, localities: Localities): string[] {
    const cityEntries: string[] = []
    for (const locality in localities) {
        const localityProper = localities[locality]['proper']
        const active = isActive(localities, locality)
        const entry = iteration(region, locality, String(localityProper), active)
        cityEntries.push(entry)
    }
    return cityEntries
}
export function createContent(template: string, localities: string, regionProper: string): string {
    template = template.replace('{region}', regionProper)
    template = template.replace('{localities}', localities)
    return template
}
export class Region extends Location {
    getDataSource(data: any): any[] {
        return Object.keys(data.regions).map(region => ({ [region]: data.regions[region] }))
    }
    formatContent(template: string, dataSource: any): string {
        const regionName = Object.keys(dataSource)[0]
        const localities = dataSource[regionName]['localities']
        const regionProper = dataSource[regionName]['proper']
        const localitiesLst: string[] = localityEntries(regionName, localities)
        const localities_ = localitiesLst.join('').trim()
        const content = createContent(template, localities_, regionProper)
        return content
    }
    addToFileList(outputPath: string, fileData: any, item: any, content: string): void {
        if (content.includes('class="active"')) {
            const region = Object.keys(item)[0]
            const fields = [region]
            this.appendToFileList(outputPath, fileData, content, fields)
        }
    }
}
