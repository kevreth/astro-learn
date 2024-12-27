import { afterEach, beforeEach, suite, expect, test, vi } from "vitest"
import { MockDataManager } from "../MockDataManager"
import { calculateAvailableDimensions, floadTitleWhenBreadcrumbsAllow, navempty, isDesktopView, modeFactory } from "./modeFactory"
import { IDataManager } from "../IDataManager"
import { Mobile } from "./mobile"
import { Desktop } from "./desktop"
// const mockMobile = { handleView: vi.fn(), calculateAvailableDimensions: vi.fn(), floadTitleWhenBreadcrumbsAllow: vi.fn() } as unknown as Mobile
// vi.mock('./mobile', () => ({ Mobile: vi.fn(() => mockMobile) }))
const mockDesktop = { handleView: vi.fn(), calculateAvailableDimensions: vi.fn(), floadTitleWhenBreadcrumbsAllow: vi.fn() } as unknown as Desktop
vi.mock('./desktop', () => ({ Desktop: vi.fn(() => mockDesktop) }))
suite('modeFactory', () => {
    let dm:MockDataManager
    beforeEach(() => {
        dm = new MockDataManager()
        vi.resetAllMocks()
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('should return a Mobile instance if innerWidth < 600', () => {
        dm.setProperty(dm.window, 'innerWidth', 500)
        const result = modeFactory(dm)
        expect(result).toBeInstanceOf(Mobile)
    })
    test('should return a Desktop instance if innerWidth >= 600', () => {
        dm.setProperty(dm.window, 'innerWidth', 800)
        const result = modeFactory(dm)
        expect(result).toBeInstanceOf(Desktop)
    })
})
suite('calculateAvailableDimensions', () => {
    let dm:MockDataManager
    beforeEach(() => {
        dm = new MockDataManager()
    })
    test('should call calculateAvailableDimensions on the returned mode instance', () => {
        calculateAvailableDimensions(dm)
        expect(mockDesktop.calculateAvailableDimensions).toHaveBeenCalledWith(dm)
    })
})
suite('isDesktopView', () => {
    test.each([
        [900, true],
        [600, true],
        [599, false],
        [300, false]
      ])('checks if %i is correct: expected %s', (input, expected) => {
        const dm = new MockDataManager()
        dm.window = {...dm.window, innerWidth: input}
        const actual = isDesktopView(dm)
        expect(actual).toBe(expected)
      })
})
suite('floadTitleWhenBreadcrumbsAllow', () => {
    let dm:MockDataManager
    beforeEach(() => {
        dm = new MockDataManager()
    })
    test('does not float title when insufficient space is available in desktop view', () => {
        dm.setProperty(dm.window, 'innerWidth', 1024)
        dm.setProperty(dm.mainWrapper, 'offsetWidth', 300)
        floadTitleWhenBreadcrumbsAllow(dm)
        expect(dm.title.classList.contains('float-title')).toBe(false)
    })
})
suite('navempty', () => {
    let dm:MockDataManager
    beforeEach(() => {
        dm = new MockDataManager()
    })
    test('should call handleView on the returned mode instance', () => {
        const dm = { window: { innerWidth: 800 } } as IDataManager
        navempty(dm)
        expect(mockDesktop.handleView).toHaveBeenCalledWith(dm)
    })
})

suite('floadTitleWhenBreadcrumbsAllow', () => {
    let dm:MockDataManager
    beforeEach(() => {
        dm = new MockDataManager()
    })
    test('should call floadTitleWhenBreadcrumbsAllow on the returned mode instance', () => {
        floadTitleWhenBreadcrumbsAllow(dm)
        expect(mockDesktop.floadTitleWhenBreadcrumbsAllow).toHaveBeenCalledWith(dm)
    })
})