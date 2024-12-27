import { execSync } from 'child_process'
import { describe, test, expect, vi, afterEach } from 'vitest'
import { hasUncommittedChanges } from './buildSites'
vi.mock('child_process', () => ({
    execSync: vi.fn(),
}))
describe('hasUncommittedChanges', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })
    test('returns false when there are no uncommitted changes', () => {
        (execSync as ReturnType<typeof vi.fn>).mockReturnValue('')
        const result = hasUncommittedChanges('/path/to/repo')
        expect(result).toBe(false)
    })
    test('returns true for untracked files', () => {
        (execSync as ReturnType<typeof vi.fn>).mockReturnValue('?? file\n')
        const result = hasUncommittedChanges('/path/to/repo')
        expect(result).toBe(true)
    })
    test('returns true for new files added but not committed', () => {
        (execSync as ReturnType<typeof vi.fn>).mockReturnValue('A  file\n')
        const result = hasUncommittedChanges('/path/to/repo')
        expect(result).toBe(true)
    })
    test('returns true for modified files not staged', () => {
        (execSync as ReturnType<typeof vi.fn>).mockReturnValue(' M file\n')
        const result = hasUncommittedChanges('/path/to/repo')
        expect(result).toBe(true)
    })
    test('returns true for modified files staged but not committed', () => {
        (execSync as ReturnType<typeof vi.fn>).mockReturnValue('M  file\n')
        const result = hasUncommittedChanges('/path/to/repo')
        expect(result).toBe(true)
    })
    test('throws an error for invalid git repository', () => {
        (execSync as ReturnType<typeof vi.fn>).mockImplementation(() => {
            throw new Error('Not a git repository')
        })
        expect(() => hasUncommittedChanges('/path/to/repo')).toThrowError('/path/to/repo: not a valid git repository or unable to run git commands')
    })
})
