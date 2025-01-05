import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Logo from './Logo.astro';
test('Logo with prop', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Logo, {props: {logo: { src: "Hello", alt:"World" }}});
  expect(result).not.toContain("24phlaweifh");
  expect(result).toContain("Hello");
  expect(result).toContain("World");
})