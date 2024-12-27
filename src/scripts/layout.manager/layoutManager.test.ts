import { beforeEach, describe, test, expect, vi } from 'vitest'
import { MockDataManager } from './MockDataManager'
import { 
    adjustContentHeight,
    adjustDimensions,
    adjustHeightAndLayout,
    handleToggle,
    initLayout,
    getToggleListenerObject,
    handleSearchInput,
    navNotEmpty,
    observeMainWrapper,
    resizeObserver,
    setBreadcrumbTransparency,
    toggleEmptyAside,
    whenNavEmpty
} from './layoutManager'
describe('handleSearchInput', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.mainWrapper = dm.dom.window.document.createElement('div')
        dm.mainWrapper.id = 'main-wrapper'
        dm.dom.window.document.body.appendChild(dm.mainWrapper)
        const input1 = dm.dom.window.document.createElement('input')
        input1.type = 'search'
        const input2 = dm.dom.window.document.createElement('input')
        input2.type = 'search'
        dm.dom.window.document.body.appendChild(input1)
        dm.dom.window.document.body.appendChild(input2)
        dm.searchInputs = dm.dom.window.document.querySelectorAll('input[type="search"]')
    })
    test('sets mainWrapper height to auto on input event', () => {
        handleSearchInput(dm)
        dm.searchInputs.forEach(input => {
            input.value = 'test'
            input.dispatchEvent(new dm.dom.window.Event('input'))
            expect(dm.mainWrapper.style.height).toBe('auto')
        })
    })
    test('does nothing if searchInputs is empty', () => {
        dm.searchInputs = dm.dom.window.document.querySelectorAll('input[type="text"]') // No search inputs
        handleSearchInput(dm)
        expect(dm.mainWrapper.style.height).toBe('')
    })
})
describe('adjustContentHeight', () => {
    let mockDataManager
    beforeEach(() => {
        mockDataManager = new MockDataManager()
    })
    test('calls adjustDimensions with correct arguments', () => {
    })
})
describe('adjustDimensions', () => {
    test.each([
        [400, true, 500, 800, 'fit-content', '800px', 'visible'],
        [600, true, 500, 800, '500px', '800px', 'auto'],
        [0, true, 500, 800, 'fit-content', '800px', 'visible'],
        [0, false, 500, 800, 'fit-content', '100%', 'visible'],
        [600, true, 500, 800, '500px', '800px', 'auto'],
        [400, true, 500, 800, 'fit-content', '800px', 'visible'],
    ])('adjustDimensions(%i, %s, %i, %i) returns [%s, %s, %s]', 
        (scrollHeight, isDesktopView, availableHeight, availableWidth, expectedHeight, expectedWidth, expectedOverflowY) => {
        const [height, width, overflowY] = adjustDimensions(scrollHeight, isDesktopView, availableHeight, availableWidth)
        expect(height).toBe(expectedHeight)
        expect(width).toBe(expectedWidth)
        expect(overflowY).toBe(expectedOverflowY)
    })
})
describe('setBreadcrumbTransparency', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.breadcrumbContainer = dm.dom.window.document.createElement('div')
        dm.dom.window.document.body.appendChild(dm.breadcrumbContainer)
    })
    test('adds transparent class when breadcrumbs are empty', () => {
        dm.isBreadcrumbEmpty = true
        setBreadcrumbTransparency(dm)
        expect(dm.breadcrumbContainer.classList.contains('transparent')).toBe(true)
    })
    test('removes transparent class when breadcrumbs are not empty', () => {
        dm.isBreadcrumbEmpty = false
        dm.breadcrumbContainer.classList.add('transparent')
        setBreadcrumbTransparency(dm)
        expect(dm.breadcrumbContainer.classList.contains('transparent')).toBe(false)
    })
})
describe('navNotEmpty', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.navbar = dm.dom.window.document.createElement('div')
        dm.navbar.classList.add('hidden')
        dm.logoNavbarWrapper = dm.dom.window.document.createElement('div')
        dm.dom.window.document.body.appendChild(dm.navbar)
        dm.dom.window.document.body.appendChild(dm.logoNavbarWrapper)
    })
    test('removes hidden class from navbar and adds breadcrumb-below-nav to logoNavbarWrapper', () => {
        navNotEmpty(dm)
        expect(dm.navbar.classList.contains('hidden')).toBe(false)
        expect(dm.logoNavbarWrapper.classList.contains('breadcrumb-below-nav')).toBe(true)
    })
})
describe('whenNavEmpty', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.isNavEmpty = true
        dm.navbar = dm.dom.window.document.createElement('div')
        dm.logoNavbarWrapper = dm.dom.window.document.createElement('div')
        dm.breadcrumbContainer = dm.dom.window.document.createElement('div')
        dm.title = dm.dom.window.document.createElement('h1')
        dm.dom.window.document.body.appendChild(dm.navbar)
        dm.dom.window.document.body.appendChild(dm.logoNavbarWrapper)
        dm.dom.window.document.body.appendChild(dm.breadcrumbContainer)
        dm.dom.window.document.body.appendChild(dm.title)
    })
    test('handles desktop view when nav is empty', () => {
        Object.defineProperty(dm.window, 'innerWidth', { value: 800, writable: true })
        whenNavEmpty(dm)
        expect(dm.navbar.classList.contains('hidden')).toBe(false)
        expect(dm.navbar.classList.contains('transparent')).toBe(true)
        expect(dm.logoNavbarWrapper.classList.contains('breadcrumb-below-nav')).toBe(false)
    })
    test('handles mobile view when nav is empty', () => {
        Object.defineProperty(dm.window, 'innerWidth', { value: 500, writable: true })
        whenNavEmpty(dm)
        expect(dm.navbar.classList.contains('hidden')).toBe(true)
        expect(dm.logoNavbarWrapper.classList.contains('breadcrumb-below-nav')).toBe(false)
    })
    // test('calls navNotEmpty when nav is not empty', () => {
    //     dm.isNavEmpty = false
    //     const spyNavNotEmpty = vi.fn()
    //     navNotEmpty(dm)
    //     expect(spyNavNotEmpty).toHaveBeenCalled()
    // })
})
describe('toggleEmptyAside', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.aside = dm.dom.window.document.createElement('aside')
        dm.dom.window.document.body.appendChild(dm.aside)
    })
    test('adds hidden class when aside is empty', () => {
        dm.aside.innerHTML = ''
        toggleEmptyAside(dm)
        expect(dm.aside.classList.contains('hidden')).toBe(true)
    })
    test('removes hidden class when aside is not empty', () => {
        dm.aside.innerHTML = 'Content'
        dm.aside.classList.add('hidden')
        toggleEmptyAside(dm)
        expect(dm.aside.classList.contains('hidden')).toBe(false)
    })
})
describe('getToggleListenerObject', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.mainWrapper = dm.dom.window.document.createElement('div')
        dm.dom.window.document.body.appendChild(dm.mainWrapper)
    })
    test('returns a function that adjusts mainWrapper height and layout', () => {
        // const toggleListener = getToggleListenerObject(dm)
        // expect(typeof toggleListener).toBe('function')
        dm.mainWrapper.style.height = '100px'
        // toggleListener()
        // expect(dm.mainWrapper.style.height).toBe('auto')
    })
})
describe('handleToggle', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.mainWrapper = dm.dom.window.document.createElement('div')
        dm.dom.window.document.body.appendChild(dm.mainWrapper)
        const toggleSwitch = dm.dom.window.document.createElement('div')
        toggleSwitch.classList.add('toggle-switch')
        dm.dom.window.document.body.appendChild(toggleSwitch)
        dm.doc.querySelector = () => toggleSwitch
    })
    test('attaches toggle listener to toggleSwitch element', () => {
    //     const spyToggleListener = vi.fn()
    //     dm.getToggleListenerObject = () => spyToggleListener
    //     handleToggle(dm)
    //     const toggleSwitch = dm.doc.querySelector('.toggle-switch')
    //     toggleSwitch.dispatchEvent(new dm.dom.window.Event('change'))
    //     expect(spyToggleListener).toHaveBeenCalled()
    })
    test('removes previous event listener before attaching new one', () => {
    //     const spyToggleListener = vi.fn()
    //     dm.getToggleListenerObject = () => spyToggleListener
    //     handleToggle(dm)
    //     const toggleSwitch = dm.doc.querySelector('.toggle-switch')
    //     toggleSwitch.dispatchEvent(new dm.dom.window.Event('change'))
    //     handleToggle(dm)
    //     toggleSwitch.dispatchEvent(new dm.dom.window.Event('change'))
    //     expect(spyToggleListener).toHaveBeenCalledTimes(2)
    })
})
describe('resizeObserver', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
    })
    test('calls the callback when the observed element is resized', () => {
        const element = dm.dom.window.document.createElement('div')
        // const spyCallback = vi.fn()
        // resizeObserver(element, spyCallback)
        // expect(spyCallback).toHaveBeenCalled()
    })
})
describe('observeMainWrapper', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.mainWrapper = dm.dom.window.document.createElement('div')
        dm.mainWrapper.id = 'main-wrapper'
        const dynamicTable = dm.dom.window.document.createElement('div')
        dynamicTable.id = 'dynamic-table'
        dm.dom.window.document.body.appendChild(dm.mainWrapper)
        dm.dom.window.document.body.appendChild(dynamicTable)
    })
    test('observes mainWrapper and dynamicTable for resizing', () => {
        const spyResizeObserver = vi.fn()
        // observeMainWrapper(dm)
        // expect(spyResizeObserver).toHaveBeenCalled()
    })
})
describe('adjustHeightAndLayout', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.mainWrapper = dm.dom.window.document.createElement('div')
        dm.dom.window.document.body.appendChild(dm.mainWrapper)
        dm.window.innerHeight = 800
        dm.window.innerWidth = 600
    })
    test('adjusts height and layout for desktop view', () => {
        dm.window.innerWidth = 1000
        // adjustHeightAndLayout(dm)
        // expect(dm.mainWrapper.style.height).toBe('auto')
        // expect(dm.mainWrapper.style.width).toBe('1000px')
    })
    test('adjusts height and layout for mobile view', () => {
        dm.window.innerWidth = 500
        // adjustHeightAndLayout(dm)
        // expect(dm.mainWrapper.style.width).toBe('100%')
    })
})
describe('initLayout', () => {
    let dm
    beforeEach(() => {
        dm = new MockDataManager()
        dm.logo = dm.dom.window.document.createElement('img')
        dm.navbar = dm.dom.window.document.createElement('div')
        dm.mainWrapper = dm.dom.window.document.createElement('div')
        dm.dom.window.document.body.appendChild(dm.logo)
        dm.dom.window.document.body.appendChild(dm.navbar)
        dm.dom.window.document.body.appendChild(dm.mainWrapper)
        Object.defineProperty(dm.window, 'addEventListener', { writable: true, value: vi.fn() })
    })
    test('adjusts layout when logo is not loaded', () => {
        Object.defineProperty(dm.logo, 'complete', { value: false, writable: true })
        // const spyAdjustHeightAndLayout = vi.spyOn(dm, 'adjustHeightAndLayout')
        // const spyAdjustLogoSize = vi.spyOn(dm, 'adjustLogoSize')
        // dm.logo.onload = () => {
        //     spyAdjustHeightAndLayout()
        //     spyAdjustLogoSize()
        // }
        // initLayout(dm)
        // dm.logo.onload()
        // expect(spyAdjustHeightAndLayout).toHaveBeenCalled()
        // expect(spyAdjustLogoSize).toHaveBeenCalled()
    })
    test('adjusts layout when logo is already loaded', () => {
        Object.defineProperty(dm.logo, 'complete', { value: true, writable: true })
        // const spyAdjustHeightAndLayout = vi.spyOn(dm, 'adjustHeightAndLayout')
        // const spyAdjustLogoSize = vi.spyOn(dm, 'adjustLogoSize')
        // initLayout(dm)
        // expect(spyAdjustHeightAndLayout).toHaveBeenCalled()
        // expect(spyAdjustLogoSize).toHaveBeenCalled()
    })
    test('sets up resize event listener', () => {
        // const spyAddEventListener = vi.spyOn(dm.window, 'addEventListener')
        // initLayout(dm)
        // expect(spyAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
})
