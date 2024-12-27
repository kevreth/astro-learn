import { describe, test, expect } from 'vitest'
import { MockDataManager } from '../MockDataManager'
import { IModes, Modes } from "./modes"
import { AbstractTest } from '../../prebuild/abstract_test'
import { IDataManager } from '../IDataManager'
export interface TestIModes extends AbstractTest<IModes> {
    testHandleView(dm:MockDataManager)
    testCalculateAvailableDimensions(dm:MockDataManager)
    testFloadTitleWhenBreadcrumbsAllow(dm:MockDataManager)
}
export abstract class TestModes extends AbstractTest<Modes> implements TestIModes {
    abstract testHandleView(dm:MockDataManager)
    abstract testCalculateAvailableDimensions(dm:MockDataManager)
    abstract testFloadTitleWhenBreadcrumbsAllow(dm:MockDataManager)
    static testData = [
        [50, 30, 20, 500, 400],
        [0, 0, 0, 500, 500],
        [200, 200, 200, 500, -100],
        [50, 30, 0, 500, 420],
    ]
    static testMsg = 'adjustDimensions(%i, %s, %i, %i) returns [%i]'
    setupMockDataManager(headerHeight:number, footerHeight:number, breadcrumbHeight:number, innerHeight:number): IDataManager {
        const dm = new MockDataManager()
        dm.setProperty(dm.header, 'offsetHeight',headerHeight)
        dm.setProperty(dm.footer, 'offsetHeight',footerHeight)
        dm.setProperty(dm.breadcrumbContainer, 'offsetHeight',breadcrumbHeight)
        dm.setProperty(dm.window, 'innerHeight',innerHeight)
        return dm
    }
    testGetAvailableHeight(headerHeight:number, footerHeight:number, breadcrumbHeight:number, innerHeight:number, expected: number){
        const dm = this.setupMockDataManager(headerHeight, footerHeight, breadcrumbHeight, innerHeight)
        const actual = this.testable.getAvailableHeight(dm)
        expect(actual).toBe(expected)
    }
}
describe("Empty Tests", () => {
    test("should test iteration", () => {
        expect(true).toBe(true)
    })
})