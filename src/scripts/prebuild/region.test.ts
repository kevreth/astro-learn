import { TestLocation } from './location.test'
import { beforeEach, describe, it, expect } from "vitest"
import { Region, iteration, isActive, localityEntries, createContent } from './region'
import { loadTemplate } from './library'
import { JSDOM } from 'jsdom'
const TEMPLATE_FILE_PATH = 'src/scripts/prebuild/regions.md'
const EXPECTED = '            <li><a class="active" id="momback" href="/us/ak/momback">Momback</a></li>\n'
class TestRegion extends TestLocation {
    factory(): Region {
        return new Region()
    }
    testIteration(): void {
        const actual = iteration('ak', 'momback', 'Momback', true)
        expect(actual).toBe(EXPECTED)
    }
    testIsActive(sampleData): void {
        const localityData = sampleData.regions['ak']['localities']
        const actual2 = isActive(localityData,'momback')
        expect(actual2).toEqual(true)
        const actual1 = isActive(localityData,'adak')
        expect(actual1).toEqual(false)
    }
    testLocalityEntries(sampleData): void {
        const localityData = sampleData.regions['ak']['localities']
        const actual = localityEntries('ak', localityData)
        expect(actual.length).toBe(2)
        expect(actual).toContain(EXPECTED)
    }
    testCreateContent(): void {
        const templateContentRegion: string = loadTemplate(TEMPLATE_FILE_PATH)
        const actual = createContent(templateContentRegion, 'LOCALITIES', 'Illinois')
        expect(actual).toContain('LOCALITIES')
        expect(actual).toContain('Illinois')
    }
    testFormatContent(sampleData): void {
        const templateContentRegion: string = loadTemplate(TEMPLATE_FILE_PATH)
        const firstRegionKey = Object.keys(sampleData.regions)[0]
        const firstRegionData = { [firstRegionKey]: sampleData.regions[firstRegionKey] }
        const actual = this.factory().formatContent(templateContentRegion, firstRegionData)
        const dom = new JSDOM(actual)
        const activeLinks = Array.from(dom.window.document.querySelectorAll('a.active'))
        const activeTexts = activeLinks.map(link => link.textContent)
        expect(actual).toContain('Adak')
        expect(activeTexts).not.toContain('Adak')
        expect(activeTexts).toContain('Momback')
    }
    testAddToFileList(tmpPath, sampleData): void {
        const templateContentRegion: string = loadTemplate(TEMPLATE_FILE_PATH)
        const actual = this.factory().createFileList(templateContentRegion, tmpPath, sampleData)
        expect(actual.length).toBe(1)
    }
}
describe("Region Tests", () => {
    const testable = new TestRegion()
    const sampleData = TestLocation.sampleData()
    beforeEach(() => {
        testable.beforeEach()
    })
    it("should test iteration", () => {
        testable.testIteration()
    })
    it("should test testIsActive", () => {
        testable.testIsActive(sampleData)
    })
    it("should testLocalityEntries", () => {
        testable.testLocalityEntries(sampleData)
    })
    it("should testCreateContent", () => {
        testable.testCreateContent()
    })
    it("should get format content", () => {
        testable.testFormatContent(sampleData)
    })
    it("should add to file list", () => {
        testable.testAddToFileList("sdaf", sampleData)
    })
})
