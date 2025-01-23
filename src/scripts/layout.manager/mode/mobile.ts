import { IDataManager } from '../IDataManager';
import { Modes } from './modes';
export class Mobile extends Modes {
  handleView(dm: IDataManager) {
    const navbar = dm.navbar;
    const logoNavbarWrapper = dm.logoNavbarWrapper;
    const breadcrumbContainer = dm.breadcrumbContainer;
    const title = dm.title;
    const logoImg = dm.logoImg;
    const logoImgWidth = logoImg.offsetWidth;
    const logoImgHeight = logoImg.offsetHeight;
    navbar.classList.add('hidden');
    navbar.classList.remove('transparent');
    logoNavbarWrapper.classList.remove('breadcrumb-below-nav');
    // Indent logo if width as 2 times height
    if (logoImgWidth >= 2 * logoImgHeight) {
      logoImg.style.setProperty('max-width', '25vw');
      logoNavbarWrapper.style.setProperty('position', 'unset');
      logoNavbarWrapper.style.setProperty('justify-content', 'center');
      breadcrumbContainer.classList.add('breadcrumb-left');
    }
    // logo as same height with breadcrumbs when in same line
    if (logoImg && breadcrumbContainer) {
      breadcrumbContainer.style.minHeight = `${logoImgHeight}px`;
      breadcrumbContainer.style.marginLeft = `${logoImgWidth + 10}px`;
    }
    // title jump up when no breadcrumbs
    const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
    if (isBreadcrumbEmpty) {
      title.classList.add('title');
    } else {
      title.classList.remove('title');
    }
  }
  calculateAvailableDimensions(dm: IDataManager): {
    availableHeight;
    availableWidth;
  } {
    let availableHeight = this.getAvailableHeight(dm);
    const navbar = dm.navbar;
    const logoImg = dm.logoImg;
    const logoImgHeight = logoImg.offsetHeight;
    const logoNavbarWrapper = dm.logoNavbarWrapper;
    const navbarHeight = navbar.offsetHeight;
    availableHeight = availableHeight - navbarHeight - 20;
    const availableWidth = 0;
    // If the logo occupies its own row
    const logoParentStyle = dm.window.getComputedStyle(logoNavbarWrapper!);
    const isLogoInOwnRow =
      logoParentStyle.justifyContent === 'center' ||
      logoParentStyle.position === 'unset';
    if (isLogoInOwnRow) {
      availableHeight = availableHeight - logoImgHeight;
    }
    return { availableHeight, availableWidth };
  }
  floadTitleWhenBreadcrumbsAllow(dm: IDataManager) {
    const title = dm.title;
    const toggleContainer = dm.toggleContainer;
    if (!title) {
      console.warn(
        'Title element is null. Skipping floadTitleWhenBreadcrumbsAllow.'
      );
      return;
    }
    const sibling = (title.nextElementSibling as HTMLElement) || null;
    if (!sibling) {
      console.warn(
        'Sibling element is null. Skipping floadTitleWhenBreadcrumbsAllow.'
      );
      return;
    }
    const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
    title.classList.remove('float-title');
    // Remove float affects in mobile
    if (toggleContainer) {
      // toggleContainer.classList.remove('float-toggle')
      toggleContainer.style.removeProperty('margin-top');
    }
    sibling?.style.removeProperty('margin-top');
    // float title when no breadcrumbs in homepage mobile
    if (isBreadcrumbEmpty) {
      const logoImgHeight = dm.logoImg.offsetHeight;
      sibling.style.setProperty('margin-top', `${logoImgHeight + 5}px`);
    }
  }
}
