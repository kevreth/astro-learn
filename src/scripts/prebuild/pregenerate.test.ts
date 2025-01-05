import { describe, it, expect, vi } from 'vitest'
import { join } from 'path'
import fs from 'fs-extra'
// import { load, LocniData } from './locni_data'
// import { generate } from './generate'
// import { directory } from './directories'
// import { processAllTemplates } from './processAllTemplates'
// import { make_data_json } from './mkdatajson'
import * as library from './library'
import * as pregen from './pregenerate'
describe('copyFileCommand', () => {
  it('returns correct FileCommand object', () => {
    const subDir = 'testDir'
    vi.spyOn(fs, 'existsSync' as keyof typeof fs).mockReturnValueOnce(true)
    const result = pregen.copyFileCommand(subDir)
    expect(result).toEqual({ targetFile: join(subDir, 'index.astro'), exists: true })
  })
})
describe('copyFileCommands', () => {
  it('returns an array of FileCommand objects', () => {
    const dir = 'testDir'
    const entries: string[] = ['subDir1', 'subDir2']
    vi.spyOn(library, 'walkSync').mockReturnValueOnce(entries)
    vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    const result = pregen.copyFileCommands(dir)
    expect(result).toHaveLength(entries.length)
    expect(result[0]).toEqual({ targetFile: join(entries[0], 'index.astro'), exists: true })
  })
})
describe('copyFiles', () => {
  it('copies files correctly', () => {
    const fileCommands: Array<{ targetFile: string; exists: boolean }> = [{ targetFile: 'file1.astro', exists: false }, { targetFile: 'file2.astro', exists: true }]
    const indexFile = 'index.astro'
    const copySpy = vi.spyOn(fs, 'copyFileSync' as keyof typeof fs).mockImplementation(() => {})
    pregen.copyFiles(fileCommands, indexFile)
    expect(copySpy).toHaveBeenCalledWith('index.astro', 'file1.astro')
    expect(copySpy).toHaveBeenCalledTimes(1)
  })
})
// describe('copyIndexAstroToSubdirectories', () => {
//   it('copies index.astro to all subdirectories', () => {
//     const dir = 'testDir'
//     const indexFile = 'index.astro'
//     const fileCommands = [{ targetFile: 'subDir1/index.astro', exists: false }]
//     const copySpy1 = vi.spyOn(pregen, 'copyFileCommands').mockImplementation(() => fileCommands)
//     const copySpy2 = vi.spyOn(pregen, 'copyFiles')
//     pregen.copyIndexAstroToSubdirectories(dir, indexFile)
//     expect(copySpy1).toHaveBeenCalled()
//     expect(copySpy2).toHaveBeenCalled()
//   })
// })
describe('recreatePagesDirectory', () => {
  it('recreates the pages directory correctly', () => {
    const removeSpy = vi.spyOn(fs, 'removeSync' as keyof typeof fs).mockImplementation(() => {})
    const mkdirSpy = vi.spyOn(fs, 'mkdirSync' as keyof typeof fs).mockImplementation(() => {})
    const copySpy = vi.spyOn(fs, 'copySync' as keyof typeof fs).mockImplementation(() => {})
    pregen.recreatePagesDirectory()
    expect(removeSpy).toHaveBeenCalledWith('./pages')
    expect(mkdirSpy).toHaveBeenCalledWith('./pages')
    expect(copySpy).toHaveBeenCalledWith('./sites', './pages', { dereference: true })
  })
})
// describe('main', () => {
//   it('executes the main workflow correctly', () => {
//     const baseUrl = 'http://example.com'
//     const indexFile = 'pages/index.astro'
//     const data: LocniData = load()
//     const target = 'pages/'
//     const recreateSpy = vi.spyOn(pregen as any, 'recreatePagesDirectory').mockImplementation(() => {})
//     const generateSpy = vi.spyOn(generate as any, 'generate').mockImplementation(() => {})
//     const directorySpy = vi.spyOn(directory as any, 'directory').mockImplementation(() => {})
//     const processSpy = vi.spyOn(processAllTemplates as any, 'processAllTemplates').mockImplementation(() => {})
//     const copySpy = vi.spyOn(pregen as any, 'copyIndexAstroToSubdirectories').mockImplementation(() => {})
//     const makeDataSpy = vi.spyOn(make_data_json as any, 'make_data_json').mockImplementation(() => {})
//     pregen.main(baseUrl, indexFile, data, target)
//     expect(recreateSpy).toHaveBeenCalled()
//     expect(generateSpy).toHaveBeenCalledWith(target + 'us', data)
//     expect(directorySpy).toHaveBeenCalledWith(data)
//     expect(processSpy).toHaveBeenCalledWith(data)
//     expect(copySpy).toHaveBeenCalledWith(target, indexFile)
//     expect(makeDataSpy).toHaveBeenCalledWith(baseUrl, target)
//   })
// })
