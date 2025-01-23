import { IDataManager } from './IDataManager';
import { JSDOM } from 'jsdom';
export class MockDataManager implements IDataManager {
  toggleContainer: HTMLElement;
  dom = new JSDOM('', { url: 'http://localhost' });
  navbar = this.dom.window.document.createElement('div');
  logoImg = this.dom.window.document.createElement('img');
  mainWrapper = this.dom.window.document.createElement('div');
  title = this.dom.window.document.createElement('h1');
  breadcrumbContainer = this.dom.window.document.createElement('div');
  searchInputs = this.dom.window.document.querySelectorAll(
    'input[type="search"]'
  ) as NodeListOf<HTMLElement>;
  aside = this.dom.window.document.createElement('aside');
  header = this.dom.window.document.createElement('header');
  footer = this.dom.window.document.createElement('footer');
  // logoNavbar = this.dom.window.document.createElement('div')
  logoNavbarWrapper = this.dom.window.document.createElement('div');
  isNavEmpty = false;
  isBreadcrumbEmpty = false;
  doc = this.dom.window.document;
  window = this.dom.window as unknown as Window;
  setData(nav1, nav2, breadcrumb) {}
  setProperty(parentProperty: any, propertyName: string, value: any) {
    Object.defineProperty(parentProperty, propertyName, {
      value: value,
      writable: true,
    });
  }
}
