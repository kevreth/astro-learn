import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  srcDir: 'src/astro',
  compressHTML: false,
  integrations: [vue()],
  vite: {
    plugins: [yaml()]
  }
});