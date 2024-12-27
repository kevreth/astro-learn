import { describe, it, expect, vi } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'
import { generateMarkdownTable, genJsonLd, dfToMarkdownFrontMatter, findFiles } from './directories'
describe('generateMarkdownTable', () => {
  it('should generate a markdown table', () => {
    const data = [{Name:'Test',URL:'https://example.com',Phone:'123456789',Street:'123 Main St',Postal:'12345'}]
    const table = generateMarkdownTable(data)
    expect(table).toContain('| Name | URL                 | Phone     | Street      | Postal |')
    expect(table).toContain('| Test | https://example.com | 123456789 | 123 Main St | 12345  |')
  })
})
describe('genJsonLd', () => {
  it('should return valid JSON-LD', () => {
    const jsonLd = genJsonLd('Test','https://example.com','123','test@example.com','Main','Locality','Region','Country','12345')
    expect(jsonLd).toHaveProperty('@context','https://schema.org')
    expect(jsonLd).toHaveProperty('name','Test')
  })
})
describe('dfToMarkdownFrontMatter', () => {
  it('should convert rows to JSON-LD objects', () => {
    const rows=[{Code:'001',Name:'Test',URL:'https://example.com',Phone:'123',Email:'test@example.com',Street:'Main',Locality:'Loc',Region:'Reg',Country:'Country',Postal:'12345'}]
    const result = dfToMarkdownFrontMatter(rows)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Test')
  })
})
// vi.mock('fs', () => {
//   return {
//     ...fs,
//     readFileSync: vi.fn()
//   }
// })
// describe('readCsvFile', () => {
//   const csvContent="Name,URL,Phone,Email,Street,Locality,Region,Country,Postal\nTest,https://example.com,123,test@example.com,Main,Loc,Reg,Country,12345"
//   it('should read CSV file', () => {
//     (fs.readFileSync as any).mockReturnValue(csvContent)
//     const data=readCsvFile('test.csv')
//     expect(data.length).toBe(1)
//     expect(data[0].Name).toBe('Test')
//   })
// })
// describe('generateCsvDependencies', () => {
//   const locniData={proper_locality:'Loc',proper_region:'Reg',plural_organization:'Companies'} as any
//   const csvContent='Name,URL,Phone,Email,Street,Locality,Region,Country,Postal\nTest,https://example.com,123,test@example.com,Main,Loc,Reg,Country,12345'
//   const outputDir='test_output'
//   const csvPath='test.csv'
//   beforeAll(()=>{
//     vi.spyOn(fs,'readFileSync').mockReturnValue(csvContent)
//     vi.spyOn(fs,'mkdirSync').mockImplementation(()=>{})
//     vi.spyOn(fs,'writeFileSync').mockImplementation(()=>{})
//   })
//   it('should generate files', async () => {
//     await generateCsvDependencies(locniData,csvPath,outputDir)
//     expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
//   })
// })
vi.mock('fs', () => {
  const actualFs = vi.importActual('fs')
  return {
    ...actualFs,
    readdirSync: vi.fn()
  }
})
describe('findFiles',()=>{
  it('should find files with given name',()=>{
    (fs.readdirSync as vi.Mock).mockReturnValue([{name:'content.csv',isDirectory:()=>false,isFile:()=>true}] as any)
    const result = findFiles('pages','content.csv')
    expect(result).toEqual([path.join('pages','content.csv')])
  })
})
// vi.mock('fs', async (importOriginal) => {
//   const actual = await importOriginal()
//   return {
//     ...actual,
//     readdirSync: vi.fn(),
//     existsSync: vi.fn(),
//     readFileSync: vi.fn(),
//     mkdirSync: vi.fn(),
//     writeFileSync: vi.fn(),
//   }
// })
// describe('directory',()=>{
//   it('should run directory function', async ()=>{
//     const fs = await import('fs')
//     ;(fs.readdirSync as vi.Mock).mockReturnValue([{name:'content.csv',isDirectory:()=>false,isFile:()=>true}] as any)
//     ;(fs.existsSync as vi.Mock).mockReturnValue(true)
//     ;(fs.readFileSync as vi.Mock).mockReturnValue('Name,URL,Phone,Email,Street,Locality,Region,Country,Postal\nTest,https://example.com,123,test@example.com,Main,Loc,Reg,Country,12345')
//     ;(fs.mkdirSync as vi.Mock).mockImplementation(()=>{})
//     ;(fs.writeFileSync as vi.Mock).mockImplementation(()=>{})
//     directory('us/tx/austin/cpa')
//     expect(fs.writeFileSync).toHaveBeenCalled()
//   })
// })
