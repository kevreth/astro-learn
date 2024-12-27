import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
export default defineConfig({
  srcDir: 'src/astro',
  compressHTML: false,
  integrations: [vue()]
});