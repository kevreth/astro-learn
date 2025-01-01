import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import Tabulator from './Tabulator.astro';
vi.mock('../src/scripts/tabulator/tabulator', () => ({
  mounted: vi.fn(), 
  columns: []
}));
test('Tabulator with prop', async () => {
    const container = await AstroContainer.create();
    const dom = new JSDOM('', { url: "http://localhost" });
    const result = await container.renderToString(Tabulator, {props: { tabulatorText: "World", priority: 1, doc: dom.window.document }});
    expect(result).not.toContain("24phlaweifh");
    expect(result).toContain("World");
    console.log(result);
    const dom2 = new JSDOM(result);
    const doc = dom2.window.document;
    const scriptTag = doc.querySelector('#mount') as HTMLElement;
    const content = scriptTag.textContent
    console.log(content);
    expect(content).toContain('mounted(document, priority, columns)');
    const props = doc.getElementById('props') as HTMLElement;
    const priority = parseInt(props.dataset.priority as string);
    expect(priority).toEqual(1);
});
