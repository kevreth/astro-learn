//update sitemap.xml to include lastmod timestamps
//complicated because some output pages are constructed
//so there's no one file to get a date from
//also, the timestamps come from git
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as xml2js from 'xml2js';

const specifiedFiles = ['content.md', 'data.yaml'];

function getMostRecentDate(dirIn: string): { dir: string, date: string } {
    let date: string = '';
    let dir: string = dirIn;
    const csvPath = path.join(dirIn, 'content.csv');
    if (fs.existsSync(csvPath)) {
        date = execSync(`git log -1 --format=%cI -- ${csvPath}`).toString().trim();
        dir = `${dirIn}/directory`;
    } else {
        let mostRecentDate = '';
        for (const file of specifiedFiles) {
            const filePath = path.join(dirIn, file);
            if (fs.existsSync(filePath)) {
                let date_tmp = execSync(`git log -1 --format=%cI -- ${filePath}`).toString().trim();
                if (!mostRecentDate || new Date(date_tmp) > new Date(mostRecentDate)) {
                    mostRecentDate = date_tmp;
                    }
            }
        }
        date = mostRecentDate;
    }
    return { dir: dir, date: date };
}

function listDirectoriesWithDates(rootDir: string): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    const rootDateInfo = getMostRecentDate(rootDir);
    if (rootDateInfo.date)
        result['/'] = rootDateInfo.date;
    const stack: string[] = [rootDir];
    while (stack.length > 0) {
        const currentDir = stack.pop()!;
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        const directories = entries.filter(entry => entry.isDirectory());
        directories.forEach(directory => {
            const dirPath = path.join(currentDir, directory.name);
            stack.push(dirPath);
            const { dir, date } = getMostRecentDate(dirPath);
            const slug = dir.replace(rootDir,'')
            if (date) {
                result[slug] = date;
                if(slug.endsWith('/directory')){
                    const end = slug.length - '/directory'.length;
                    result[slug.slice(0, end)]=date;
                }
                    
            }
        });
    }
    return result;
}

async function updateSitemap(sitemapPath: string, dateMap: { [key: string]: string }, prefix:string) {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder();
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

    parser.parseString(sitemap, (err: any, result: any) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }

        result.urlset.url.forEach((url: any) => {
            const slug = url.loc[0].replace(prefix, '');
            let date = dateMap[slug];
            if(slug=='') {
                date = dateMap['/']
            }
            if (date) {
                url.lastmod = [date];
            }
        });

        const updatedXml = builder.buildObject(result);
        fs.writeFileSync(sitemapPath, updatedXml); // Write back to the original sitemap file
    });
}

if (process.argv.length !== 5) {
    console.error('Usage: ts-node script.ts <root-directory> <sitemap-path>');
    process.exit(1);
}

const rootDirectory = process.argv[2];
const sitemapPath = process.argv[3];
const prefix = process.argv[4] + '/';
const dateMap = listDirectoriesWithDates(rootDirectory);
updateSitemap(sitemapPath, dateMap, prefix);
