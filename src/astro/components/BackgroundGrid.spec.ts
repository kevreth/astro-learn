import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import { JSDOM } from 'jsdom';
import BackgroundGrid from './BackgroundGrid.astro';

test('BackgroundGrid with multiple images', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(BackgroundGrid, { props: { backgroundImages: ["image1.jpg", "image2.jpg", "image3.jpg"] } });
  const dom = new JSDOM(result);
  const backgroundGridDivs = dom.window.document.querySelectorAll('.background-grid');
  expect(backgroundGridDivs.length).toBe(3);
});

test('BackgroundGrid with single image', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(BackgroundGrid, { props: { backgroundImages: ["image1.jpg"] } });
  const dom = new JSDOM(result);
  const singleCellDivs = dom.window.document.querySelectorAll('.single-cell');
  expect(singleCellDivs.length).toBe(1);
});