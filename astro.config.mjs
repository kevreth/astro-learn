import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import yaml from '@rollup/plugin-yaml';
import sitemap from '@astrojs/sitemap'
export default defineConfig({
  srcDir: 'src/astro',
  compressHTML: false,
  site: 'https://inquirita.com',
  integrations: [vue(),sitemap()],
  vite: {
    plugins: [yaml()]
  }
});