export default function setupPage(pageData) {
  useHead({
    title: pageData.title,
    meta: [
      {
        name: 'description',
        content: pageData.description,
      },
    ],
    link: [
      // { rel: 'stylesheet', href: '/style.css' }
    ],
    script: [
      pageData.schema ? {
      type: 'application/ld+json',
      innerHTML: pageData.schema
    } : '',
  ]
  });
}
