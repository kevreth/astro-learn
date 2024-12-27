import { updateActive } from './library'
import { Location } from './location'
export type LocalityData = {
    region: string
    regionProper: string
    locality: string
    localityProper: string
    niches: string[]
}
export class Locality extends Location {
    getDataSource(data: any): LocalityData[] {
        const result: LocalityData[] = []
        for (const [regionName, regionData] of Object.entries(data.regions)) {
            for (const [localityName, localityData] of Object.entries(regionData["localities"])) {
                result.push({
                    region: regionName,
                    regionProper: regionData["proper"],
                    locality: localityName,
                    localityProper: localityData["proper"],
                    niches: localityData["niches"]
                })
            }
        }
        return result
    }
    formatContent(template: string, dataSource: LocalityData): string {
        const { niches, regionProper, localityProper, region, locality } = dataSource
        let content = ''
        if (niches.length > 0) {
            content = updateActive(niches, template)
            content = content
                .replace('{country}', 'us')
                .replace('{region_proper}', regionProper)
                .replace('{locality_proper}', localityProper)
                .replace('{region}', region)
                .replace('{locality}', locality)
        }
        return content
    }
    addToFileList(outputPath: string, fileData: any, item: LocalityData, content: string): void {
        if (content) {
            const { region, locality } = item
            const fields = [region, locality]
            this.appendToFileList(outputPath, fileData, content, fields)
        }
    }
}
