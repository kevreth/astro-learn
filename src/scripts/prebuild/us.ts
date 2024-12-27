import { Location } from "./location"
import { updateActive } from "./library"
export class US extends Location {
    getDataSource(data: any): string[][] {
        const regions: string[] = []
        for (const [regionKey, regionValue] of Object.entries(data.regions)) {
            for (const locality of Object.values(regionValue["localities"])) {
                if (locality["niches"] && locality["niches"].length > 0) {
                    regions.push(regionKey)
                    break
                }
            }
        }
        return [regions]
    }
    formatContent(template: string, dataSource: any): string {
        return updateActive(dataSource, template)
    }
    addToFileList(outputPath: string, fileData: Array<[string, string]>, item: any, content: string): void {
        const fields: string[] = []
        this.appendToFileList(outputPath, fileData, content, fields)
    }
}
