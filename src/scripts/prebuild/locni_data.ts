import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import Parser from "papaparse"
type ActiveNicheType = string[]
type ActiveLocalityType = Record<string, ActiveNicheType>
type ActiveRegionsType = Record<string, ActiveLocalityType>
interface LocationData {
    pop: number
    proper: string
}
interface RegionData extends LocationData {
    localities?: Record<string, Omit<LocalityData, "region">>
}
export interface LocalityData extends LocationData {
    niches:string[]
}
export interface NicheData {
    urls: Record<string, string[]>
    proper_niche: string
    plural_niche: string
    proper_organization: string
    plural_organization: string
    warning_terms: string[]
    disqualify: string[]
    discriminator: string[]
  }
type LocalityDict = Record<string, LocalityData>
type RegionDict = Record<string, RegionData>
export type Localities = Record<string, LocalityDict>
type Niches = Record<string, NicheData>
export interface LocniData {
    niches: Niches
    regions: RegionDict
  }
function loadRegions(csvFilePath: string): RegionDict {
    const csvData = fs.readFileSync(csvFilePath, "utf8")
    const parsedData = Parser.parse(csvData, { header: true, skipEmptyLines: true })
    if (parsedData.errors.length > 0) {
        throw new Error(`CSV parsing errors: ${parsedData.errors.map(e => e.message).join(", ")}`)
    }
    const sortedData = parsedData.data.sort((a: any, b: any) => a.region.localeCompare(b.region) || a.proper.localeCompare(b.proper))
    const regions: RegionDict = {}
    for (const row of sortedData as any[]) {
        const { region, pop, proper } = row
        regions[region] = { pop: parseInt(pop, 10), proper:proper}
    }
    return regions
}
function loadLocalities(csvFilePath: string, active:ActiveRegionsType): Localities {
  const csvData = fs.readFileSync(csvFilePath, "utf8")
  const parsedData = Parser.parse(csvData, { header: true, skipEmptyLines: true })
  if (parsedData.errors.length > 0) {
    throw new Error(`CSV parsing errors: ${parsedData.errors.map(e => e.message).join(", ")}`)
  }
  const tree: Localities = {}
  for (const row of parsedData.data as any[]) {
    const { locality, region, pop, proper } = row
    if (!tree[region]) {
      tree[region] = {}
    }
    const niches = active[region]?.[locality] || []
    tree[region][locality] = { pop: parseInt(pop, 10), proper: proper, niches: niches }
  }
  return tree
}
function loadNiches(directory: string): Niches {
    const files = fs.readdirSync(directory)
    const niches: Record<string, NicheData> = {}
    for (const file of files) {
        if (file.endsWith('.yaml')) {
            const key = path.basename(file, '.yaml')
            const filePath = path.join(directory, file)
            const content = fs.readFileSync(filePath, 'utf8')
            const data = yaml.load(content) as NicheData
            niches[key] = data
        }
    }
    return niches
}
export function loadAll(dirpath_niche: string, filepath_region: string, filepath_locality: string, active_path:string): LocniData {
  const active = createDirectoryStructure(active_path)
  const niches = loadNiches(dirpath_niche)
  const regions = loadRegions(filepath_region)
  const localitiesTree = loadLocalities(filepath_locality, active)
  for (const [regionKey, localities] of Object.entries(localitiesTree)) {
    if (!regions[regionKey]) {
      let regionValue = { 'pop':0, 'proper':'' }
      regions[regionKey] = regionValue
    }
    regions[regionKey].localities = {
      ...regions[regionKey].localities,
      ...localities
    }
  }
  const programOutput: LocniData = {
    niches,
    regions
  }
  return programOutput
}
export interface LocniRecord {
  business: string
  country:string,
  region:string,
  proper_region:string,
  locality:string,
  proper_locality:string,
  niche:string,
  proper_niche:string,
  plural_niche:string,
  proper_organization:string,
  plural_organization:string
}
export function queryLocni(data:LocniData, country:string, region:string, locality:string, niche:string): LocniRecord {
  const niche_ = data.niches[niche]
  const region_ = data.regions[region]
  const locality_ = region_?.['localities']?.[locality]
  let retval: LocniRecord
  try {
    retval = {
      'business': 'Inquirita',
      "country": country,
      "region": region,
      "proper_region": region_?.['proper']??'',
      "locality": locality,
      "proper_locality": locality_?.['proper']??'',
      "niche": niche,
      "proper_niche": niche_?.['proper_niche']??'',
      "plural_niche": niche_?.['plural_niche']??'',
      "proper_organization": niche_?.['proper_organization']??'',
      "plural_organization": niche_?.['plural_organization']??''
    }
  }
  catch(e) {
    console.error(country,region,locality,e)
    process.exit(0)
  }
  return retval
}
export function queryLocality(data:LocniData, country:string, region:string, locality:string) {
  const region_ = data.regions[region]
  const locality_ = region_?.['localities']?.[locality]
  return {
    "country": country,
    "region": region,
    "proper_region": region_['proper'],
    "locality": locality,
    "proper_locality": locality_?.['proper'],
  }
}
export function queryRegion(data:LocniData, country:string, region:string) {
  const region_ = data.regions[region]
  return {
    "country": country,
    "region": region,
    "proper_region": region_['proper']
  }
}
export function createDirectoryStructure(root: string): ActiveRegionsType {
    const structure: ActiveRegionsType = {}
    const regions = fs.readdirSync(root)
    regions.forEach(region => {
        const regionPath = path.join(root, region)
        if (fs.lstatSync(regionPath).isDirectory()) {
            structure[region] = {}
            const localities = fs.readdirSync(regionPath)
            localities.forEach(locality => {
                const localityPath = path.join(regionPath, locality)
                if (fs.lstatSync(localityPath).isDirectory()) {
                    structure[region][locality] = []
                    const niches = fs.readdirSync(localityPath)
                    niches.forEach(niche => {
                        const nichePath = path.join(localityPath, niche)
                        if (fs.lstatSync(nichePath).isDirectory()) {
                            structure[region][locality].push(niche)
                        }
                    })
                }
            })
        }
    })
    return structure
}
export function load(): LocniData {
  return loadAll('src/niches/', 'data/config/region.csv', 'data/config/locality.csv', 'sites/us/')
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const data = load()
  // console.log(stringify(data))
  console.log(queryRegion(data,'us','ca'))
  console.log(queryLocality(data,'us','ca','covina'))
  console.log(queryLocni(data,'us','ca','covina','hvac'))
}