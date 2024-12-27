import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { marked } from 'marked'
import {load} from 'cheerio'
import { URL } from 'url'
import _ from 'lodash'
export type Dict = { [key: string]: any }
export function mergeDicts(target: any, source: any): void {
  for (const key in source) {
    if (Array.isArray(source[key]) || typeof source[key] !== 'object') {
      target[key] = source[key]
    } else {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {}
      }
      mergeDicts(target[key], source[key])
    }
  }
}
export function convertMarkdownToHtml(mdFile: string): string {
  let retval = ''
  if (fs.existsSync(mdFile)) {
    const mdContent = fs.readFileSync(mdFile, 'utf-8')
    retval = marked(mdContent) as string
  }
  return retval
}
export function addTableId(content: string): string {
  const $ = load(content)
  const firstTable = $('table').first()
  if (firstTable) {
    firstTable.attr('id', 'static-table')
  }
  // Add rel="nofollow" to all <a> tags
  $('a').each((_, element) => {
    const link = $(element);
    link.attr('rel', 'nofollow sponsored');
  });
  return $.html()
}
export function getContentHtml(directory: string) {
  const mdFile = path.join(directory, 'content.md')
  let html = convertMarkdownToHtml(mdFile)
  html = addTableId(html)
  return html.replace(/\n/g, '')
}
export function createBreadCrumbs(filePath: string, breadcrumbHash: any): string {
  const pathParts = filePath.replace(/^\/+|\/+$/g, '').split('/')
  if (pathParts.length === 0 || (pathParts.length === 1 && pathParts[0] === '')) {
    return ''; // Return no breadcrumb in homepage
  }
  const breadcrumbCollector: string[] = []
  for (let index = 0; index < pathParts.length + 1; index++) {
    const path = `/${pathParts.slice(0, index).join('/')}`
    const canon = breadcrumbHash[path]
    const isLastItem = index === pathParts.length - 1 + 1
    let itemTemplate: string
    if (canon) {
     if (isLastItem) {
        itemTemplate = `<li class="breadcrumb-item">${canon}</li>`; // No hyperlink for the last item
      } else {
        itemTemplate = `<li class="breadcrumb-item"><a href="${path}">${canon}</a></li>`
      }
     if (isLastItem) {
        itemTemplate = `<li class="breadcrumb-item">${canon}</li>`; // No hyperlink for the last item
      } else {
        itemTemplate = `<li class="breadcrumb-item"><a href="${path}">${canon}</a></li>`
      }
      breadcrumbCollector.push(itemTemplate)
    }
  }
  const prefix =
    '<ol class="breadcrumb">'
  const suffix = '</ol>'
  return prefix + breadcrumbCollector.join('') + suffix
}
export function addBreadCrumbItem(
  breadcrumbTemplate: any,
  index: number,
  baseUrl: string,
  path: string,
  canon: string
) {
  let url = path
  if (baseUrl) url = new URL(path, baseUrl).toString()
  const breadcrumbItem = {
    '@type': 'ListItem',
    position: index,
    name: canon,
    item: url,
  }
  breadcrumbTemplate['itemListElement'].push(breadcrumbItem)
}
export function createBreadcrumbSchema(
  baseUrl: string,
  filePath: string,
  breadcrumbHash: any
): any {
  const pathParts = filePath.replace(/^\/+|\/+$/g, '').split('/')
  const breadcrumbTemplate = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [],
  }
  for (let index = 0; index < pathParts.length + 1; index++) {
    const path = `/${pathParts.slice(0, index).join('/')}`
    let canon = breadcrumbHash[path]
    addBreadCrumbItem(breadcrumbTemplate, index + 1, baseUrl, path, canon)
  }
  return breadcrumbTemplate
}
export function writeJsonFile(directory: string, data: any) {
  const jsonFile = path.join(directory, 'data.json')
  fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), 'utf-8')
}
export function readJsonTest(jsonFile: string): any {
  try {
    const data = fs.readFileSync(jsonFile, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    } else {
      throw error
    }
  }
}
export function schema_(directory: string, breadcrumbSchema: any): any {
  const schemaFile = path.join(directory, 'schema.json')
  let schema = readJsonTest(schemaFile)
  if (schema && breadcrumbSchema) {
    if (Array.isArray(schema)) {
      schema.push(breadcrumbSchema)
    }
  } else if (breadcrumbSchema) {
    schema = breadcrumbSchema
  }
  return schema
}
export function company(
  rootDirectory: string,
  companiesLocni: { [key: string]: any[] },
  currentProps: any,
  filePath: string
) {
  const companyName = currentProps['company']
  const companyDataPath = path.join(
    rootDirectory,
    'companies',
    companyName,
    'data.yml'
  )
  const companyData = yaml.load(
    fs.readFileSync(companyDataPath, 'utf-8')
  ) as any
  currentProps['header'] = companyData['name']
  currentProps['title'] = companyData['name']
  currentProps['footer'] = companyData['phone']
  currentProps['description'] = companyData['description']
  if (!companiesLocni[companyName]) {
    companiesLocni[companyName] = []
  }
  companiesLocni[companyName].push(filePath)
}
export function mergeDicts_(directory: string, currentProps: Dict): void {
  const ymlFilePath = path.join(directory, 'data.yml')
  if (fs.existsSync(ymlFilePath)) {
    const fileContents = fs.readFileSync(ymlFilePath, 'utf8')
    const companyData = yaml.load(fileContents) as Dict
    mergeDicts(currentProps, companyData)
  }
}
export function recurse(
  baseUrl: string,
  directory: string,
  rootDirectory: string,
  breadcrumbs: any,
  companiesLocni: any,
  inheritedProps: any
) {
  const directories = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  directories.forEach(subDir => {
    const subDirPath = path.join(directory, subDir)
    processDirectory(
      baseUrl,
      subDirPath,
      rootDirectory,
      _.cloneDeep(inheritedProps),
      breadcrumbs,
      companiesLocni
    )
  })
}
export function proc(
  baseUrl: string,
  directory: string,
  rootDirectory: string,
  inheritedProps: Dict,
  breadcrumbs: Dict,
  companiesLocni: Dict
): void {
  const currentProps = _.cloneDeep(inheritedProps)
  mergeDicts_(directory, currentProps)
  currentProps['content'] = getContentHtml(directory)
  const filePath = directory.replace(rootDirectory, '')
  breadcrumbs['/' + filePath] = currentProps['name']
  const breadcrumbSchema = createBreadcrumbSchema(
    baseUrl,
    filePath,
    breadcrumbs
  )
  const breadcrumbSchema2 = createBreadCrumbs(filePath, breadcrumbs)
  currentProps['breadcrumb'] = breadcrumbSchema2
  currentProps['schema'] = schema_(directory, breadcrumbSchema)
  if ('company' in currentProps) {
    company(rootDirectory, companiesLocni, currentProps, filePath)
  }
  writeJsonFile(directory, currentProps)
  recurse(
    baseUrl,
    directory,
    rootDirectory,
    breadcrumbs,
    companiesLocni,
    _.cloneDeep(currentProps)
  )
}
export function processDirectory(
  baseUrl: string,
  directory: string,
  rootDirectory: string,
  inheritedProps: any,
  breadcrumbs: any,
  companiesLocni: any
) {
  proc(
    baseUrl,
    directory,
    rootDirectory,
    _.cloneDeep(inheritedProps),
    breadcrumbs,
    companiesLocni
  )
}
export function make_data_json(baseUrl: string, rootDirectory: string) {
  const companyLocnis = {}
  processDirectory(
    baseUrl,
    rootDirectory,
    rootDirectory,
    {},
    {},
    companyLocnis
  )
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2]
  if (!baseUrl) {
    console.error('Error: REQUIRED_VARIABLE is not set.')
    process.exit(1)
  }
  make_data_json(baseUrl, 'pages/')
}
  // function processCompanies(rootDir: string, companyLocnis: any) {
  //   function writeJson(jsonFile: string, data: any) {
  //     fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), 'utf-8')
  //   }
  //   function readJson(jsonFile: string): any {
  //     const data = fs.readFileSync(jsonFile, 'utf-8')
  //     return JSON.parse(data)
  //   }
  //   const companiesDirectory = path.join(rootDir, 'companies')
  //   fs.readdirSync(companiesDirectory, { withFileTypes: true })
  //     .filter(dirent => dirent.isDirectory())
  //     .forEach(companyDir => {
  //       const jsonFile = path.join(
  //         companiesDirectory,
  //         companyDir.name,
  //         'data.json'
  //       )
  //       const data = readJson(jsonFile)
  //       data['locni'] = companyLocnis[companyDir.name]
  //       writeJson(jsonFile, data)
  //     })
  // }