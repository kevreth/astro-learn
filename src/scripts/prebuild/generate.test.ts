import { describe, it, expect, vi } from 'vitest'
import { get_path, generate } from './generate'
import { type LocniData } from './locni_data'
import { writeFile, loadTemplate } from './library'
vi.mock('./library', () => ({
    loadTemplate: vi.fn(),
    writeFile: vi.fn()
}))
vi.mock('./us', () => ({ US: vi.fn().mockImplementation(() => ({
    createFileList: vi.fn(() => [['us_file', 'us_content']])
})) }))
vi.mock('./region', () => ({ Region: vi.fn().mockImplementation(() => ({
    createFileList: vi.fn(() => [['region_file', 'region_content']])
})) }))
vi.mock('./locality', () => ({ Locality: vi.fn().mockImplementation(() => ({
    createFileList: vi.fn(() => [['locality_file', 'locality_content']])
})) }))
describe('get_path', () => {
    it('should return the correct path for a given entity', () => {
        const entity = 'us'
        const expectedPath = 'src/scripts/prebuild/us.md'
        expect(get_path(entity)).toBe(expectedPath)
    })
})
describe('generate', () => {
    it('should generate files and call writeFile with correct arguments', () => {
        const outputPath = 'output'
        const data = {} as LocniData
        generate(outputPath, data)
        expect(loadTemplate).toHaveBeenCalledWith('src/scripts/prebuild/us.md')
        expect(loadTemplate).toHaveBeenCalledWith('src/scripts/prebuild/regions.md')
        expect(loadTemplate).toHaveBeenCalledWith('src/scripts/prebuild/locality.md')
        expect(writeFile).toHaveBeenCalledWith('us_file', 'us_content')
        expect(writeFile).toHaveBeenCalledWith('region_file', 'region_content')
        expect(writeFile).toHaveBeenCalledWith('locality_file', 'locality_content')
    })
})
