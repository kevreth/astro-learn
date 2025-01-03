import { startStaticServer } from '../src/scripts/server.controller'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import { JSDOM } from 'jsdom'
import Tabulator from './Tabulator.astro'
import axios from 'axios'
import { mounted } from 'src/scripts/tabulator/tabulator'
test('Tabulator with prop', async () => {
    const result = await getResult()
    expect(result).not.toContain("24phlaweifh")
    expect(result).toContain("World")
    const dom2 = new JSDOM(result)
    const doc = dom2.window.document
    const scriptTag = doc.querySelector('#mount') as HTMLElement
    const content = scriptTag.textContent
    expect(content).toContain('mounted(document)')
    const props = doc.getElementById('props') as HTMLElement
    const priority = parseInt(props.dataset.priority as string)
    expect(priority).toEqual(1)
})
test('tabulator.js served', async () => {
    await startStaticServer(3000, './dist')
    const response = await axios.get('http://localhost:3000/tabulator.js')
    expect(response.status).toBe(200)
    expect(response.data).toContain('function mounted')
})
test('mounted executes', async () => {
    const result = await getResult()
    const dom3 = new JSDOM(result, {runScripts: "dangerously", resources: "usable"})
    const doc2 = dom3.window.document.body.innerText
    console.log("mounted exercises")
    console.log(doc2)
    // expect(doc2).toContain('World')
})
async function getResult() {
    const container = await AstroContainer.create()
    const dom = new JSDOM('', { url: "http://localhost" })
    const result = await container.renderToString(Tabulator, { props: { tabulatorText: "World", priority: 1, doc: dom.window.document } })
    return result
}

