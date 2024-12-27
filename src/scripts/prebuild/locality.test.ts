import { JSDOM } from 'jsdom'
import { loadTemplate } from './library'
import { TestLocation } from './location.test'
import { Locality, LocalityData } from './locality'
import { beforeEach, describe, it, expect } from "vitest"
const TEMPLATE_FILE_PATH = 'src/scripts/prebuild/locality.md'
const SAMPLE_DATA: LocalityData = {
    region: 'ak',
    regionProper: 'Alaska',
    locality: 'momback',
    localityProper: 'Momback',
    niches: ['cpa', 'hvac']
}
export class TestLocality extends TestLocation {
    factory(): Locality {
        return new Locality()
    }
    testFormatContent(sampleData): void {
        const template: string = loadTemplate(TEMPLATE_FILE_PATH)
        const content = this.factory().formatContent(template, sampleData)
        const dom = new JSDOM(content)
        const activeLinks = dom.window.document.querySelectorAll("a.active")
        const activeTexts = Array.from(activeLinks).map(link => link.textContent?.trim() || '')
        expect(activeTexts).toContain('CPA')
        expect(activeTexts).not.toContain('Roofing')
    }
    testAddToFileList(tmpPath: string, sampleData): void {
        const templateContentRegion: string = loadTemplate(TEMPLATE_FILE_PATH)
        const actual = this.factory().createFileList(templateContentRegion, tmpPath, sampleData)
        expect(Array.isArray(actual)).toBe(true)
        expect(actual.length).toBe(1)
        const [filename] = actual[0]
        expect(filename.endsWith("content.md")).toBe(true)
    }
}
describe("Locality Tests", () => {
    const testable = new TestLocality()
    const sampleData = TestLocation.sampleData()
    beforeEach(() => {
        testable.beforeEach()
    })
    it("should testFormatContent", () => {
        testable.testFormatContent(SAMPLE_DATA)
    })
    it("should testAddToFileList", () => {
        testable.testAddToFileList("sdaf", sampleData)
    })
})