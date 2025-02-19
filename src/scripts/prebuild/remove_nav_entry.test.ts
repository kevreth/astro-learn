import { describe, it, expect } from 'vitest'
import { removeNavEntry } from './remove_nav_entry'

const path = '/us/ga/decatur/real-estate-agents/about'
describe('removeNavEntry', () => {
  it('removes the target path from nav1 and nav2', () => {
    const data = {
      nav1: [{ path: '/a' }, { path: path }, { path: '/b' }],
      nav2: [{ path: '/c' }, { path: path }]
    }
    const result = removeNavEntry(path, data)
    expect(result.nav1).toEqual([{ path: '/a' }, { path: '/b' }])
    expect(result.nav2).toEqual([{ path: '/c' }])
  })
  it('handles missing nav1 and nav2', () => {
    const data = { other: [] }
    const result = removeNavEntry(path, data)
    expect(result).toEqual({ other: [] })
  })
  it('returns the original object if no entries match', () => {
    const data = {
      nav1: [{ path: '/x' }, { path: '/y' }],
      nav2: [{ path: '/z' }]
    }
    const result = removeNavEntry(path, data)
    expect(result).toEqual(data)
  })
})
