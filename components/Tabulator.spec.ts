import { startStaticServer } from '../src/scripts/server.controller'
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, vi, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import Tabulator from './Tabulator.astro';
import axios from 'axios';
test('Tabulator with prop', async () => {
    const container = await AstroContainer.create();
    const dom = new JSDOM('', { url: "http://localhost" });
    const result = await container.renderToString(Tabulator, {props: { tabulatorText: "World", priority: 1, doc: dom.window.document }});
    expect(result).not.toContain("24phlaweifh");
    expect(result).toContain("World");
    const dom2 = new JSDOM(result);
    const doc = dom2.window.document;
    const scriptTag = doc.querySelector('#mount') as HTMLElement;
    const content = scriptTag.textContent
    expect(content).toContain('mounted(document, priority, columns)');
    const props = doc.getElementById('props') as HTMLElement;
    const priority = parseInt(props.dataset.priority as string);
    expect(priority).toEqual(1);
});
test('Tabulator with prop', async () => {
    await startStaticServer(3000, './dist')
    const response = await axios.get('http://localhost:3000/tabulator.js');
    expect(response.status).toBe(200);
    expect(response.data).toContain('"Tabulator loaded"');

    const container = await AstroContainer.create();
    const dom = new JSDOM('', { url: "http://localhost" });
    const result = await container.renderToString(Tabulator, {props: { tabulatorText: "World", priority: 1, doc: dom.window.document }});
    const dom3 = new JSDOM(result, {runScripts: "dangerously", resources: "usable"})
    const doc2 = dom3.window.document
    console.log(doc2)
});
