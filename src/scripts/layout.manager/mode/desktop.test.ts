import { beforeEach, suite, test, expect, vi } from 'vitest'
import { MockDataManager } from '../MockDataManager'
import { Desktop } from "./desktop"
import { TestModes } from './modes.test'
import { Modes } from './modes'
class DesktopTest extends TestModes {
    protected factory(): Modes { return new Desktop() }
    testHandleView(dm:MockDataManager) {
        dm.navbar = dm.dom.window.document.createElement('div')
        dm.navbar.classList.add('hidden')
        dm.logoNavbarWrapper = dm.dom.window.document.createElement('div')
        dm.breadcrumbContainer = dm.dom.window.document.createElement('div')
        dm.title = dm.dom.window.document.createElement('h1')
        dm.dom.window.document.body.appendChild(dm.navbar)
        dm.dom.window.document.body.appendChild(dm.logoNavbarWrapper)
        dm.dom.window.document.body.appendChild(dm.breadcrumbContainer)
        dm.dom.window.document.body.appendChild(dm.title)
        this.testable.handleView(dm)
        expect(dm.navbar.classList.contains('hidden')).toBe(false)
        expect(dm.navbar.classList.contains('transparent')).toBe(true)
        expect(dm.logoNavbarWrapper.classList.contains('breadcrumb-below-nav')).toBe(false)
        expect(dm.breadcrumbContainer.style.marginLeft).toBe('0px')
        expect(dm.breadcrumbContainer.style.minHeight).toBe('auto')
        expect(dm.title.classList.contains('title')).toBe(false)
    }
    testFloadTitleWhenBreadcrumbsAllow(dm:MockDataManager) {
        dm.dom.window.document.body.appendChild(dm.title)
        dm.setProperty(dm.mainWrapper, 'offsetWidth', 800)
        dm.setProperty(dm.breadcrumbContainer, 'offsetWidth', 200)
        dm.setProperty(dm.window, 'offsetWidth', 150)
        dm.setProperty(dm.title, 'offsetHeight', 50)
        dm.setProperty(dm.window, 'innerWidth', 1024)
        const nextSibling = dm.dom.window.document.createElement('div')
        dm.title.insertAdjacentElement('afterend', nextSibling)
        this.testable.floadTitleWhenBreadcrumbsAllow(dm)
        expect(dm.title.classList.contains('float-title')).toBe(true)
    }
    testCalculateAvailableDimensions(dm:MockDataManager) {
        dm.setProperty(dm.logoNavbar, 'getBoundingClientRect',vi.fn(() => ({ width: 100 })))
        dm.setProperty(dm.aside, 'getBoundingClientRect',vi.fn(() => ({ width: 200 })))
        dm.setProperty(dm.window, 'innerWidth',1200)
        const { availableHeight, availableWidth } = this.testable.calculateAvailableDimensions(dm)
        expect(availableHeight).toEqual(753)
        expect(availableWidth).toEqual(900)
     }
}
suite('testGetAvailableHeight', () => {
    let testclass:DesktopTest
    beforeEach(() => {
        testclass = new DesktopTest()
    })
    const call = (headerHeight, footerHeight, breadcrumbHeight, innerHeight, expected) =>
        testclass.testGetAvailableHeight(headerHeight, footerHeight, breadcrumbHeight, innerHeight, expected)
    test.each(TestModes.testData)(TestModes.testMsg, call)
})
suite('Parameterized Tests', () => {
    let testclass: DesktopTest
    let dm: MockDataManager
    beforeEach(() => {
        testclass = new DesktopTest()
        dm = new MockDataManager()
    })
    const tests = [
        { name: 'testFloadTitleWhenBreadcrumbsAllow', method: (tc: DesktopTest, data: MockDataManager) => tc.testFloadTitleWhenBreadcrumbsAllow(data) },
        { name: 'testCalculateAvailableDimensions', method: (tc: DesktopTest, data: MockDataManager) => tc.testCalculateAvailableDimensions(data) },
        { name: 'handleView', method: (tc: DesktopTest, data: MockDataManager) => tc.testHandleView(data) }
    ]
    test.each(tests)('$name', ({ method }) => {
        method(testclass, dm)
    })
})