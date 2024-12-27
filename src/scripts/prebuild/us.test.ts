import { JSDOM } from "jsdom"
import { beforeEach, describe, it, expect } from "vitest"
import { loadTemplate } from "./library"
import { Location } from "./location"
import { TestLocation } from "./location.test.ts"
import { US } from "./us"
const TEMPLATE_FILE_PATH = "src/scripts/prebuild/us.md"
export class TestUS extends TestLocation {
    factory(): Location {
        return new US()
    }
    testFormatContent(sampleData: any): void {
        const template: string = loadTemplate(TEMPLATE_FILE_PATH)
        const active = this.factory().getDataSource(sampleData)
        const content = this.testable.formatContent(template, active[0])
        const dom = new JSDOM(content)
        const document = dom.window.document
        const activeLinks = document.querySelectorAll("a.active")
        const stateId = activeLinks[0].id
        expect(activeLinks.length).toBe(1)
        expect(stateId).toBe("ak")
    }
    testAddToFileList(tmpPath: string, sampleData: any): void {
        const template: string = loadTemplate(TEMPLATE_FILE_PATH)
        const fileList = this.testable.createFileList(template, tmpPath, sampleData)
        const [filename] = fileList[0]
        expect(Array.isArray(fileList)).toBe(true)
        expect(fileList.length).toBe(1)
        expect(filename.endsWith("content.md")).toBe(true)
    }
}
describe("US Tests", () => {
    const testable = new TestUS()
    beforeEach(() => {
        testable.beforeEach()
    })
    it("should get format content", () => {
        testable.testFormatContent(TestLocation.sampleData())
    })
    it("should add to file list", () => {
        testable.testAddToFileList("sdaf",TestLocation.sampleData())
    })
});