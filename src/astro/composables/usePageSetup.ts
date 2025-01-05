import data from './data.json';
import setupPage from '../src/scripts/stdHead';
// import { useFetchPosts } from '../src/public/useFetchPosts';

import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';

export function usePageSetup(data: any) {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const route = useRoute();
  const canonicalURL = `${baseURL}${route.fullPath}`;

  useHead({
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

  const setupBlogContent = async () => {
    let currentURL = window.location.href;
    let isBlog = currentURL.endsWith('blog');
    if (isBlog) {
      const posts = await useFetchPosts();
      let accum = '';
      if (posts) {
        posts.forEach((item: { title: any; content: any }) => {
          accum += `<h2>${item.title.rendered}</h2>\n${item.content.rendered}`;
        });
      }
      const mainContentDiv = document.querySelector('.mainContent');
      console.log('Main Content Div:', mainContentDiv);
      if (mainContentDiv) mainContentDiv.insertAdjacentHTML('beforeend', accum);
    }
  };

  return { setupBlogContent };
}