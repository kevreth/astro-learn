import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/scripts/tabulator/tabulator.ts',
  output: {
    file: 'dist/tabulator.js',
    format: 'iife'
  },
  plugins: [
    typescript({
      check: false, // Disables type checking
      tsconfigOverride: { compilerOptions: { noEmitOnError: false } } // Prevents build failure on errors
    })
  ]
}
