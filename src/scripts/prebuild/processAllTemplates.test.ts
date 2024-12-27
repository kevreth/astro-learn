import { describe, it, expect } from 'vitest'
import { processPaths } from './processAllTemplates'; // Adjust the import path as needed
describe('processPaths', () => {
    it('should process paths and return unique countries, regions, and localities', () => {
        const paths = [
            'sites/USA/California/LosAngeles/content.csv',
            'sites/USA/California/SanFrancisco/content.csv',
            'sites/Canada/Ontario/Toronto/content.csv',
            'sites/Canada/Ontario/Ottawa/content.csv',
            'sites/Canada/BritishColumbia/Vancouver/content.csv',
            'sites/USA/California/LosAngeles/content.csv' // Duplicate
        ]
        const result = processPaths(paths)
        expect(result.countries).toEqual(['USA', 'Canada'])
        expect(result.regions).toEqual([
             'USA/California' ,
             'Canada/Ontario' ,
             'Canada/BritishColumbia' 
        ])
        expect(result.localities).toEqual([
             'USA/California/LosAngeles' ,
             'USA/California/SanFrancisco' ,
             'Canada/Ontario/Toronto' ,
             'Canada/Ontario/Ottawa' ,
             'Canada/BritishColumbia/Vancouver'
        ])
    })
    it('should handle an empty input array', () => {
        const paths: string[] = []
        const result = processPaths(paths)
        expect(result.countries).toEqual([])
        expect(result.regions).toEqual([])
        expect(result.localities).toEqual([])
    })
    it('should handle duplicate paths correctly', () => {
        const paths = [
            'sites/USA/California/LosAngeles/content.csv',
            'sites/USA/California/LosAngeles/content.csv',
            'sites/USA/California/LosAngeles/content.csv'
        ]
        const result = processPaths(paths)
        expect(result.countries).toEqual(['USA'])
        expect(result.regions).toEqual([ 'USA/California' ])
        expect(result.localities).toEqual([ 'USA/California/LosAngeles' ])
    })
})
