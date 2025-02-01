interface Photo {
  src: string;
}

export class ImageSlider {
  gallery: Photo[];
  isGridModalOpen: boolean = false;
  isImageModalOpen: boolean = false;
  currentIndex: number = 0;

  constructor(galleryData: Photo[]) {
    this.gallery = galleryData || [];
  }

  handleSlideChange(activeIndex: number) {
    this.currentIndex = activeIndex;
  }

  openGridModal() {
    this.isGridModalOpen = true;
    this.isImageModalOpen = false;
  }

  openImageModal(index: number) {
    this.currentIndex = index;
    this.isImageModalOpen = true;
    this.isGridModalOpen = false;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
  }

  handleModalClick() {
    const target = event?.target as HTMLElement;
    if (target.classList.contains('close-btn')) {
      this.closeImageModal();
    }
  }

  prevPhoto() {
    this.currentIndex =
      this.currentIndex === 0 ? this.gallery.length - 1 : this.currentIndex - 1;
  }

  nextPhoto() {
    this.currentIndex =
      this.currentIndex === this.gallery.length - 1 ? 0 : this.currentIndex + 1;
  }
}
