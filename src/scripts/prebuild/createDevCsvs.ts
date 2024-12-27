import * as fs from 'fs'
import type  { LocniData} from './locni_data'
import { parseLine, devItems } from './createCsv'
export function createDevCsvs(data: LocniData) {
    const content = fs.readFileSync('sitedata/dev.txt', 'utf-8')
    const dev = content.split('\n').map(line => {return parseLine(line)})
    devItems(dev, data)
}
