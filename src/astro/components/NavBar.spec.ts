import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import NavBar from './NavBar.astro';

test('NavBar with props', async () => {
  const container = await AstroContainer.create();
  const nav1 = [{ path: '/home', label: 'Home' }];
  const nav2 = [{ path: '/about', label: 'About' }];
  const result = await container.renderToString(NavBar, { props: { nav1, nav2 } });
  
  expect(result).toContain('Home');
  expect(result).toContain('About');
  expect(result).toContain('/home');
  expect(result).toContain('/about');
});