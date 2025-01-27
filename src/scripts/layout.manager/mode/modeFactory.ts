import { IDataManager } from '../IDataManager';
import { Desktop } from './desktop';
import { Mobile } from './mobile';
export function isDesktopView(dm: IDataManager): boolean {
  return dm.window.innerWidth >= 600;
}
export function modeFactory(dm: IDataManager) {
  let retval = new Mobile();
  if (isDesktopView(dm)) retval = new Desktop();
  return retval;
}
export function navempty(dm: IDataManager) {
  const navbar = dm.navbar;
  navbar.style.display = 'none';
  requestAnimationFrame(() => {
    navbar.offsetHeight;
  });
  return modeFactory(dm).handleView(dm);
}
export function calculateAvailableDimensions(dm: IDataManager): {
  availableHeight: number;
  availableWidth: number;
} {
  return modeFactory(dm).calculateAvailableDimensions(dm);
}
export function floadTitleWhenBreadcrumbsAllow(dm: IDataManager): void {
  return modeFactory(dm).floadTitleWhenBreadcrumbsAllow(dm);
}
