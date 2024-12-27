import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const queryFile = 'src/tests/prebuild/prebuild.test.txt';
let uniqueFiles: Set<string> = new Set();
describe('Dynamic YQ Tests', () => {
  beforeAll(() => {
    const queries = fs.readFileSync(queryFile, 'utf-8').split('\n').filter(Boolean);
    queries.forEach((line, index) => {
      const parts = line.split('|||').map(part => part.trim());
      if (parts.length !== 3) {
        throw new Error(`Invalid format in queries.txt at line ${index + 1}`);
      }
      const [filePath] = parts;
      uniqueFiles.add(filePath);
    });
  });
  it('should verify that all files exist', () => {
    const missingFiles: string[] = [];
    uniqueFiles.forEach((filePath) => {
      const resolvedPath = path.resolve(filePath);
      if (!fs.existsSync(resolvedPath)) {
        missingFiles.push(resolvedPath);
      }
    });
    if (missingFiles.length > 0) {
      console.error('Missing files detected:');
      missingFiles.forEach(file => console.error(`- ${file}`));
      throw new Error('One or more files are missing. Aborting tests.');
    }
  });
  const queries = fs.readFileSync(queryFile, 'utf-8').split('\n').filter(Boolean);
  queries.forEach((line, index) => {
    const parts = line.split('|||').map(part => part.trim());
    let [filePath, query, expected] = parts;
    it(`Test case #${index + 1}: ${filePath}, expected ${expected}`, () => {
      const command = `yq eval '${query}' ${filePath}`;
      let result = '';
      try {
        result = execSync(command, { encoding: 'utf8' }).trim();
      } catch (error) {
        console.error(`Error executing YQ command: ${command}`);
        throw error;
      }
      expect(result).toBe(expected);
    });
  });
});
