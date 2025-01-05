import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Breadcrumb from './Breadcrumb.astro';

test('Breadcrumb with prop', async () => {
  const container = await AstroContainer.create();
  const breadcrumbs = '<ul><li>Home</li><li>About</li></ul>';
  const result = await container.renderToString(Breadcrumb, { props: { breadcrumbs } });
  
  expect(result).toContain('Home</li><li>About');
  expect(result).toContain(breadcrumbs);
});
