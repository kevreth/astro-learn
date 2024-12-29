import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import CompanyContent from './CompanyContent.astro';

test('CompanyContent with slot', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(CompanyContent, {slots:  { pageCustom: '<div>Custom Content</div>' }});
  expect(result).toContain("Custom Content");
  expect(result).not.toContain("mainContent");
});

test('CompanyContent without slot', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(CompanyContent, { props: { data: "Hello World" } });
  expect(result).toContain("Hello World");
  expect(result).toContain("mainContent");
});
