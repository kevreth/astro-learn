export interface IDataManager {
    navbar: HTMLElement
    logo: HTMLImageElement
    mainWrapper: HTMLElement
    title: HTMLElement
    breadcrumbContainer: HTMLElement
    searchInputs: NodeListOf<HTMLElement>
    aside: HTMLElement
    header: HTMLElement
    footer: HTMLElement
    logoNavbar: HTMLElement
    logoNavbarWrapper: HTMLElement
    toggleContainer: HTMLElement
    isNavEmpty: boolean
    isBreadcrumbEmpty: boolean,
    doc: Document
    window: Window
    setData(nav1, nav2, breadcrumb):void
}