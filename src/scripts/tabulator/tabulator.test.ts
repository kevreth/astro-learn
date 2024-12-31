import { describe, it, expect, vi } from 'vitest'
import { JSDOM } from 'jsdom';
import { readStaticTableData, sortByName, prioritySorter, StringSorter, nameAndStreetFormatter, phoneIconFormatter, addToggleBtn, createInfoModal, addDynamicTableId, showDynamicTable, updatePriority, setupInteractions, rowFormatter, adjustColumnVisibility } from './tabulator'
describe('readStaticTableData', () => {
    it('should return an empty array if static table is not found', () => {
        const dom = new JSDOM('<div></div>');
        const result = readStaticTableData(dom.window.document);
        expect(result).toEqual([]);
    })
})
describe('sortByName', () => {
    it('should sort by priority first and then by name', () => {
        const aRow = { getData: () => ({ OriginalName: 'Alice', priority: true }) }
        const bRow = { getData: () => ({ OriginalName: 'Bob', priority: false }) }
        const result = sortByName('Alice', 'Bob', aRow, bRow, null, 'asc', null)
        expect(result).toBe(-1)
    })
})
describe('prioritySorter', () => {
    it('should sort by priority', () => {
        const aRow = { getData: () => ({ priority: true }) }
        const bRow = { getData: () => ({ priority: false }) }
        const result = prioritySorter('Alice', 'Bob', aRow, bRow, 'asc')
        expect(result).toBe(-1)
    })
})
describe('nameAndStreetFormatter', () => {
    it('should format name and street correctly', () => {
        const cell = { getRow: () => ({ getData: () => ({ Name: 'Alice', Street: '123 Main St', priority: true }) }) }
        const result = nameAndStreetFormatter(cell)
        expect(result).toContain('Alice')
        expect(result).toContain('123 Main St')
    })
})
describe('addToggleBtn', () => {
    it('should add toggle button to the DOM when #dynamic-table exists', () => {
        const dom = new JSDOM('<h1>Header</h1><div id="dynamic-table"></div>');
        const doc = dom.window.document
        addToggleBtn(doc)
        expect(doc.querySelector('.toggle-container')).toBeTruthy()
    })
})
describe('createInfoModal', () => {
    it('should create info modal', () => {
        const dom = new JSDOM('<h1>Header</h1>');
        const win = dom.window as unknown as Window
        const modal = createInfoModal(win.document, win)
        expect(modal.id).toBe('infoModal')
    })
})
describe('addDynamicTableId', () => {
    it('should add dynamic table div', () => {
        const dom = new JSDOM('<div id="static-table"></div>');
        const doc = dom.window.document
        addDynamicTableId(doc)
        expect(doc.getElementById('dynamic-table')).toBeTruthy()
    })
})
describe('showDynamicTable', () => {
    it('should show dynamic table and hide static table', () => {
        const dom = new JSDOM('<div id="static-table"></div><div id="dynamic-table" style="display:none;"></div>')
        const doc = dom.window.document 
        showDynamicTable(doc)
        const staticTable = doc.getElementById('static-table') as HTMLElement
        expect(staticTable.style.display).toBe('none')
        const dynamicTable = doc.getElementById('dynamic-table') as HTMLElement
        expect(dynamicTable.style.display).toBe('block')
    })
})
describe('updatePriority', () => {
    it('should update priority correctly', () => {
        const tData = [{ OriginalName: 'Alice' }, { OriginalName: 'Bob' }]
        updatePriority(tData, 'Alice')
        expect(tData[0].priority).toBe(true)
        expect(tData[1].priority).toBe(false)
    })
})
describe('StringSorter', () => {
    it('should sort strings case-insensitively', () => {
        const aRow = { getData: () => ({ priority: true }) }
        const bRow = { getData: () => ({ priority: false }) }
        const result = StringSorter('Alice', 'Bob', aRow, bRow, null, 'asc', null)
        expect(result).toBe(-1)
    })
})
// describe('phoneIconFormatter', () => {
//     it('should create phone icon correctly', () => {
//         const cell = { getValue: () => '123-456-7890' }
//         const result = phoneIconFormatter(cell)
//         expect(result.querySelector('.fa-phone')).toBeTruthy()
//     })
// })
// describe('setupInteractions', () => {
//     it('should setup interactions correctly', () => {
//         document.body.innerHTML = '<input type="checkbox" id="toggleSwitch"><span class="fa-info-circle"></span>'
//         const tabulator = { setFilter: vi.fn(), clearFilter: vi.fn() }
//         setupInteractions(tabulator as any)
//         const toggleSwitch = document.getElementById('toggleSwitch') as HTMLInputElement
//         toggleSwitch.checked = true
//         toggleSwitch.dispatchEvent(new Event('change'))
//         expect(tabulator.setFilter).toHaveBeenCalledWith('Name', 'like', '<a href=')
//     })
// })
// describe('rowFormatter', () => {
//     it('should format row correctly', () => {
//         const row = { getData: () => ({ priority: true }), getElement: () => document.createElement('div'), getCells: () => [{ getElement: () => document.createElement('div') }] }
//         rowFormatter(row as any)
//         expect(row.getElement().style.background).toContain('#FFDF77')
//     })
// })
// describe('adjustColumnVisibility', () => {
//     it('should adjust column visibility based on window width', () => {
//         const tabulatorInstance = { hideColumn: vi.fn(), showColumn: vi.fn() }
//         global.innerWidth = 500
//         adjustColumnVisibility(tabulatorInstance as any)
//         expect(tabulatorInstance.hideColumn).toHaveBeenCalledWith('Postal')
//     })
// })
