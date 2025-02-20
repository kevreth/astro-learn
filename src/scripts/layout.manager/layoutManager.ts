import { DataManager } from './DataManager';
import { IDataManager } from './IDataManager';
import { adjustLogoSize } from './adjustLogoSize/adjustLogoSize';
import {
  isDesktopView,
  navempty,
  floadTitleWhenBreadcrumbsAllow,
  calculateAvailableDimensions,
} from './mode/modeFactory';
export function handleSearchInput(dm: IDataManager): void {
  const searchInputs = dm.searchInputs;
  const mainWrapper = dm.mainWrapper;
  if (searchInputs.length) {
    searchInputs.forEach(searchInput => {
      searchInput.addEventListener('input', () => {
        mainWrapper.style.height = 'auto';
      });
    });
  }
}
export function adjustContentHeight(dm: IDataManager): void {
  const { availableHeight, availableWidth } = calculateAvailableDimensions(dm);
  const isDesktopView_ = isDesktopView(dm);
  const mainWrapper = dm.mainWrapper;
  const scrollHeight = dm.mainWrapper.scrollHeight;
  const [height, width, overflowY, overflowX] = adjustDimensions(
    scrollHeight,
    isDesktopView_,
    availableHeight,
    availableWidth
  );
  mainWrapper.style.height = height;
  mainWrapper.style.width = width;
  mainWrapper.style.overflowY = overflowY;
  mainWrapper.style.overflowX = overflowX;
}
export function adjustDimensions(
  scrollHeight: number,
  isDesktopView_: boolean,
  availableHeight: number,
  availableWidth: number
): [string, string, string, string] {
  const height =
    scrollHeight < availableHeight ? 'fit-content' : `${availableHeight}px`;
  const width = isDesktopView_ ? `${availableWidth}px` : '100%';
  const overflowY = scrollHeight >= availableHeight ? 'auto' : 'visible';
  const overflowX = 'hidden';
  return [height, width, overflowY, overflowX];
}
export function setBreadcrumbTransparency(dm: IDataManager): void {
  const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
  const breadcrumbContainer = dm.breadcrumbContainer;
  breadcrumbContainer.classList.toggle('transparent', isBreadcrumbEmpty);
}
export function navNotEmpty(dm: IDataManager): void {
  const navbar = dm.navbar;
  const logoNavbarWrapper = dm.logoNavbarWrapper;
  navbar.classList.remove('hidden');
  logoNavbarWrapper.classList.add('breadcrumb-below-nav');
}
export function whenNavEmpty(dm: IDataManager): void {
  dm.isNavEmpty ? navempty(dm) : navNotEmpty(dm);
}
export function toggleEmptyAside(dm: IDataManager): void {
  const aside = dm.aside;
  const isAsideEmpty = !aside.innerHTML.trim();
  aside.classList.toggle('hidden', isAsideEmpty);
}
export function getToggleListenerObject(dm: IDataManager): () => void {
  const mainWrapper = dm.mainWrapper;
  const handleToggle = () => {
    mainWrapper.style.height = 'auto';
    adjustHeightAndLayout(dm);
  };
  return handleToggle;
}
export function handleToggle(dm: IDataManager): void {
  const toggleListenerObject = getToggleListenerObject(dm);
  // CANNOT be added to elements.
  const toggleSwitch = dm.doc.querySelector('.toggle-switch') as HTMLElement;
  if (toggleSwitch) {
    toggleSwitch.removeEventListener('change', toggleListenerObject);
    toggleSwitch.addEventListener('change', toggleListenerObject);
  }
}
export function resizeObserver(
  element: HTMLElement,
  callback: () => void
): void {
  const resizeObserver = new ResizeObserver(() => {
    callback();
  });
  if (element) resizeObserver.observe(element);
}
export function observeMainWrapper(dm: IDataManager): void {
  const mainWrapper = dm.mainWrapper;
  //dynamicTable may not be in scope yet
  const dynamicTable = dm.doc.querySelector('#dynamic-table') as HTMLElement;
  resizeObserver(mainWrapper, () => adjustContentHeight(dm));
  resizeObserver(dynamicTable, () => adjustContentHeight(dm));
}
export function adjustHeightAndLayout(dm: IDataManager): void {
  const vh = dm.window.innerHeight * 0.01;
  dm.doc.documentElement.style.setProperty('--vh', `${vh}px`);
  setTimeout(() => {
    floadTitleWhenBreadcrumbsAllow(dm);
    whenNavEmpty(dm);
    handleToggle(dm);
    handleSearchInput(dm);
    adjustContentHeight(dm);
    setBreadcrumbTransparency(dm);
    toggleEmptyAside(dm);
    observeMainWrapper(dm);
  }, 0);
  window.addEventListener('resize', () => {
    adjustContentHeight(dm);
  });
}
export function initLayout(dm: DataManager) {
  dm.window.addEventListener('resize', () => {
    adjustHeightAndLayout(dm);
    adjustLogoSize(dm);
  });
}
export function initializeLayout(): void {
  const element = document.getElementById('data-container') as HTMLElement;
  const attribute = element.getAttribute('data-content') as string;
  const data = JSON.parse(attribute);
  const dm = new DataManager();
  dm.setData(data.nav, data.breadcrumb);
  initLayout(dm);
  adjustHeightAndLayout(dm);
  adjustLogoSize(dm);
}
//entry point protected for testing
if (typeof window !== 'undefined') {
  (window as any).initializeLayout = initializeLayout;
}
