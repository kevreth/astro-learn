import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Header from './Header.astro';
test('Header with prop', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header, {props: { header: "Hello" }});
  expect(result).not.toContain("24phlaweifh");
  expect(result).toContain("Hello");
})