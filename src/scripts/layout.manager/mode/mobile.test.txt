import { beforeEach, suite, test, expect } from 'vitest';
import { MockDataManager } from '../MockDataManager';
import { Mobile } from './mobile';
import { TestModes } from './modes.test';
import { Modes } from './modes';
class MobileTest extends TestModes {
  protected factory(): Modes {
    return new Mobile();
  }
  testHandleView(dm: MockDataManager) {
    dm.setProperty(dm.logoImg, 'offsetWidth', 50);
    dm.setProperty(dm.logoImg, 'offsetHeight', 25);
    this.testable.handleView(dm);
    expect(dm.navbar.classList.contains('hidden')).toBe(true);
    expect(dm.navbar.classList.contains('transparent')).toBe(false);
    expect(
      dm.logoNavbarWrapper.classList.contains('breadcrumb-below-nav')
    ).toBe(false);
    expect(dm.breadcrumbContainer.style.minHeight).toBe('25px');
    expect(dm.breadcrumbContainer.style.marginLeft).toBe('60px');
    expect(dm.title.classList.contains('title')).toBe(false);
  }
  testFloadTitleWhenBreadcrumbsAllow(dm: MockDataManager) {
    dm.setProperty(dm.window, 'innerWidth', 500);
    this.testable.floadTitleWhenBreadcrumbsAllow(dm);
    expect(dm.title.classList.contains('float-title')).toBe(false);
  }
  testCalculateAvailableDimensions(dm: MockDataManager) {
    dm.setProperty(dm.header, 'offsetHeight', 70);
    dm.setProperty(dm.footer, 'offsetHeight', 50);
    dm.setProperty(dm.breadcrumbContainer, 'offsetHeight', 30);
    dm.setProperty(dm.window, 'innerHeight', 800);
    dm.setProperty(dm.navbar, 'offsetHeight', 40);
    const dimensions = this.testable.calculateAvailableDimensions(dm);
    expect(dimensions.availableHeight).toBe(590);
    expect(dimensions.availableWidth).toBe(0);
  }
}
suite('testFloadTitleWhenBreadcrumbsAllow', () => {
  let testclass: MobileTest;
  let dm: MockDataManager;
  beforeEach(() => {
    testclass = new MobileTest();
    dm = new MockDataManager();
  });
  test('sets correct styles and classes for mobile view', () => {
    testclass.testFloadTitleWhenBreadcrumbsAllow(dm);
  });
});
suite('testCalculateAvailableDimensions', () => {
  let testclass: MobileTest;
  let dm: MockDataManager;
  beforeEach(() => {
    testclass = new MobileTest();
    dm = new MockDataManager();
  });
  test('sets correct styles and classes for mobile view', () => {
    testclass.testCalculateAvailableDimensions(dm);
  });
});
suite('testGetAvailableHeight', () => {
  let testclass: MobileTest;
  beforeEach(() => {
    testclass = new MobileTest();
  });
  const call = (
    headerHeight,
    footerHeight,
    breadcrumbHeight,
    innerHeight,
    expected
  ) =>
    testclass.testGetAvailableHeight(
      headerHeight,
      footerHeight,
      breadcrumbHeight,
      innerHeight,
      expected
    );
  test.each(TestModes.testData)(TestModes.testMsg, call);
});
suite('handleMobileView', () => {
  let testclass: MobileTest;
  let dm: MockDataManager;
  beforeEach(() => {
    testclass = new MobileTest();
    dm = new MockDataManager();
  });
  test('sets correct styles and classes for mobile view', () => {
    testclass.testHandleView(dm);
  });
  test('handles empty breadcrumbs by adding title class', () => {
    dm.isBreadcrumbEmpty = true;
    new Mobile().handleView(dm);
    expect(dm.title.classList.contains('title')).toBe(true);
  });
});
