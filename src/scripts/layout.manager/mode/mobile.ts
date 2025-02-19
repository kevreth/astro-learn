import { IDataManager } from '../IDataManager';
import { Modes } from './modes';
export class Mobile extends Modes {
  handleView(dm: IDataManager) {
    const { navbar, logoNavbarWrapper, breadcrumbContainer, logoImg } = dm;
    const title = dm.title;
    navbar.classList.add('hidden');
    navbar.classList.remove('transparent');
    logoNavbarWrapper.classList.remove('breadcrumb-below-nav');
    const logoImgWidth = logoImg.getBoundingClientRect().width;
    const logoImgHeight = logoImg.getBoundingClientRect().height;

    if (typeof window !== 'undefined') {
      // Indent logo if width as 2 times height
      const initializeDimensions = () => {
        if (logoImgWidth >= 2 * logoImgHeight) {
          logoImg.style.setProperty('max-width', '25vw');
          logoNavbarWrapper.style.setProperty('position', 'unset');
          logoNavbarWrapper.style.setProperty('justify-content', 'center');
          breadcrumbContainer.classList.add('breadcrumb-left');
        }
        // adjustBreadcrumbHeight();
      };
      // // logo as same height with breadcrumbs when in same line
      // const adjustBreadcrumbHeight = () => {
      //   if (logoImg && breadcrumbContainer) {
      //     breadcrumbContainer.style.minHeight = `${logoImgHeight}px`;
      //     breadcrumbContainer.style.marginLeft = `${logoImgWidth + 10}px`;
      //   }
      // };

      initializeDimensions();
      this.applyMobileStyles(dm);
    }
    // title jump up when no breadcrumbs
    const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
    if (isBreadcrumbEmpty) {
      title.classList.add('title');
    } else {
      title.classList.remove('title');
    }
  }
  waitForImageLoad = (imgElement: HTMLImageElement, callback: () => void) => {
    const checkImage = () => {
      const width = imgElement.getBoundingClientRect().width;
      if (width > 0) {
        callback();
      } else {
        requestAnimationFrame(checkImage);
      }
    };
    checkImage();
  };
  // logo jump to header when in mobile view
  applyMobileStyles = (dm: IDataManager) => {
    const isMobileView = dm.window.innerWidth < 600;
    if (!isMobileView) return;

    if (isMobileView) {
      const logoImg = dm.logoImg;
      this.waitForImageLoad(logoImg, () => {
        const {
          header,
          navbar,
          breadcrumbContainer,
          mainWrapper,
          isBreadcrumbEmpty,
          title,
        } = dm;
        const navbarHeight = navbar.getBoundingClientRect().height;
        const navbarExists = navbarHeight > 0;
        const headerHeight = header.getBoundingClientRect().height;
        const logoImgWidth = logoImg.getBoundingClientRect().width;
        const breadcrumbContainerHeight =
          breadcrumbContainer.getBoundingClientRect().height;

        const adjustMainContentTop = () => {
          mainWrapper.style.top = '0px';
          mainWrapper.style.position = 'absolute';
          if (isBreadcrumbEmpty) {
            mainWrapper.style.top = `${headerHeight + breadcrumbContainerHeight}px`;
          } else {
            const navbarOffset = navbarExists ? +15 : +10;
            mainWrapper.style.top = `${headerHeight + breadcrumbContainerHeight + (navbarExists ? navbarHeight : 0) + navbarOffset}px`;
          }
        };
        const adjustBreadcrumbTop = () => {
          if (navbarHeight <= 0) {
            breadcrumbContainer.style.top = `${headerHeight}px`;
            breadcrumbContainer.style.position = 'relative';
            breadcrumbContainer.style.marginLeft = `${logoImgWidth + 10}px`;
          } else {
            breadcrumbContainer.style.top = `${headerHeight + navbarHeight}px`;
            breadcrumbContainer.style.position = 'relative';
            breadcrumbContainer.style.marginLeft = '5px';
          }
        };
        const updateImg = () => {
          const logoImgWidth = logoImg.getBoundingClientRect().width;
          adjustNavbarTop(logoImgWidth);
        };
        const adjustNavbarTop = (logoImgWidth: number) => {
          if (navbarHeight > 0) {
            navbar.style.top = `${headerHeight + 5}px`;
            navbar.style.position = 'fixed';
            navbar.style.marginLeft = `${logoImgWidth + 5}px`;
          }
        };
        const adjustHeaderWidth = () => {
          // void logoImg.getBoundingClientRect();
          // void header.getBoundingClientRect();
          if (logoImg && header) {
            const availableWidth = window.innerWidth - logoImgWidth;
            header.style.width = `${availableWidth - 10}px`;
          }
        };
        const adjustLogoHeight = () => {
          let newLogoHeight;
          const mainTitleHeight = title.getBoundingClientRect().height;

          if (isBreadcrumbEmpty) {
            newLogoHeight = headerHeight + mainTitleHeight + 5;
            title.style.left = '0px';
            title.style.transform = 'unset';
            title.style.marginLeft = `${logoImgWidth + 5}px`;
          } else if (navbarExists) {
            newLogoHeight = headerHeight + navbarHeight + 5;
          } else {
            newLogoHeight = breadcrumbContainerHeight + headerHeight;
          }
          logoImg.style.minHeight = `${newLogoHeight}px`;
        };
        adjustLogoHeight();
        adjustHeaderWidth();
        adjustBreadcrumbTop();
        // adjustNavbarTop();
        adjustMainContentTop();
        updateImg();
      });
    }
  };
  calculateAvailableDimensions(dm: IDataManager): {
    availableHeight: number;
    availableWidth: number;
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
    requestAnimationFrame(() => {
      setTimeout(() => {
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
          const logoImgHeight = dm.logoImg.getBoundingClientRect().height;
          sibling.style.setProperty('margin-top', `${logoImgHeight - 20}px`);
        }
      });
    });
  }
}
