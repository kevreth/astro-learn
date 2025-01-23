import { beforeEach, describe, test, expect, vi } from 'vitest';
import { adjustLogoSize, adjustNavbarFontSize } from './adjustLogoSize';
import { MockDataManager } from '../MockDataManager';
describe('adjustNavbarFontSize', () => {
  let dm: MockDataManager;
  beforeEach(() => {
    dm = new MockDataManager();
    dm.navbar = dm.dom.window.document.createElement('div');
    dm.logo = dm.dom.window.document.createElement('img');
    dm.dom.window.document.body.appendChild(dm.navbar);
    dm.dom.window.document.body.appendChild(dm.logo);
    dm.setProperty(dm.navbar, 'offsetWidth', 200);
    dm.setProperty(dm.logo, 'offsetWidth', 50);
  });
  test('increases font size when within maximum limits', () => {
    dm.navbar.style.fontSize = '12px';
    adjustNavbarFontSize(dm);
    expect(parseFloat(dm.navbar.style.fontSize)).toBeGreaterThan(12);
  });
  test('decreases font size when content exceeds max width', () => {
    dm.setProperty(dm.window, 'innerWidth', 100);
    dm.navbar.style.fontSize = '16px';
    adjustNavbarFontSize(dm);
    expect(parseFloat(dm.navbar.style.fontSize)).toBeLessThan(16);
  });
  test('does not exceed maximum font size', () => {
    dm.navbar.style.fontSize = '16px';
    adjustNavbarFontSize(dm);
    expect(parseFloat(dm.navbar.style.fontSize)).toBeLessThanOrEqual(16);
  });
  test('does not fall below minimum font size', () => {
    dm.navbar.style.fontSize = '10px';
    adjustNavbarFontSize(dm);
    expect(parseFloat(dm.navbar.style.fontSize)).toBeGreaterThanOrEqual(10);
  });
});
describe('adjustLogoSize', () => {
  let dm: MockDataManager;
  beforeEach(() => {
    dm = new MockDataManager();
    dm.navbar = dm.dom.window.document.createElement('div');
    dm.logoImg = dm.dom.window.document.createElement('img');
    dm.dom.window.document.body.appendChild(dm.navbar);
    dm.dom.window.document.body.appendChild(dm.logoImg);
    dm.setProperty(dm.navbar, 'offsetHeight', 100);
    dm.setProperty(dm.logoImg, 'offsetHeight', 50);
    vi.spyOn(dm.window, 'getComputedStyle').mockImplementation(element => {
      if (element === dm.navbar) {
        return { lineHeight: '20px' } as CSSStyleDeclaration;
      }
      return {} as CSSStyleDeclaration;
    });
  });
  test('adjusts logo size for desktop view', () => {
    dm.setProperty(dm.window, 'innerWidth', 1000);
    adjustLogoSize(dm);
    expect(dm.logoImg.classList.contains('logoImg-desktop')).toBe(true);
    expect(dm.logoImg.style.height).toBe('40px');
    expect(dm.logoImg.style.maxWidth).toBe('none');
  });
  test('does not add desktop class for mobile view', () => {
    dm.setProperty(dm.window, 'innerWidth', 500);
    adjustLogoSize(dm);
    expect(dm.logoImg.classList.contains('logoImg-desktop')).toBe(false);
  });
  test('ensures navbar and logo sizes are adjusted correctly', () => {
    adjustLogoSize(dm);
    expect(dm.logoImg.style.height).toBe('40px');
  });
});
