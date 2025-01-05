import data from './data.json';
import setupPage from '../../scripts/stdHead'
export function usePageSetup(data: any): void {
  const baseURL = import.meta.env.PUBLIC_BASE_URL
  const canonicalURL = `${baseURL}${data.pathname}`

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