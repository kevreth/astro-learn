import { IDataManager } from '../IDataManager';
export function adjustNavbarFontSize(dm: IDataManager): void {
  const isMobileView = dm.window.innerWidth < 600;
  const navbar = dm.navbar;
  const logoImg = dm.logoImg;
  // const pageWidth = dm.window.innerWidth;
  let fontSize = parseFloat(dm.window.getComputedStyle(navbar!).fontSize) || 16;
  const maxFontSize = 16;
  const minFontSize = 10;
  const maxWidth = navbar.getBoundingClientRect().height - 15;
  const totalContentWidth = navbar!.offsetWidth + logoImg!.offsetWidth;
  if (isMobileView) {
    if (fontSize < maxFontSize) {
      fontSize = Math.min(maxFontSize, fontSize + 2);
      navbar!.style.fontSize = `${fontSize}px`;
    }
    if (totalContentWidth > maxWidth && fontSize > minFontSize) {
      const diff = totalContentWidth - maxWidth;
      const decrement = Math.ceil(diff / 10);
      fontSize = Math.max(minFontSize, fontSize - decrement - 1);
      navbar!.style.fontSize = `${fontSize}px`;
    }
  }
  // const adjustFontSize = () => {
  //   const totalContentWidth = navbar.offsetWidth + logoImg.offsetWidth;

  //   if (totalContentWidth > maxWidth && fontSize > minFontSize) {
  //     // Shrink font size to fit
  //     const diff = totalContentWidth - maxWidth;
  //     fontSize = Math.max(minFontSize, fontSize - Math.ceil(diff / 8)); // ✅ More gradual decrease
  //     navbar.style.fontSize = `${fontSize}px`;
  //     requestAnimationFrame(adjustFontSize); // ✅ Continue adjusting if needed
  //   } else if (totalContentWidth < maxWidth && fontSize < maxFontSize) {
  //     // Increase font size if space allows
  //     fontSize = Math.min(maxFontSize, fontSize + 1);
  //     navbar.style.fontSize = `${fontSize}px`;
  //   }
  // };

  // requestAnimationFrame(adjustFontSize);
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
