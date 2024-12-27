import * as fs from 'fs'
import { type LocniData } from './locni_data'
import path from 'path'
import {getDirectoriesWithUncommittedChanges} from './buildSites'
import { parseLine, devItems } from './createCsv'
const CUSTOM_DIR = 'sitedata/custom/'
export function createCustomCsvs(data: LocniData) {
    const dev1 = getDirectoriesWithUncommittedChanges(CUSTOM_DIR)
    const dev2 = dev1.filter(dir => !fs.existsSync(path.join(dir, 'content.csv')))
    const dev3 = dev2.map(s => s.startsWith(CUSTOM_DIR) ? s.slice(CUSTOM_DIR.length) : s)
    const dev5 = dev3.map(line => parseLine(line))
    devItems(dev5, data)
}
