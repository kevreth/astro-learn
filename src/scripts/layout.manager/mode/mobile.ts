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
    if (dm.window.innerWidth > 600) return;

    const {
      header,
      navbar,
      breadcrumbContainer,
      mainWrapper,
      isBreadcrumbEmpty,
      title,
      logoImg,
    } = dm;

    this.waitForImageLoad(logoImg, () => {
      const navbarHeight = navbar.getBoundingClientRect().height;
      const navbarExists = navbarHeight > 0;
      const headerHeight = header.getBoundingClientRect().height;
      const logoImgWidth = logoImg.getBoundingClientRect().width;
      const breadcrumbContainerHeight =
        breadcrumbContainer.getBoundingClientRect().height;

      const adjustMainContentTop = () => {
        mainWrapper.style.top = '0px';
        mainWrapper.style.position = 'absolute';
        const navbarOffset = navbarExists ? +15 : +10;
        mainWrapper.style.top = isBreadcrumbEmpty
          ? `${headerHeight + breadcrumbContainerHeight}px`
          : `${headerHeight + breadcrumbContainerHeight + (navbarExists ? navbarHeight : 0) + navbarOffset}px`;
      };
      const adjustBreadcrumbTop = () => {
        breadcrumbContainer.style.top = `${navbarHeight > 0 ? headerHeight + navbarHeight : headerHeight}px`;
        breadcrumbContainer.style.position = 'relative';
        breadcrumbContainer.style.marginLeft =
          navbarHeight > 0 ? '5px' : `${logoImgWidth + 10}px`;
      };
      const updateImg = () => {
        adjustNavbarTop(logoImg.getBoundingClientRect().width);
      };
      const adjustNavbarTop = (logoImgWidth: number) => {
        if (navbarHeight > 0) {
          navbar.style.top = `${headerHeight + 5}px`;
          navbar.style.position = 'fixed';
          navbar.style.marginLeft = `${logoImgWidth + 5}px`;
          navbar.style.width = `${window.innerWidth - logoImgWidth - 15}px`;
        }
      };
      const adjustHeaderWidth = () => {
        if (logoImg && header) {
          header.style.width = `${window.innerWidth - logoImgWidth - 10}px`;
        }
      };
      const adjustLogoHeight = () => {
        const mainTitleHeight = title.getBoundingClientRect().height;

        let newLogoHeight = isBreadcrumbEmpty
          ? headerHeight + mainTitleHeight + 5
          : navbarExists
            ? headerHeight + navbarHeight + 5
            : breadcrumbContainerHeight + headerHeight + 5;

        logoImg.style.minHeight = `${newLogoHeight}px`;

        if (isBreadcrumbEmpty) {
          title.style.left = '0px';
          title.style.transform = 'unset';
          title.style.marginLeft = `${logoImgWidth + 5}px`;
        }
      };

      adjustLogoHeight();
      adjustHeaderWidth();
      adjustBreadcrumbTop();
      adjustMainContentTop();
      updateImg();
    });
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
        const logoImg = dm.logoImg;
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

        // Wait until the image height is updated correctly
        const waitForImageHeight = (
          callback: (correctHeight: number) => void
        ) => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              logoImg.style.display = 'none';
              void logoImg.offsetHeight;
              logoImg.style.display = 'block';

              const logoImgHeight = logoImg.getBoundingClientRect().height;
              if (logoImgHeight > 0 && logoImgHeight !== 48) {
                callback(logoImgHeight);
              } else {
                waitForImageHeight(callback);
              }
            }, 50);
          });
        };

        // Ensure correct height before setting margin
        waitForImageHeight((correctHeight: number) => {
          const isBreadcrumbEmpty = dm.isBreadcrumbEmpty;
          title.classList.remove('float-title');

          toggleContainer?.style.removeProperty('margin-top');
          sibling.style.removeProperty('margin-top');

          if (isBreadcrumbEmpty) {
            sibling.style.setProperty('margin-top', `${correctHeight - 20}px`);
            console.log(
              '✅ Updated margin-top for sibling:',
              correctHeight - 20
            );
          }
        });
      });
    });
  }
}
