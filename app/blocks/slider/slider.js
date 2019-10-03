/* eslint-disable */
// https://idangero.us/swiper/api/
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export function slider() {
  $('.js-slider').each(function () {
    const
      block = $(this),
      top = block.find('.js-slider-top'),
      bottom = block.find('.js-slider-bottom');

    const bottomSlider = new Swiper(bottom, {
      loop: false,
      speed: 700,
      autoplay: false,
      slidesPerView: 5,
      centeredSlides: false,
      roundLengths: true,
      freeMode: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      spaceBetween: -1,
      on: {
        init: function (info) {
          if (this.slides.length < 5) {
            bottom.find('.swiper-wrapper').addClass('swiper-wrapper_center');
          }
        }
      }
    });

    const topSlider = new Swiper(top, {
      loop: false,
      speed: 700,
      autoplay: false,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: false,
      roundLengths: true,
      freeMode: false,
      thumbs: {
        swiper: bottomSlider,
      },
    });
  });
}

/* eslint-enable */
