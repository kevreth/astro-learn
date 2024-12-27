abstract class AbstractTest<T extends object> {
    protected testable!: T
    protected static readonly MSG_PREFIX = "Problem creating test instance in test class "
    protected abstract factory(): T
    constructor() {
        this.beforeEach()
    }
    beforeEach() {
        try {
            this.testable = this.factory()
        } catch (e) {
            throw new Error(`${AbstractTest.MSG_PREFIX}${this.getTestName()}`)
        }
        if (!this.testable) {
            throw new Error(this.message())
        }
    }
    protected getTestableName(): string {
        return this.testable.constructor.name
    }
    protected getTestName(): string {
        return this.constructor.name
    }
    protected message(): string {
        return `${AbstractTest.MSG_PREFIX}${this.getTestableName()}`
    }
}
export { AbstractTest }
