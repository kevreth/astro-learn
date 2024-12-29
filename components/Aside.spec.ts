import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Aside from './Aside.astro';
test('Aside with prop', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Aside, {props: { aside: "Hello" }});
  expect(result).not.toContain("24phlaweifh");
  expect(result).toContain("Hello");
});