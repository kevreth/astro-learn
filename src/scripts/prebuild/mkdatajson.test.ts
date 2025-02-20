
import { describe, it, expect } from 'vitest'
import { mergeDicts } from './mkdatajson'
function testMergeDicts(target: { a: any; b: any; }, source: { b: any; c: any; }, expected: { a: any; b: any; c: any; }) {
    mergeDicts(target, source)
    expect(target).toEqual(expected)
}
describe('mergeDicts', () => {
    it('should merge simple objects', () => {
        const target = { a: 1, b: 2 }
        const source = { b: 3, c: 4 }
        const expected = { a: 1, b: 3, c: 4 }
        testMergeDicts(target, source, expected)
    })
    it('should handle nested objects', () => {
        const target = { a: 1, b: { x: 10 } }
        const source = { b: { y: 20 }, c: 4 }
        const expected = { a: 1, b: { x: 10, y: 20 }, c: 4 }
        testMergeDicts(target, source, expected)
    })
    it('should overwrite primitive values with objects', () => {
        const target = { a: 1, b: 2 }
        const source = { b: { x: 10 }, c: 4 }
        const expected = { a: 1, b: { x: 10 }, c: 4 }
        testMergeDicts(target, source, expected)
    })
    it('should not overwrite objects with primitive values', () => {
        const target = { a: 1, b: { x: 10 } }
        const source = { b: 2, c: 4 }
        const expected = { a: 1, b: 2, c: 4 }
        testMergeDicts(target, source, expected)
    })
    it('should handle null values in source', () => {
        const target = { a: 1, b: { x: 10 } }
        const source = { b: null, c: 4 }
        const expected = { a: 1, b: { x: 10 }, c: 4 }
        testMergeDicts(target, source, expected)
    })
    it('should handle empty arrays in source', () => {
        const target = { a: 1, b: { x: 10 } }
        const source = { b: [], c: 4 }
        const expected = { a: 1, b: [], c: 4 }
        testMergeDicts(target, source, expected)
    })
    it('should handle non-empty arrays in source', () => {
        const target = { a: 1, b: { x: 10 } }
        const source = { b: [2], c: 4 }
        const expected = { a: 1, b: [2], c: 4 }
        testMergeDicts(target, source, expected)
    });    
})
import { vi } from 'vitest'
import fs from 'fs'
import _ from 'lodash'
import {convertMarkdownToHtml,addTableId,getContentHtml,createBreadCrumbs} from './mkdatajson'
describe('mergeDicts', () => {
    it('merges two objects', () => {
        const target = { a: 1 }
        const source = { b: 2 }
        mergeDicts(target, source)
        expect(target).toEqual({ a: 1, b: 2 })
    })
})
describe('convertMarkdownToHtml', () => {
    it('converts existing markdown file to html', () => {
        vi.spyOn(fs, 'existsSync').mockReturnValue(true)
        vi.spyOn(fs, 'readFileSync').mockReturnValue('# Title')
        expect(convertMarkdownToHtml('test.md')).toContain('<h1>Title</h1>')
    })
    it('returns empty string if file does not exist', () => {
        vi.spyOn(fs, 'existsSync').mockReturnValue(false)
        expect(convertMarkdownToHtml('test.md')).toBe('')
    })
})
describe('addTableId', () => {
    it('adds id to first table', () => {
        const html = '<table><tr><td>data</td></tr></table>'
        expect(addTableId(html)).toContain('id="static-table"')
    })
    it('no table no id', () => {
        const html = '<div>No table</div>'
        expect(addTableId(html)).not.toContain('static-table')
    })
})
describe('getContentHtml', () => {
    it('returns content html', () => {
        vi.spyOn(fs, 'existsSync').mockReturnValue(true)
        vi.spyOn(fs, 'readFileSync').mockReturnValue('# Title')
        expect(getContentHtml('someDir')).toContain('<h1>Title</h1>')
    })
    // it('no md file', () => {
    //     vi.spyOn(fs, 'existsSync').mockReturnValue(false)
    //     expect(getContentHtml('someDir')).toBe('')
    // })
})
describe('createBreadCrumbs', () => {
    it('creates breadcrumb html', () => {
        const breadcrumbs = { '/path': 'Name' }
        expect(createBreadCrumbs('/path', breadcrumbs)).toContain('breadcrumb-item')
    })
})
import { removeNavEntry } from './mkdatajson'

const path = '/us/ga/decatur/real-estate-agents/about'
describe('removeNavEntry', () => {
  it('removes the target path from nav1 and nav2', () => {
    const data = {
      nav: [{ path: '/a' }, { path: path }, { path: '/b' }]
    }
    const result = removeNavEntry(path, data)
    expect(result.nav).toEqual([{ path: '/a' }, { path: '/b' }])
  })
  it('handles missing nav1 and nav2', () => {
    const data = { other: [] }
    const result = removeNavEntry(path, data)
    expect(result).toEqual({ other: [] })
  })
  it('returns the original object if no entries match', () => {
    const data = {
      nav: [{ path: '/x' }, { path: '/y' }]
    }
    const result = removeNavEntry(path, data)
    expect(result).toEqual(data)
  })
})