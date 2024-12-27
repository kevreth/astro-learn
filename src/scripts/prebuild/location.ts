import * as path from "path"
import type {LocniData} from './locni_data'
export abstract class Location {
    createFilename(base: string, paths: string[], filename: string): string {
        return path.join(base, ...paths, filename)
    }
    createFileList(template: string, outputPath: string, dataSource: LocniData): Array<[string, string]> {
        const fileData: Array<[string, string]> = []
        const data = this.getDataSource(dataSource)
        for (const item of data) {
            const content = this.formatContent(template, item)
            this.addToFileList(outputPath, fileData, item, content)
        }
        return fileData
    }
    appendToFileList(outputPath: string, fileData: Array<[string, string]>, content: string, fields: string[]): void {
        const filename = this.createFilename(outputPath, fields, "content.md")
        fileData.push([filename, content])
    }
    abstract getDataSource(data: any): Array<any>
    abstract formatContent(template: string, dataSource: any): string
    abstract addToFileList(outputPath: string, fileData: Array<[string, string]>, item: any, content: string): void
}
