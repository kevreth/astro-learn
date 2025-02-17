import { IDataManager } from '../IDataManager';
import { Modes } from './modes';
import { navNotEmpty } from '../layoutManager';
export class Mobile extends Modes {
  handleView(dm: IDataManager) {
    // const header = dm.header;
    const navbar = dm.navbar;
    const logoNavbarWrapper = dm.logoNavbarWrapper;
    const breadcrumbContainer = dm.breadcrumbContainer;
    const title = dm.title;
    const logoImg = dm.logoImg;
    navbar.classList.add('hidden');
    navbar.classList.remove('transparent');
    logoNavbarWrapper.classList.remove('breadcrumb-below-nav');
    // const logoImgWidth = logoImg.offsetWidth;
    // const logoImgWidth = logoImg.getBoundingClientRect().width;
    // const logoImgHeight = logoImg.offsetHeight;
    const logoImgHeight = logoImg.getBoundingClientRect().height;

    if (typeof window !== 'undefined') {
      // Indent logo if width as 2 times height
      // const initializeDimensions = () => {
      //   if (logoImgWidth >= 2 * logoImgHeight) {
      //     logoImg.style.setProperty('max-width', '25vw');
      //     logoNavbarWrapper.style.setProperty('position', 'unset');
      //     logoNavbarWrapper.style.setProperty('justify-content', 'center');
      //     breadcrumbContainer.classList.add('breadcrumb-left');
      //   }
      //   // adjustBreadcrumbHeight();
      // };
      // logo as same height with breadcrumbs when in same line
      // const adjustBreadcrumbHeight = () => {
      //   if (logoImg && breadcrumbContainer) {
      //     breadcrumbContainer.style.minHeight = `${logoImgHeight}px`;
      //     breadcrumbContainer.style.marginLeft = `${logoImgWidth + 10}px`;
      //   }
      // };
      // const applyMobileStyles = () => {

      const waitForImageLoad = (
        imgElement: HTMLImageElement,
        callback: () => void
      ) => {
        if (imgElement.complete && imgElement.naturalWidth > 0) {
          // Image is already loaded
          callback();
        } else {
          imgElement.onload = () => callback();
        }
      };

      const isMobileView = dm.window.innerWidth < 600;

      if (isMobileView) {
        waitForImageLoad(logoImg, () => {
          const logoImgWidth = logoImg.getBoundingClientRect().width;

          const header = dm.header;
          const navbarExists = navNotEmpty(dm);
          const navbarHeight = navbarExists
            ? navbar.getBoundingClientRect().height
            : 0;
          const mainWrapper = dm.mainWrapper;
          const headerHeight = header.getBoundingClientRect().height;
          const breadcrumbContainerHeight =
            breadcrumbContainer.getBoundingClientRect().height;

          const initializeDimensions = () => {
            if (logoImgWidth >= 2 * logoImgHeight) {
              logoImg.style.setProperty('max-width', '25vw');
              logoNavbarWrapper.style.setProperty('position', 'unset');
              logoNavbarWrapper.style.setProperty('justify-content', 'center');
              breadcrumbContainer.classList.add('breadcrumb-left');
            }
            // adjustBreadcrumbHeight();
          };

          const adjustMainContentTop = () => {
            mainWrapper.style.top = `${headerHeight + breadcrumbContainerHeight + (navbarExists ? navbarHeight : 0) - 20}px`;
            mainWrapper.style.position = 'relative';
          };
          const adjustBreadcrumbTop = () => {
            if (logoImg && breadcrumbContainer) {
              breadcrumbContainer.style.top = `${headerHeight + navbarHeight - 5}px`;
              breadcrumbContainer.style.position = 'relative';

              breadcrumbContainer.style.marginLeft = `${logoImgWidth + 10}px`;
            }
          };
          const adjustNavbarTop = () => {
            if (navbarExists) {
              navbar.style.top = `${headerHeight + 5}px`;
              navbar.style.position = 'fixed';
              navbar.style.marginLeft = `${logoImgWidth + 5}px`;
            }
          };
          const adjustHeaderWidth = () => {
            if (logoImg && header) {
              const availableWidth =
                window.innerWidth - logoImg.getBoundingClientRect().width;
              header.style.width = `${availableWidth - 10}px`;
            }
          };
          const adjustLogoHeight = () => {
            let newLogoHeight;
            if (navbarExists) {
              newLogoHeight = headerHeight + navbarHeight + 5;
            } else {
              logoImg.style.minHeight = `${breadcrumbContainerHeight}px + ${headerHeight}px`;
            }
            logoImg.style.minHeight = `${newLogoHeight}px`;
          };
          adjustLogoHeight();
          adjustHeaderWidth();
          adjustBreadcrumbTop();
          adjustNavbarTop();
          adjustMainContentTop();
          initializeDimensions();
        });
      }
      // initializeDimensions();
    }
    // title jump up when no breadcrumbs
    const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
    if (isBreadcrumbEmpty) {
      title.classList.add('title');
    } else {
      title.classList.remove('title');
    }
  }
  applyMobileStyles = (dm: IDataManager) => {
    const isMobileView = dm.window.innerWidth < 600;

    if (isMobileView) {
      const header = dm.header;
      const navbar = dm.navbar;
      const breadcrumbContainer = dm.breadcrumbContainer;
      const navbarHeight = navbar.getBoundingClientRect().height;
      const navbarExists = navbarHeight > 0;
      const logoImg = dm.logoImg;
      const mainWrapper = dm.mainWrapper;
      const headerHeight = header.getBoundingClientRect().height;
      const logoImgWidth = logoImg.getBoundingClientRect().width;
      const breadcrumbContainerHeight =
        breadcrumbContainer.getBoundingClientRect().height;

      const adjustMainContentTop = () => {
        // void navbar.getBoundingClientRect();
        // void mainWrapper.getBoundingClientRect();
        const navbarOffset = navbarExists ? -15 : -20;
        mainWrapper.style.top = `${headerHeight + breadcrumbContainerHeight + (navbarExists ? navbarHeight : 0) + navbarOffset}px`;
        mainWrapper.style.position = 'relative';

        console.log('navbarOffset', navbarOffset);
        console.log('mainWrapper.style.top', mainWrapper.style.top);
        console.log('breadcrumbContainerHeight', breadcrumbContainerHeight);
        console.log('headerHeight', headerHeight);
        console.log('navbarHeight', navbarHeight);
      };
      const adjustBreadcrumbTop = () => {
        void logoImg.getBoundingClientRect();
        void breadcrumbContainer.getBoundingClientRect();
        void navbar.getBoundingClientRect();
        if (navbarHeight <= 0) {
          breadcrumbContainer.style.top = `${headerHeight - 5}px`;
          breadcrumbContainer.style.position = 'relative';
          breadcrumbContainer.style.marginLeft = `${logoImgWidth + 10}px`;
        } else {
          breadcrumbContainer.style.top = `${headerHeight + navbarHeight}px`;
          breadcrumbContainer.style.position = 'relative';
          breadcrumbContainer.style.marginLeft = '5px';
        }
      };
      const adjustNavbarTop = () => {
        if (navbarHeight > 0) {
          navbar.style.top = `${headerHeight + 5}px`;
          navbar.style.position = 'fixed';
          navbar.style.marginLeft = `${logoImgWidth + 5}px`;
        }
      };
      const adjustHeaderWidth = () => {
        if (logoImg && header) {
          void logoImg.offsetWidth;
          void header.offsetWidth;
          const availableWidth = window.innerWidth - logoImgWidth;
          header.style.width = `${availableWidth - 10}px`;
        }
      };
      const adjustLogoHeight = () => {
        let newLogoHeight;
        if (navbarExists) {
          newLogoHeight = headerHeight + navbarHeight + 5;
        } else {
          logoImg.style.minHeight = `${breadcrumbContainerHeight}px + ${headerHeight}px`;
        }
        logoImg.style.minHeight = `${newLogoHeight}px`;
      };
      adjustLogoHeight();
      adjustHeaderWidth();
      adjustBreadcrumbTop();
      adjustNavbarTop();
      adjustMainContentTop();
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
