import * as fs from 'fs'
import { type LocniData } from './locni_data'
import path from 'path'
import {getDirectories} from './buildSites'
import { parseLine, devItems } from './createCsv'
const PROD_DIR = 'pages'
export function createProdCsvs(data: LocniData) {
    const dev1 = getDirectories(PROD_DIR)
    const dev2 = dev1.filter(dir => !fs.existsSync(path.join(dir, 'content.csv')))
    const dev3 = dev2.map(s => s.startsWith(PROD_DIR) ? s.slice(PROD_DIR.length) : s)
    const dev5 = dev3.map(line => parseLine(line))
    devItems(dev5, data)
}
