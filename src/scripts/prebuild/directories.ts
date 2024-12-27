import * as fs from 'fs'
import * as path from 'path'
import {markdownTable} from 'markdown-table'
import Papa from 'papaparse'
import { load, type  LocniData, type LocniRecord, queryLocni } from './locni_data'
//generate content.md and schema.json for directory
interface PostalAddress {
    "@type": "PostalAddress"
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
}
interface LocalBusinessJsonLd {
    "@context": string
    "@type": "LocalBusiness"
    name: string
    url: string
    address: PostalAddress
    telephone: string
    email: string
}
interface DataRow {
    Code: string
    Name: string
    URL: string
    Phone: string
    Email: string
    Street: string
    Locality: string
    Region: string
    Country: string
    Postal: string
  }
interface DataRow_Out {
  Name: string
  URL: string
  Phone: string
  Street: string
  Postal: string
}
export function generateMarkdownTable(data: DataRow_Out[]): string {
  const tableData = data.map(row => [row.Name, row.URL, row.Phone, row.Street, row.Postal])
  const tableHeaders = ['Name', 'URL', 'Phone', 'Street', 'Postal']
  return markdownTable([tableHeaders, ...tableData])
}
export function genJsonLd(name: string, url: string, phone: string, email: string, street: string, locality: string, region: string, country: string, postal: string): LocalBusinessJsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": name,
        "url": url,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": street,
            "addressLocality": locality,
            "addressRegion": region,
            "postalCode": postal,
            "addressCountry": country,
        },
        "telephone": phone,
        "email": email
    }
}
export function dfToMarkdownFrontMatter(rows: DataRow[]): LocalBusinessJsonLd[] {
    const jsonldList: LocalBusinessJsonLd[] = []
    rows.forEach((row) => {
        jsonldList.push(genJsonLd(
            row['Name'], row['URL'], row['Phone'], row['Email'],
            row['Street'], row['Locality'], row['Region'], row['Country'], row['Postal']
        ))
    })
    return jsonldList
}
export function readCsvFile(filePath: string): DataRow[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const results: DataRow[] = []
    Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: (parsedData) => {
            results.push(...parsedData.data as DataRow[])
        }
    })
    return results
}
export function generateCsvDependencies(locniData: LocniRecord, csvFile: string, outputDir: string): void {
    const locality = locniData['proper_locality']
    const region = locniData['proper_region']
    const niche = locniData['plural_organization']
    const data: DataRow[] = readCsvFile(csvFile)
    const markdownTable = generateMarkdownTable(data)
    const frontMatter = dfToMarkdownFrontMatter(data)
    const directoryDir = path.join(outputDir, 'directory')
    const schemaJsonPath = path.join(directoryDir, 'schema.json')
    fs.mkdirSync(directoryDir, { recursive: true })
    fs.writeFileSync(schemaJsonPath, JSON.stringify(frontMatter, null, 2))
    const title = `# ${data.length} ${locality}, ${region} ${niche}`
    const content = title + '\n\n' + markdownTable
    const contentMdPath = path.join(directoryDir, 'content.md')
    fs.writeFileSync(contentMdPath, content)
}
export function findFiles(dir: string, filename: string) {
    const files: string[] = []
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
        const fullPath = path.join(dir, item.name)
        if (item.isDirectory()) {
            files.push(...findFiles(fullPath, filename))
        } else if (item.isFile() && item.name === filename) {
            files.push(fullPath)
        }
    }
    return files
}
export function directory(data:LocniData) {
    const csvFiles = findFiles('pages','content.csv')
    csvFiles.forEach(csv_file => {
        const dirPath = path.dirname(csv_file)
        const pathComponents = dirPath.split('/').slice(1,5)
        const numComponents = pathComponents.length
        if (numComponents != 4) {
            console.log(numComponents, pathComponents)
            process.exit(-1)
        }
        const [country, region, locality, niche] = pathComponents
        if (fs.existsSync(csv_file)) {
            const locniData: LocniRecord = queryLocni(data, country, region, locality, niche)
            generateCsvDependencies(locniData, csv_file, dirPath)
       }
    })
}
if (import.meta.url === `file://${process.argv[1]}`) {
    const data = load()
    directory(data)
}