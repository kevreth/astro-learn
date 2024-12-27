import { describe, it, expect, vi } from 'vitest';
import {
  devItems,
  parseLine,
  getMatchingRecords,
  devFileItem,
  devFile,
} from './createCsv';
import { ensurePathExists } from './createDirectoryPath';
import * as fs from 'fs';
import Papa from 'papaparse';
vi.mock('fs');
vi.mock('papaparse');
vi.mock('./createDirectoryPath', () => ({
  ensurePathExists: vi.fn(),
}));
const mockData = [{
  Country: 'US',
  Region: 'California',
  Locality: 'San Francisco',
  Niche: 'Tech'
}];
const mockLocniData = {
  proper_locality: 'San Francisco'
};
const mockProviderResults = [{ Name: 'Test', URL: 'http://test.com' }];
const mockCsvContent = 'Name,URL\nTest,http://test.com';
Papa.unparse.mockReturnValue(mockCsvContent);
fs.readFileSync.mockReturnValue(mockCsvContent);
fs.readdirSync.mockReturnValue(['file1.csv', 'file2.csv']);
const mockParsedData = [
  { Name: 'Test', URL: 'http://test.com', Niche: 'Tech' }
];
Papa.parse.mockReturnValue({ data: mockParsedData });
// describe('devItems', () => {
//     it('should call devFileItem for each item returned by devFile', () => {
//         const devFileSpy = vi.spyOn({ devFile }, 'devFile').mockReturnValue([
//             { locni: mockData[0], locniData: mockLocniData, providerResults: mockProviderResults }
//         ]);
//         const devFileItemSpy = vi.spyOn({ devFileItem }, 'devFileItem');
//         devItems(mockData, mockLocniData);
//         expect(devFileSpy).toHaveBeenCalledWith(mockData, mockLocniData);
//         expect(devFileItemSpy).toHaveBeenCalledTimes(1);
//     });
// });
describe('parseLine', () => {
    it('should parse a line of dev.txt', () => {
        const input = "us/tx/port-arthur/cpa"
        const result = parseLine(input);
        expect(result).toEqual({ Country: 'us', Region: 'tx', Locality: 'port-arthur', Niche: 'cpa' });
    });
});
describe('parseLine', () => {
  it('should parse a line into Country, Region, Locality, and Niche', () => {
    const line = 'US/California/San Francisco/Tech';
    const result = parseLine(line);
    expect(result).toEqual({
      Country: 'US',
      Region: 'California',
      Locality: 'San Francisco',
      Niche: 'Tech'
    });
  });
});
describe('getMatchingRecords', () => {
  it('should return matching records based on filters', () => {
    const records = [
      { Country: 'US', Region: 'California', Locality: 'San Francisco', Niche: 'Tech' },
      { Country: 'US', Region: 'California', Locality: 'Los Angeles', Niche: 'Media' }
    ];
    const result = getMatchingRecords(records, 'US', 'California', 'San Francisco', 'Tech');
    expect(result).toEqual([records[0]]);
  });
});
describe('devFileItem', () => {
  it('should create a CSV file at the correct path', () => {
    const item = {
      locni: mockData[0],
      locniData: mockLocniData,
      providerResults: mockProviderResults
    };
    devFileItem(item);
    expect(ensurePathExists).toHaveBeenCalledWith('sites/US/California/San Francisco/Tech');
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'sites/US/California/San Francisco/Tech/content.csv',
      mockCsvContent,
      'utf8'
    );
  });
});
// describe('devFile', () => {
//   it('should generate DevFileResult for each location', () => {
//     const queryLocni = vi.fn().mockReturnValue(mockLocniData);
//     const result = devFile(mockData, mockLocniData);
//     expect(result).toEqual([
//       {
//         locni: mockData[0],
//         locniData: mockLocniData,
//         providerResults: mockParsedData
//       }
//     ]);
//   });
// });
// describe('concatenateCSVsFromDirectory', () => {
//   it('should concatenate data from multiple CSV files', () => {
//     const result = concatenateCSVsFromDirectory(['Name', 'URL'], 'providers');
//     expect(result).toEqual(mockParsedData);
//   });
// });
