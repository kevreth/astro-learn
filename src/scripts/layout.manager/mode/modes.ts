import { IDataManager } from '../IDataManager';
export interface IModes {
  handleView(dm: IDataManager);
  calculateAvailableDimensions(dm: IDataManager);
  floadTitleWhenBreadcrumbsAllow(dm: IDataManager);
}
export abstract class Modes implements IModes {
  abstract handleView(dm: IDataManager);
  abstract calculateAvailableDimensions(dm: IDataManager): {
    availableHeight;
    availableWidth;
  };
  abstract floadTitleWhenBreadcrumbsAllow(dm: IDataManager);
  getAvailableHeight(dm: IDataManager) {
    const breadcrumbContainer = dm.breadcrumbContainer;
    const header = dm.header;
    const footer = dm.footer;
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const breadcrumbHeight = breadcrumbContainer.offsetHeight;
    const innerHeight = dm.window.innerHeight;
    let availableHeight =
      innerHeight - headerHeight - footerHeight - breadcrumbHeight;
    return availableHeight;
  }
}
