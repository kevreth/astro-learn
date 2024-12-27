import { describe, it, expect } from 'vitest';
import { getPathComponents, createDirectoriesFromComponents, ensurePathExists } from './createDirectoryPath';
import * as fs from 'fs'
describe('getPathComponents', () => {
  it('should split a directory path into components', () => {
    const result = getPathComponents('/home/user/documents');
    expect(result).toEqual(['/','home', 'user', 'documents']);
  });
  it('should handle root directory correctly', () => {
    const result = getPathComponents('/');
    expect(result).toEqual(['/']);
  });
});
describe('createDirectoriesFromComponents', () => {
  it('should create directories from components', () => {
    const components = ['test', 'path', 'example'];
    createDirectoriesFromComponents(components);
    expect(() => fs.accessSync('test/path/example')).not.toThrow();
    fs.rmSync('test', { recursive: true, force: true });
  });
});
describe('ensurePathExists', () => {
  it('should ensure the full path exists', () => {
    ensurePathExists('new/path/to/ensure');
    expect(() => fs.accessSync('new/path/to/ensure')).not.toThrow();
    fs.rmSync('new', { recursive: true, force: true });
  });
});
