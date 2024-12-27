import { join } from 'path'
import {ensurePathExists} from './createDirectoryPath'
import * as fs from 'fs'
import Papa from 'papaparse'
import path from 'path'
import { type LocniData, type LocniRecord, queryLocni } from './locni_data'
export interface DevFileResult {
    locni: Record_
    locniData: LocniRecord
    providerResults: Record<string, any>[]
}
export type Record_ = {
    Country: string
    Region: string
    Locality: string
    Niche: string
    [key: string]: string
}
const COLUMNS = ['Name','URL','Phone','Street','Locality','Region','Postal','Country','Niche']
export function devItems(dev: { Country: string; Region: string; Locality: string; Niche: string }[], data: LocniData) {
    const devFiles = devFile(dev, data)
    devFiles.forEach(item => {
        devFileItem(item)
    })
}
export function parseLine(line: string) {
    const [Country, Region, Locality, Niche] = line.split('/')
    return { Country, Region, Locality, Niche }
}
export function getMatchingRecords(
    parsedData: Record_[],
    country: string,
    region: string,
    locality: string,
    niche: string
): Record_[] {
    return parsedData.filter(
        (record) =>
            record.Country === country &&
            record.Region === region &&
            record.Locality === locality &&
            record.Niche === niche
    )
}
export function devFileItem(item: DevFileResult) {
    const { Country, Region, Locality, Niche } = item.locni
    const path = join('sites', Country, Region, Locality, Niche)
    const csv = Papa.unparse(item.providerResults)
    const file = join(path, 'content.csv')
    ensurePathExists(path)
    fs.writeFileSync(file, csv, 'utf8')
}
export function devFile(dev: Record_[], data: LocniData): DevFileResult[] {
    const resultsCollection: DevFileResult[] = []
    const rows = concatenateCSVsFromDirectory(COLUMNS,'providers')
    console.log('records: ' + rows.length)
    dev.forEach(locni => {
        const { Country, Region, Locality, Niche } = locni
        const locniData: LocniRecord = queryLocni(data, Country, Region, Locality, Niche)
        const country_ = 'US'
        const region_ = Region.toUpperCase()
        const locality_ = locniData.proper_locality
        const providerResults = getMatchingRecords(rows, country_, region_, locality_, Niche)
        console.log(Niche + ' results: ' + providerResults.length)
        resultsCollection.push({
            locni: { Country, Region, Locality, Niche },
            locniData,
            providerResults
        })
    })
    return resultsCollection
}
export function concatenateCSVsFromDirectory(commonColumns: string[], directoryPath: string): Record_[] {
    const filePaths = fs.readdirSync(directoryPath).filter(file => file.endsWith('.csv')).map(file => path.join(directoryPath, file));
    const concatenatedData: Record_[] = [];
    filePaths.forEach(filePath => {
        const csvData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = Papa.parse(csvData, { header: true }).data;
        let niche = path.basename(filePath, path.extname(filePath));
        niche = niche.substring(0, niche.lastIndexOf('.'));
        parsedData.forEach((record: any) => {
            const filteredRecord: any = {};
            commonColumns.forEach(column => {
                if (column === 'Niche' && (!record['Niche'] || record['Niche'].trim() === '')) {
                    filteredRecord['Niche'] = niche;
                } else if (column in record) {
                    filteredRecord[column] = record[column];
                }
            });
            concatenatedData.push(filteredRecord);
        });
    });
    return concatenatedData;
}