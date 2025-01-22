import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import sitemap from '@astrojs/sitemap'
export default defineConfig({
  srcDir: 'src/astro',
  compressHTML: false,
  site: 'https://inquirita.com',
  integrations: [sitemap()],
  vite: {
    plugins: [yaml()]
  }
});