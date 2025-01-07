import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const createConfig = (input, outputFileName, globalName) => ({
  input,
  output: [
    {
      file: `dist/${outputFileName}`,
      format: 'umd',
      name: globalName
    },
    {
      file: `public/${outputFileName}`,
      format: 'umd',
      name: globalName
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      check: false,
      tsconfigOverride: { compilerOptions: { noEmitOnError: false } }
    })
  ]
});

export default [
  createConfig('src/scripts/tabulator/tabulator.ts', 'tabulator.js', 'TabulatorModule'),
  createConfig('src/scripts/layout.manager/layoutManager.ts', 'layout.manager.js', 'LayoutManagerModule')
];