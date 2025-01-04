import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/scripts/tabulator/tabulator.ts',
  output: {
    file: 'dist/tabulator.js',
    format: 'umd', // UMD format
    name: 'TabulatorModule' // Global variable name for the UMD build
  },
  plugins: [
    resolve(), // Resolve node_modules
    commonjs(), // Convert CommonJS modules to ES6
    typescript({
      check: false, // Disables type checking
      tsconfigOverride: { compilerOptions: { noEmitOnError: false } } // Prevents build failure on errors
    })
  ]
};
