import { IDataManager } from '../IDataManager';
export function adjustNavbarFontSize(dm: IDataManager): void {
  const isMobileView = dm.window.innerWidth < 600;
  if (!isMobileView) return;
  const navbar = dm.navbar;
  const logoImg = dm.logoImg;
  let fontSize = parseFloat(dm.window.getComputedStyle(navbar!).fontSize) || 16;
  const maxFontSize = 16;
  const minFontSize = 10;
  const maxWidth = navbar.getBoundingClientRect().width - 15;
  const totalContentWidth = navbar!.offsetWidth + logoImg!.offsetWidth;
  if (isMobileView) {
    if (totalContentWidth > maxWidth && fontSize > minFontSize) {
      const diff = totalContentWidth - maxWidth;
      const decrement = Math.ceil(diff / 10);
      fontSize = Math.max(minFontSize, fontSize - decrement);
    } else {
      fontSize = Math.min(maxFontSize, fontSize + 2);
    }
  }
  navbar.style.fontSize = `${fontSize}px`;
}
export function adjustLogoSize(dm: IDataManager): void {
  const navbar = dm.navbar;
  const logoImg = dm.logoImg;
  const isMobileView = dm.window.innerWidth < 600;
  if (!isMobileView) {
    logoImg.classList.add('logoImg-desktop');
  }
  if (navbar && logoImg) {
    const computedLineHeight = dm.window.getComputedStyle(navbar).lineHeight;
    const lineHeight = parseFloat(computedLineHeight);
    const navbarHeight = lineHeight * 2;
    const maxHeight = navbarHeight;
    if (navbarHeight > 0) {
      logoImg.style.height = `${navbarHeight}px`;
      logoImg.style.maxWidth = 'none';
      navbar.style.maxHeight = `${maxHeight}px`;
      adjustNavbarFontSize(dm);
    }
  }
}
