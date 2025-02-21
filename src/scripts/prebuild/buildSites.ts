import { cpSync, mkdirSync } from 'fs'
import fs from 'fs-extra'
import { join } from 'path'
import { sync as globSync } from 'glob'
import path from 'path'
import { execSync } from 'child_process'
export function hasUncommittedChanges(directory: string): boolean {
    try {
        const gitStatus = execSync('git status --porcelain -- .', { cwd: directory }).toString()
        return gitStatus.trim().length > 0
    } catch (error) {
        throw new Error(directory + ': not a valid git repository or unable to run git commands')
    }
}
export function getDirectories(rootDir: string): string[] {
    const pattern = path.join(rootDir, '*', '*', '*', '*')
    const allPaths = globSync(pattern)
    const directories = allPaths.filter((p) => fs.lstatSync(p).isDirectory())
    return directories
}
export function buildCustom(customDir: string) {
    const changedDirs = getDirectoriesWithUncommittedChanges(customDir)
    changedDirs.forEach(item => {buildLocni(item, customDir)})
}
export function buildLocni(item: string, customDir: string) {
    const targetDir = join('sites', item.replace(customDir, ''))
    mkdirSync(targetDir, { recursive: true })
    cpSync(item, targetDir, { recursive: true })
}
export function getDirectoriesWithUncommittedChanges(customDir: string) {
    const directories = getDirectories(customDir)
    const changedDirs = directories.filter(hasUncommittedChanges)
    return changedDirs
}
export function buildSites() {
    // fs.removeSync('sites')
    // fs.ensureDirSync('sites')
    cpSync('src/sitewide', 'sites', { recursive: true })
    const customDir = 'src/custom/'
    const custom_flag = hasUncommittedChanges(customDir)
    if (custom_flag) buildCustom(customDir)
}
