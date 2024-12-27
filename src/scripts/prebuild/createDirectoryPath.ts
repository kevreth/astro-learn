import fs from 'fs'
import path from 'path'
export function getPathComponents(directoryPath: string): string[] {
    const components: string[] = []
    let currentPath = path.resolve(directoryPath)
    while (currentPath !== path.dirname(currentPath)) {
        components.unshift(path.basename(currentPath))
        currentPath = path.dirname(currentPath)
    }
    components.unshift(currentPath)
    return components
}
export function createDirectoriesFromComponents(components: string[]): void {
    let constructedPath = ''
    components.forEach(component => {
        constructedPath = path.join(constructedPath, component)
        const exists = !fs.existsSync(constructedPath)
        if (exists) fs.mkdirSync(constructedPath)
    })
}
export function ensurePathExists(directoryPath: string): void {
    const components = getPathComponents(directoryPath)
    createDirectoriesFromComponents(components)
}
