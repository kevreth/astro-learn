import { describe, it, expect } from 'vitest';
import * as path from 'path';
import { removeDiacritics, sanitize, groupAndSaveCSV, executeYamlStructure } from './provider';
describe('removeDiacritics', () => {
    it('removes diacritics from strings', () => {
        expect(removeDiacritics("Ångström")).toBe("Angstrom");
        expect(removeDiacritics("Øresund")).toBe("Oresund");
        expect(removeDiacritics("Æble")).toBe("AEble");
    });
});
describe('sanitize', () => {
    it('sanitizes strings to be filesystem and URL safe', () => {
        expect(sanitize("New York")).toBe("new-york");
        expect(sanitize("São Paulo")).toBe("sao-paulo");
        expect(sanitize("Café")).toBe("cafe");
    });
});
describe('groupAndSaveCSV', () => {
    it('groups data and returns correct structure', () => {
        const data = [
            { Region: "North", Locality: "City A", Niche: "N1", Value: "1" },
            { Region: "North", Locality: "City A", Niche: "N2", Value: "2" },
        ];
        const outputDir = path.join(__dirname, 'output');
        const result = groupAndSaveCSV(data, outputDir, null);
        expect(result).toHaveProperty("North");
        expect(result["North"]).toHaveProperty("City A");
        const details = result["North"]["City A"];
        expect(details.createDirectory).toBe(true);
        expect(details.file).toMatch(/n2\/content\.csv$/i);
    });
});
// describe('executeYamlStructure', () => {
//     it('creates directory and writes CSV files correctly', () => {
//         const tempDir = path.join(__dirname, 'temp');
//         if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
//         fs.mkdirSync(tempDir, { recursive: true });
//         const data = {
//             North: {
//                 CityA: {
//                     createDirectory: true,
//                     file: path.join(tempDir, 'North/CityA/Niche/content.csv'),
//                     data: [{ Column1: "Value1" }]
//                 }
//             }
//         };
//         executeYamlStructure(data);
//         const filePath = path.join(tempDir, 'North/CityA/Niche/content.csv');
//         expect(fs.existsSync(filePath)).toBe(true);
//         const csvContent = fs.readFileSync(filePath, 'utf-8');
//         const parsed = Papa.parse(csvContent, { header: true }).data;
//         expect(parsed[0]['Column1']).toBe("Value1");
//     });
// });
