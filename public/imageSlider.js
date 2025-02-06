(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ImageSliderModule = {}));
})(this, (function (exports) { 'use strict';

  var ImageSlider = /** @class */ (function () {
      function ImageSlider(galleryData) {
          this.isGridModalOpen = false;
          this.isImageModalOpen = false;
          this.currentIndex = 0;
          this.gallery = galleryData || [];
      }
      ImageSlider.prototype.handleSlideChange = function (activeIndex) {
          this.currentIndex = activeIndex;
      };
      ImageSlider.prototype.openGridModal = function () {
          this.isGridModalOpen = true;
          this.isImageModalOpen = false;
      };
      ImageSlider.prototype.openImageModal = function (index) {
          this.currentIndex = index;
          this.isImageModalOpen = true;
          this.isGridModalOpen = false;
      };
      ImageSlider.prototype.closeImageModal = function () {
          this.isImageModalOpen = false;
      };
      ImageSlider.prototype.handleModalClick = function () {
          var target = event === null || event === undefined ? undefined : event.target;
          if (target.classList.contains('close-btn')) {
              this.closeImageModal();
          }
      };
      ImageSlider.prototype.prevPhoto = function () {
          this.currentIndex =
              this.currentIndex === 0 ? this.gallery.length - 1 : this.currentIndex - 1;
      };
      ImageSlider.prototype.nextPhoto = function () {
          this.currentIndex =
              this.currentIndex === this.gallery.length - 1 ? 0 : this.currentIndex + 1;
      };
      return ImageSlider;
  }());

  exports.ImageSlider = ImageSlider;

}));
