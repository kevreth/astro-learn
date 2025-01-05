import data from './data.json';
import setupPage from '../../scripts/stdHead'
import { setHead } from '@astrojs/head-utils'
export function usePageSetup(data: any) {
  const baseURL = import.meta.env.PUBLIC_BASE_URL
  const canonicalURL = `${baseURL}${Astro.url.pathname}`

  setHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalURL,
      },
    ],
  });

  if (data) {
    setupPage(data);
  }
}