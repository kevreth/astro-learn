import * as path from "path"
import { expect, it, beforeEach, describe, vitest } from "vitest"
import { AbstractTest } from "./abstract_test"
import {type LocniData} from './locni_data'
import {Location} from './location'
export abstract class TestLocation extends AbstractTest<Location> {
    public static sampleData(): LocniData {
        return {
            niches: {"cpa": {
                urls: {'bbb': ['']},
                proper_niche: "CPA",
                plural_niche: 'CPAs',
                proper_organization: 'CPA Firm',
                plural_organization: 'CPA Firms',
                warning_terms: ['string[]'],
                disqualify: ['string[]]'],
                discriminator: ['string[]']
            }},
            regions: {
                ak: {
                    pop: 0,
                    localities: {
                        adak: {
                            pop: 160,
                            proper: "Adak",
                            niches: []
                        },
                        momback: {
                            pop: 16450,
                            proper: "Momback",
                            niches: ["hvac", "cpa"]
                        }
                    },
                    proper: "Alaska"
                },
                al: {
                    localities: {
                        abbeville: {
                            pop: 2361,
                            proper: "Abbeville",
                            niches: []
                        }
                    },
                    pop: 0,
                    proper: "Alabama"
                }
            }
        }
    }
    testCreateFilename() {
        const base = "/base"
        const paths = ["folder1", "folder2"]
        const filename = "test.txt"
        const result = this.testable.createFilename(base, paths, filename)
        const expected = path.join(base, "folder1", "folder2", "test.txt")
        expect(result).toBe(expected)
    }
    abstract testFormatContent(sampleData: LocniData): void
    abstract testAddToFileList(tmpPath: string, sampleData: LocniData): void
}
describe("Region Tests", () => {
    beforeEach(() => {
        
    })
    it("should test iteration", () => {
        expect(true).toBe(true)
    })
})
