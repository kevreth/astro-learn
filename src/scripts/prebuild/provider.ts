import * as fs from 'fs'
import * as path from 'path'
import Papa from 'papaparse'
const BUILD = path.join('build', 'us')
export function removeDiacritics(text: string): string {
    const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const replacements: Record<string, string> = {
        'Å': 'A', 'Ø': 'O', 'å': 'a', 'ø': 'o', 'Æ': 'AE', 'æ': 'ae'
    }
    return normalized.split('').map(c => replacements[c] || c).join('')
}
export function sanitize(locality: string): string {
    const cleaned = locality
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\- ]/gi, match => removeDiacritics(match))
        .replace(/ /g, '-')
        .replace(/[^a-z0-9\-]/g, '')
    return cleaned
}
export function groupAndSaveCSV(
    data: any[],
    outputDir: string,
    niche_: string | null
): Record<string, any> {
    const result: Record<string, any> = {}
    const groupColumns = ["Region", "Locality"]
    if (niche_ === null) groupColumns.push("Niche")
    const groupedData = data.reduce((acc, row) => {
        const key = groupColumns.map(col => row[col]).join('|')
        if (!acc[key]) acc[key] = []
        acc[key].push(row)
        return acc
    }, {} as Record<string, any[]>)
    for (const groupKeys in groupedData) {
        const group = groupedData[groupKeys]
        const [region, locality, niche] = groupKeys.split('|')
        const localityClean = sanitize(locality)
        const dirPath = path.join(outputDir, region.replace(/ /g, '-'), localityClean, niche_ || niche)
        const createDirectory = !fs.existsSync(dirPath)
        if (!result[region]) result[region] = {}
        result[region][locality] = {
            createDirectory,
            file: path.join(dirPath.toLowerCase(), "content.csv"),
            data: group
        }
    }
    return result
}
export function executeYamlStructure(data: Record<string, any>): void {
    if (fs.existsSync('../build')) fs.rmSync('../build', { recursive: true })
    fs.mkdirSync('../build', { recursive: true })
    for (const region in data) {
        for (const locality in data[region]) {
            const details = data[region][locality]
            if (details.createDirectory) fs.mkdirSync(path.dirname(details.file), { recursive: true })
            const csvContent = Papa.unparse(details.data)
            fs.writeFileSync(details.file, csvContent)
        }
    }
}
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2)
    if (args.length === 0) {
        console.error('Please provide the path to the CSV file as an argument.')
        process.exit(1)
    }
    const localityPath = args[0]
    const csvContent = fs.readFileSync(localityPath, 'utf-8')
    const localityData = Papa.parse(csvContent, { header: true }).data as any[]
    const yamlData = groupAndSaveCSV(localityData, BUILD, null)
    executeYamlStructure(yamlData)
}
