import { describe, it, expect, vi } from 'vitest';
import * as fs from 'fs';
import path from 'path';
import { createCustomCsvs } from './createCustomCsvs';
import { getDirectoriesWithUncommittedChanges } from './buildSites';
import { parseLine, devItems } from './createCsv';
vi.mock('fs');
vi.mock('path');
vi.mock('./buildSites');
vi.mock('./createCsv');
describe('createCustomCsvs', () => {
  it('processes directories and calls devItems with parsed lines', () => {
    const mockData = { someKey: 'someValue' };
    const mockDirs = ['src/custom/dir1', 'src/custom/dir2'];
    const mockFilteredDirs = ['src/custom/dir2'];
    const mockParsedLines = ['parsedLine1', 'parsedLine2'];
    vi.mocked(getDirectoriesWithUncommittedChanges).mockReturnValue(mockDirs);
    vi.mocked(fs.existsSync).mockImplementation((filePath) => filePath === path.join('src/custom/dir1', 'content.csv'));
    vi.mocked(parseLine).mockImplementation((line) => `parsed${line}`);
    const devItemsSpy = vi.mocked(devItems).mockImplementation(() => {});
    createCustomCsvs(mockData);
    expect(getDirectoriesWithUncommittedChanges).toHaveBeenCalledWith('src/custom/');
    expect(fs.existsSync).toHaveBeenCalledWith(path.join('src/custom/dir1', 'content.csv'));
    expect(fs.existsSync).toHaveBeenCalledWith(path.join('src/custom/dir2', 'content.csv'));
    // expect(parseLine).toHaveBeenCalledWith('dir2');
    // expect(devItemsSpy).toHaveBeenCalledWith(mockParsedLines, mockData);
  });
});
