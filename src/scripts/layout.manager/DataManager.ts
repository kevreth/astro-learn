import { IDataManager } from "./IDataManager"
export class DataManager implements IDataManager {
    navbar = document.querySelector('.navlink') as HTMLElement
    logo = document.querySelector('.logo') as HTMLImageElement
    mainWrapper = document.getElementById('main-wrapper') as HTMLElement
    title = document.querySelector('#main-wrapper h1') as HTMLElement
    breadcrumbContainer = document.querySelector(".breadcrumb-container") as HTMLElement
    searchInputs = document.querySelectorAll('input[type="search"]') as NodeListOf<HTMLElement>
    aside = document.getElementById("aside") as HTMLElement
    header = document.querySelector('header') as HTMLElement
    footer = document.querySelector('footer') as HTMLElement
    logoNavbar = document.querySelector('.logo-navbar-wrapper') as HTMLElement
    logoNavbarWrapper = document.querySelector('.logo-navbar-wrapper') as HTMLElement
    toggleContainer = document.querySelector('.toggle-container') as HTMLElement
    isNavEmpty = false;
    isBreadcrumbEmpty = false;
    doc = document
    window = window
    setData(nav1, nav2, breadcrumb) {
        this.isNavEmpty = !nav1.length && !nav2.length;
        this.isBreadcrumbEmpty = !breadcrumb.length;
    }
}