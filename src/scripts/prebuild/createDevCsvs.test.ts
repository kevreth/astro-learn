import { describe, it, expect, vi } from 'vitest'
import * as fs from 'fs'
import { createDevCsvs } from './createDevCsvs'
import type { LocniData } from './locni_data'
import { parseLine, devItems } from './createCsv'
describe('createDevCsvs', () => {
    it('should read and process dev.txt correctly', () => {
        const mockData = {} as LocniData
        const mockContent = 'line1\nline2\nline3'
        const mockParsedLines = [
            { Country: 'line1', Region: undefined, Locality: undefined, Niche: undefined },
            { Country: 'line2', Region: undefined, Locality: undefined, Niche: undefined },
            { Country: 'line3', Region: undefined, Locality: undefined, Niche: undefined }
        ]
        vi.mock('fs', () => ({
            readFileSync: vi.fn(() => 'line1\nline2\nline3')
        }))
        vi.mock('./createCsv', () => ({
            parseLine: vi.fn(line => {
                const [Country, Region, Locality, Niche] = line.split('/')
                return { Country, Region, Locality, Niche }
            }),
            devItems: vi.fn()
        }))
        createDevCsvs(mockData)
        expect(fs.readFileSync).toHaveBeenCalledWith('src/dev.txt', 'utf-8')
        expect(parseLine).toHaveBeenCalledTimes(3)
        expect(parseLine).toHaveBeenCalledWith('line1')
        expect(parseLine).toHaveBeenCalledWith('line2')
        expect(parseLine).toHaveBeenCalledWith('line3')
        expect(devItems).toHaveBeenCalledWith(mockParsedLines, mockData)
        vi.restoreAllMocks()
    })
})
