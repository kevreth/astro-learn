import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Footer from './Footer.astro';
test('Footer with prop', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Footer, {props: { footerText: "Hello" }});
  expect(result).not.toContain("24phlaweifh");
  expect(result).toContain("Hello");
})