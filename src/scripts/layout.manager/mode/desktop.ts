import { IDataManager } from '../IDataManager';
import { Modes } from './modes';
export class Desktop extends Modes {
  handleView(dm: IDataManager) {
    const navbar = dm.navbar;
    const logoNavbarWrapper = dm.logoNavbarWrapper;
    const breadcrumbContainer = dm.breadcrumbContainer;
    const title = dm.title;
    navbar.classList.remove('hidden');
    navbar.classList.add('transparent');
    logoNavbarWrapper.classList.remove('breadcrumb-below-nav');
    breadcrumbContainer.style.setProperty('margin-left', '0');
    breadcrumbContainer.style.setProperty('min-height', 'auto');
    title.classList.remove('title');
  }
  calculateAvailableDimensions(dm: IDataManager): {
    availableHeight: number;
    availableWidth: number;
  } {
    let availableHeight = this.getAvailableHeight(dm);
    const logoNavbarWrapper = dm.logoNavbarWrapper;
    const logoNavbarWidth = logoNavbarWrapper.getBoundingClientRect().width;
    const aside = dm.aside;
    const asideWidth = aside.getBoundingClientRect().width;
    availableHeight = availableHeight - 15;
    const availableWidth = dm.window.innerWidth - logoNavbarWidth - asideWidth;
    return { availableHeight, availableWidth };
  }
  floadTitleWhenBreadcrumbsAllow(dm: IDataManager) {
    const title = dm.title;
    if (!title) return;
    const toggleContainer = dm.toggleContainer;
    const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
    const mainWrapper = dm.mainWrapper;
    const breadcrumbContainer = dm.breadcrumbContainer;
    const availableSpace = mainWrapper.offsetWidth;
    const breadcrumbWidth = breadcrumbContainer.offsetWidth;
    const titleWidth = title.offsetWidth;
    const titleHeight = title.offsetHeight;
    // Get the actual next sibling element
    let nextElementTitle = title.nextSibling as HTMLElement;
    while (nextElementTitle && nextElementTitle.nodeType !== 1) {
      nextElementTitle = nextElementTitle.nextSibling as HTMLElement;
    }
    const breadcrumbLeftSpace = availableSpace / 2 - breadcrumbWidth;
    const titleWidthNeedSpace = titleWidth / 2;
    // float title when no breadcrumbs in homepage desktop
    if (nextElementTitle && isBreadcrumbEmpty) {
      title.style.setProperty('margin-top', '5px');
    } else if (nextElementTitle && breadcrumbLeftSpace > titleWidthNeedSpace) {
      title.classList.add('float-title');
      // update on time when scailing with settimeout
      setTimeout(() => {
        nextElementTitle.style.setProperty(
          'margin-top',
          `${titleHeight - breadcrumbContainer.offsetHeight}px`
        );
        if (toggleContainer) {
          if (nextElementTitle === toggleContainer) {
            toggleContainer.style.removeProperty('margin-top');
            toggleContainer.classList.add('float-toggle');
          } else {
            toggleContainer.classList.remove('float-toggle');
          }
        }
      }, 0);
    } else {
      title.classList.remove('float-title');
      // nextElementTitle.style.removeProperty('margin-top')
    }
    if (nextElementTitle) {
      nextElementTitle.style.removeProperty('margin-top');
    }
  }
  applyMobileStyles(dm: IDataManager) {
    // Reset mobile style in desktop view
    const header = dm.header;
    const navbar = dm.navbar;
    const breadcrumbContainer = dm.breadcrumbContainer;
    const logoImg = dm.logoImg;
    const mainWrapper = dm.mainWrapper;

    if (header) {
      header.style.width = '';
      header.style.position = '';
    }

    if (logoImg) {
      logoImg.style.minHeight = '';
    }

    if (mainWrapper) {
      mainWrapper.style.top = '';
      mainWrapper.style.position = '';
    }

    if (breadcrumbContainer) {
      breadcrumbContainer.style.top = '';
      breadcrumbContainer.style.marginLeft = '';
      breadcrumbContainer.style.position = '';
    }

    if (navbar) {
      navbar.style.top = '';
      navbar.style.position = '';
      navbar.style.marginLeft = '';
    }
  }
}
